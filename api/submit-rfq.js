const recipient='yuna@huangsifurniture.com';
const allowedOrigins=new Set(['https://huangsifurniture.com','https://www.huangsifurniture.com']);
const limits={name:200,company:200,email:200,country:200,product:300,quantity:200,destination:200,schedule:100,message:3000,source:1000};
const rateWindowMs=10*60*1000;
const maxRequestsPerWindow=5;
const rateBuckets=new Map();

const clientAddress=req=>{
  const forwarded=String(req.headers['x-forwarded-for']||'').split(',')[0].trim();
  return forwarded||String(req.headers['x-real-ip']||'').trim()||'unknown';
};
const allowRequest=req=>{
  const now=Date.now(),key=clientAddress(req),current=rateBuckets.get(key);
  if (!current||now-current.startedAt>=rateWindowMs) {
    rateBuckets.set(key,{startedAt:now,count:1});
    if (rateBuckets.size>10000) rateBuckets.clear();
    return true;
  }
  current.count+=1;
  return current.count<=maxRequestsPerWindow;
};

const value=(input,key)=>String(input?.[key]||'').trim().replace(/[\u0000-\u001F\u007F]/g,' ').slice(0,limits[key]||200);
const isEmail=email=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

module.exports=async(req,res)=>{
  if(req.method!=='POST')return res.status(405).json({ok:false,error:'Method not allowed'});
  const origin=req.headers.origin;
  if(origin&&!allowedOrigins.has(origin))return res.status(403).json({ok:false,error:'Invalid origin'});
  const body=req.body&&typeof req.body==='object'?req.body:{};
  if(value(body,'website'))return res.status(200).json({ok:true});
  const startedAt=Number(body.rfq_started_at),elapsed=Date.now()-startedAt;
  if(!Number.isFinite(startedAt)||elapsed<1800||elapsed>86400000)return res.status(400).json({ok:false,error:'Please review the form and try again.'});
  const lead=Object.fromEntries(Object.keys(limits).map(key=>[key,value(body,key)]));
  if(!lead.name||!isEmail(lead.email)||!lead.product||!lead.message)return res.status(400).json({ok:false,error:'Please complete the required fields.'});
  if(!process.env.RESEND_API_KEY||!process.env.RFQ_FROM_EMAIL){console.error('RFQ email is not configured');return res.status(503).json({ok:false,error:'Inquiry service is being configured. Please use a backup contact method.'});}
  const details=['New HUANGSI website RFQ',`Name: ${lead.name}`,`Company: ${lead.company||'Not specified'}`,`Business email: ${lead.email}`,`Country / region: ${lead.country||'Not specified'}`,`Product / solution: ${lead.product}`,`Quantity: ${lead.quantity||'Not specified'}`,`Destination: ${lead.destination||'Not specified'}`,`Target schedule: ${lead.schedule||'Not specified'}`,`Source page: ${lead.source||'Not specified'}`,'','Project details:',lead.message].join('\n');
  const subject=`Website RFQ — ${lead.product}`.replace(/[\r\n]+/g,' ').slice(0,180);
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RFQ_FROM_EMAIL,to:[recipient],reply_to:lead.email,subject,text:details})});
    if(!response.ok){console.error('Resend rejected RFQ',response.status);return res.status(502).json({ok:false,error:'Unable to deliver inquiry.'});}
    return res.status(200).json({ok:true});
  }catch(error){console.error('RFQ delivery failed',error?.message||'unknown error');return res.status(502).json({ok:false,error:'Unable to deliver inquiry.'});}
};
