"""Apply reviewed buyer content without changing cards, navigation or specifications."""
from pathlib import Path
import re,json,html,csv
ROOT=Path(__file__).resolve().parents[1]
ORIGIN='https://huangsifurniture.com'
DATE='2026-10-04'
E=html.escape
changed=[]
def metadata(s,title,description):
 s=re.sub(r'<title>.*?</title>','<title>'+E(title)+'</title>',s,count=1,flags=re.S)
 for kind,field,value in [('name','description',description),('property','og:title',title),('property','og:description',description),('name','twitter:title',title),('name','twitter:description',description)]:
  pattern=r'<meta\b(?=[^>]*\b'+kind+r'=["\']'+re.escape(field)+r'["\'])[^>]*>'
  if re.search(pattern,s):s=re.sub(pattern,lambda _:f'<meta {kind}="{field}" content="{E(value)}">',s,count=1)
  elif field.startswith('twitter:'):s=s.replace('</head>',f'<meta {kind}="{field}" content="{E(value)}"></head>',1)
 return s
def schema(s,title,description,questions):
 faq_found=False
 def edit(m):
  nonlocal faq_found
  obj=json.loads(m[1])
  def node(n):
   nonlocal faq_found
   if not isinstance(n,dict):return
   t=n.get('@type')
   if t in ['CollectionPage','ItemPage','WebPage']:n['name']=title.removesuffix(' | HUANGSI');n['description']=description
   if t=='BlogPosting':n['headline']=title.removesuffix(' | HUANGSI');n['description']=description;n['dateModified']=DATE
   if t=='FAQPage' and questions:
    faq_found=True
    old=n.get('mainEntity',[])
    names={q for q,a in questions}
    n['mainEntity']=[x for x in old if x.get('name') not in names]+[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in questions]
   if t=='FAQPage' and not questions and 'class="home-faq-list"' in s:
    visible=re.search(r'<div class="home-faq-list">(.*?)</div>',s,re.S)[1]
    pairs=re.findall(r'<summary>(.*?)<span>\+</span></summary><p>(.*?)</p>',visible,re.S)
    plain=lambda value:html.unescape(re.sub('<[^>]+>','',value))
    n['mainEntity']=[{'@type':'Question','name':plain(q),'acceptedAnswer':{'@type':'Answer','text':plain(a)}} for q,a in pairs]
   for child in n.get('@graph',[]):node(child)
  node(obj)
  return '<script type="application/ld+json">'+json.dumps(obj,ensure_ascii=False,separators=(',',':'))+'</script>'
 s=re.sub(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',edit,s,flags=re.S)
 if questions and not faq_found:
  obj={'@context':'https://schema.org','@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in questions]}
  s=s.replace('</head>','<script type="application/ld+json">'+json.dumps(obj,separators=(',',':'))+'</script></head>',1)
 return s
def section(heading,paragraphs,points,questions,links,model=False):
 content=''.join('<p>'+p+'</p>' for p in paragraphs)
 if points:content+='<h3>Include in your purchase specification</h3><ul>'+''.join('<li>'+E(p)+'</li>' for p in points)+'</ul>'
 faq=''
 if questions:faq='<div class="procurement-content__faq">'+''.join('<h3>'+E(q)+'</h3><p>'+E(a)+'</p>' for q,a in questions)+'</div>'
 grid='<div class="procurement-content__grid"><div>'+content+'</div>'+faq+'</div>' if faq else content
 anchors='<div class="procurement-content__links">'+''.join('<a href="'+E(u)+'">'+E(label)+'</a>' for u,label in links)+'</div>'
 return '<!-- B2B PROCUREMENT START --><section class="procurement-content'+(' procurement-content--model' if model else '')+'" aria-label="Commercial purchasing information"><div class="procurement-content__inner"><span class="procurement-content__label">Commercial purchasing</span><h2>'+E(heading)+'</h2>'+grid+anchors+'</div></section><!-- B2B PROCUREMENT END -->'
def apply(file,title,description,heading,paragraphs,points=(),questions=(),links=(),h1=None,model=False):
 p=ROOT/file;s=p.read_text();old=s
 s=re.sub(r'<!-- B2B PROCUREMENT START -->.*?<!-- B2B PROCUREMENT END -->','',s,flags=re.S)
 s=metadata(s,title,description)
 if h1:s=re.sub(r'<h1([^>]*)>.*?</h1>',lambda m:'<h1'+m[1]+'>'+E(h1)+'</h1>',s,count=1,flags=re.S)
 s=s.replace('</main>',section(heading,paragraphs,points,questions,links,model)+'</main>',1)
 if '/assets/css/procurement-content.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/assets/css/procurement-content.css"></head>',1)
 s=schema(s,title,description,questions)
 if s!=old:p.write_text(s)
 changed.append(file)

AP='/products/height-adjustable-desk'
OP='/products/staff-desk'
EP='/products/executive-office-desk'
LC='/products/lounge-chairs'
OS='/products/office-sofa'
LS='/products/lounge-sofas'
GUIDE='/blog/height-adjustable-desk-vs-traditional-office-desk'
OEM='/oem-manufacturing'
RFQ='/contact'
common_links=[(RFQ,'Request a project quotation'),('/catalog','Request the product catalog'),('/packaging-loading','Review export packaging')]

apply('products/height-adjustable-desk.html','Height-Adjustable Desk Manufacturer & Supplier | HUANGSI',
 'Source electric height-adjustable desks and custom adjustable workstations from HUANGSI for distributors and commercial office projects. Request a bulk quote.',
 'Electric adjustable computer desks for bulk office projects',[
 'HUANGSI is a commercial office furniture manufacturer and adjustable computer desk supplier in Foshan, China. This collection brings together single-user electric sit-stand desks, dual bench desks and four-person adjustable workstations for distributors, fit-out contractors and corporate purchasing teams.',
 'For custom adjustable desks, start with the available models and submit the worktop dimensions, finish, frame color, control requirements and order quantity. Custom sizes and storage additions need a model-specific compatibility review; a desktop, lifting frame and cable plan must work together throughout the height travel.',
 'Compare an ergonomic adjustable computer desk by its documented height range, usable work surface, controls and stability at the required working height. A small or large office desk should fit both the user and the available floor area. Use the product specification rather than assuming that all adjustable desks share a load rating or electrical standard.',
 'Commercial adjustable workstation projects can combine matching single, two-person and four-person layouts. Review screens, power access and cable movement together before finalizing a modular workstation configuration.'],
 ['Model and quantity, including the mix of single, dual and four-person desks.','Worktop width and depth, required height range, finish and storage requirements.','Destination voltage and plug, controller preference and cable-routing plan.','Destination port, packing requirements, approved drawing and delivery target.'],
 [('Can you supply custom adjustable desks for a commercial office?', 'Custom dimensions, finishes and configuration options can be reviewed against the selected model and order quantity. Final availability and specifications are confirmed in the quotation.'),
 ('What should I ask an adjustable computer desk manufacturer to confirm?', 'Ask for model-specific dimensions, lifting range, controls, load information, destination electrical compatibility, packaging data and approval steps. Check that the quoted configuration matches the project drawing.'),
 ('Can I order adjustable workstations for several users?', 'The collection includes single-user, dual and four-person layouts. Share the number of users, room layout, power locations and privacy-screen requirements so a coordinated configuration can be reviewed.'),
 ('What are the MOQ, price and production lead time?', 'MOQ, price, sample arrangements and production timing depend on the model, customization and order scope. Send the quantity and destination to obtain a project-specific quotation.')],
 [(GUIDE,'Compare adjustable and fixed office desks'),(OP,'Browse staff desks and workstations'),(OEM,'Review OEM desk customization')]+common_links,
 h1='Height-Adjustable Desks for Commercial Offices')

apply('products/staff-desk.html','Commercial Office Workstations & Staff Desks | HUANGSI',
 'Plan modular office workstations and commercial staff desks with HUANGSI. Compare multi-user layouts, finishes, cable management and project supply options.',
 'Specify office computer workstations around your floor plan',[
 'Office workstation purchasing starts with the number of users, room dimensions and circulation space. HUANGSI staff desks and modular workstation systems can be reviewed as coordinated configurations for open-plan offices, project contractors and distributor orders.',
 'Compare a computer desk for office work by usable worktop space, monitor placement, screen height, storage and power access. Two-person and four-person configurations should preserve access to every seat and allow equipment cables to be routed without obstructing aisles.',
 'For custom adjustable workstations, use the <a href="'+AP+'">electric height-adjustable desk collection</a>. Fixed staff desks and electric sit-stand workstations are separate constructions; confirm the selected model rather than assuming that every office desk in this collection is adjustable.'],
 ['Seat count and desk arrangement, with a dimensioned floor plan.','Worktop size, materials, screen positions, storage and finish references.','Floor-box locations, cable management and installation access.'],
 [('How do I compare a workstation system with an individual office desk?', 'A workstation system coordinates several desks, screens, storage and services around a shared layout. An individual desk may suit a private office or a single user. Compare the complete configuration and available space.'),
 ('Can fixed and height-adjustable desks be included in one project?', 'A project can be reviewed with both desk types. Identify which users need electric height adjustment and review the separate models, finishes, power access and packaging before approval.')],
 [(AP,'View adjustable workstations'),('/blog/how-to-choose-office-workstations-for-commercial-projects','Office workstation buying guide')]+common_links)

apply('products/executive-office-desk.html','Executive Office Desks & Height-Adjustable Models | HUANGSI',
 'Explore executive office desks and selected height-adjustable executive models for commercial projects. Confirm dimensions, storage, finishes and bulk quotations.',
 'Choose an executive office desk by working space and configuration',[
 'An executive office desk must fit the private office, visitor seating and storage layout. Compare overall dimensions, return position, cabinet access and power modules before selecting an L-shaped or larger executive configuration.',
 'Selected models offer height adjustment, including <a href="/products/xinyo-01-height-adjustable-executive-desk">XINYO-01</a>, <a href="/products/hm-t01-height-adjustable-executive-desk">HM-T01</a> and <a href="/products/jg-01d30-executive-office-desk">JG-01D30</a>. Check which work surface moves, the documented mechanism and the model-specific dimensions. A fixed desk, adjustable side worktop and full sit-stand desk are not interchangeable specifications.',
 'For a custom adjustable executive office desk, submit the office drawing, required working height, finish references and quantity. Corner, L-shaped and U-shaped requests need a confirmed drawing and model review; availability is not inferred from a keyword or a general collection image.'],
 ['Room dimensions, visitor-chair clearance and cabinet positions.','Selected model, overall desk size, return direction and adjustment requirement.','Finish, storage, socket standard and destination.'],
 [('Do all executive desks have height adjustment?', 'No. Only selected models have an adjustment function, and the moving work surface differs by model. Check the individual specification and confirm the required function before ordering.'),
 ('Can I request an L-shaped or U-shaped adjustable executive desk?', 'Send a dimensioned drawing and the required moving work surface for review. Construction, dimensions and availability must be confirmed against a specific model and quotation.')],
 [(AP,'Compare electric sit-stand desks'),('/blog/executive-office-desk-materials-and-size-guide','Executive desk materials and size guide')]+common_links)

apply('products/lounge-chairs.html','Commercial Lounge & Accent Chair Supplier | HUANGSI',
 'Source lounge and accent chairs for reception areas, offices and hospitality projects. Review HUANGSI models, upholstery, dimensions and bulk supply options.',
 'Lounge and accent chairs for commercial reception spaces',[
 'For buyers comparing accent chair manufacturers, commercial suitability starts with the actual model and its intended space. HUANGSI supplies lounge seating for reception areas, collaborative offices and hospitality projects, with upholstered designs and base styles shown in this collection.',
 'Choose a lounge chair by seat dimensions, back support, arm clearance and the circulation space around it. Match upholstery and frame finishes to the surrounding furniture, and confirm whether a swivel base, sled base or matching ottoman is included in the selected configuration.',
 'As an accent chair supplier for project inquiries, HUANGSI can review model choices, colors, upholstery and quantities. Ask for the model specification and fabric reference rather than assuming that a residential accent chair and a commercial lounge chair have the same construction.'],
 ['Model codes, quantities and the reception or lounge floor plan.','Required seat dimensions, arms, base type and upholstery reference.','Matching sofas, packing requirements and destination.'],
 [('How should I choose an accent chair supplier for a reception project?', 'Compare model specifications, dimensions, upholstery choices, base construction, approval samples and packaging. Ask the supplier to confirm the actual commercial configuration included in the quotation.'),
 ('Can lounge chairs and sofas use coordinated finishes?', 'Share the selected chair and sofa models with a finish or upholstery reference. Available combinations can be reviewed for the project; final fabric and color choices are confirmed before production.')],
 [(LS,'Coordinate with lounge sofas'),(OS,'Compare office reception sofas'),('/applications/reception-area-furniture','Plan a reception area')]+common_links,
 h1='Commercial Lounge & Accent Chairs')

apply('products/office-sofa.html','Commercial Office Sofas & Reception Seating | HUANGSI',
 'Explore commercial office sofas and reception seating from HUANGSI. Compare model dimensions, upholstery and layouts for bulk office furniture projects.',
 'Office couches and sofas for reception and private offices',[
 'An office couch should be selected for the room layout and the number of visitors it needs to accommodate. Compare single-seat and multi-seat models by overall dimensions, arm width, upholstery and access through the building.',
 'For a three-seater office couch or a coordinated reception sofa arrangement, send the intended model, quantity and floor plan. Confirm the actual number of seats and dimensions from the model specification; a product photograph alone does not establish seating capacity.',
 'Office sofa supply can be reviewed together with <a href="'+LC+'">commercial lounge chairs</a> and <a href="'+LS+'">lounge sofas</a> for project orders. Color, upholstery and packing details are confirmed for each selected model.'],
 ['Model, required seating capacity, room dimensions and quantity.','Upholstery reference, finish and any coordinated chairs.','Door or lift access, delivery destination and packing requirements.'],
 [('How do I specify a three-seater office couch?', 'Identify the model and ask for its overall dimensions and seating configuration. Check the layout, visitor circulation and delivery access before approving the order.'),
 ('Can office sofas be included in a mixed furniture order?', 'Share the sofa models with the desks, chairs and other required categories. The quotation and loading plan can be reviewed against model dimensions, quantities and packaging.')],
 [(LC,'Browse reception lounge chairs'),('/applications/reception-area-furniture','Reception furniture planning')]+common_links)

apply('products/lounge-sofas.html','Commercial Lounge Sofas for Office Projects | HUANGSI',
 'Compare HUANGSI lounge sofas for collaborative offices and reception spaces. Review seating layouts, dimensions, upholstery and project quotation requirements.',
 'Plan lounge sofas around commercial seating layouts',[
 'Lounge sofas support reception spaces, shared office lounges and informal meeting areas. Choose the model around the available floor area, seating arrangement and the access needed for people to move between desks and lounge furniture.',
 'When comparing a lounge sofa or lounge couch, review overall width and depth, seat configuration, back support and upholstery options. Requests for a three-seater lounge should identify an actual model and seating capacity before a quotation is approved.',
 'Build a coordinated lounge using the selected sofa models and <a href="'+LC+'">commercial lounge chairs</a>. Confirm fabric references and packing dimensions with the project specification; the collection does not imply that every residential chaise or sectional configuration is available.'],
 ['Model codes, quantity, seating capacity and the layout of the lounge.','Overall dimensions, upholstery references and any matching chairs.','Delivery access, destination and packaging requirements.'],
 [('What should a commercial lounge sofa quotation include?', 'It should identify the model, dimensions, seating configuration, upholstery, finish, quantity and packaging. Confirm any substitutions against the approved layout and finish reference.'),
 ('Can I coordinate lounge couches with office furniture?', 'Send the selected lounge sofa and chair models with the office furniture list. Matching finishes and project loading arrangements can be reviewed before the quotation is finalized.')],
 [(LC,'View lounge and accent chairs'),(OS,'Compare office sofas')]+common_links)

apply('products/mesh-office-chairs.html','Ergonomic Mesh Office Chairs for Bulk Supply | HUANGSI',
 'Compare HUANGSI mesh office chairs for commercial workplaces and bulk projects. Review adjustments, dimensions and compatibility with office desk layouts.',
 'Match office chairs to adjustable desks and daily tasks',[
 'For an office chair used with an adjustable desk, review seat-height adjustment, arm clearance and the user position at the seated desk setting. Desk travel and chair adjustment serve different purposes; a sit-stand desk does not make every chair configuration suitable.',
 'Compare the individual mesh office chair specification for lumbar support, arm configuration, base and mechanism. Model-specific choices can be reviewed for distributor orders and coordinated office workstation projects.'],
 ['Chair model and quantity, selected desk models and seated working height.','Arm clearance, required adjustment functions, finish and colors.'],
 [('How should I choose an office chair for an adjustable desk?', 'Check the chair seat-height range, arm clearance and the seated desk height against the user and task. Use the model specification; do not assume the chair is suitable for sitting at the desk standing height.')],
 [(AP,'Browse height-adjustable desks'),('/blog/ergonomic-mesh-office-chair-bulk-buying-guide','Mesh office chair bulk buying guide')]+common_links)

apply('products/leather-office-chair.html','Executive Leather Office Chairs for Projects | HUANGSI',
 'Source leather and upholstered office chairs for executive offices and meeting spaces. Confirm model dimensions, upholstery, colors and project quantities.',
 'Specify upholstered chairs for executive and meeting spaces',[
 'Compare an arm chair for office use by seat height, width, arm clearance and the selected desk or meeting table. The required base and mechanism should be stated separately for task seating, visitor seating and boardroom use.',
 'For color-specific inquiries such as white conference chairs, send the intended model and upholstery reference. Color availability and the actual upholstery material must be confirmed in the quotation; a broad leather-chair collection does not establish that every model is available in white.'],
 ['Model, meeting or office use, seat quantity and desk or table height.','Upholstery material, color reference, arms, base and mechanism.'],
 [('Can I order white chairs for a conference room?', 'Share the selected model, color reference and quantity. Upholstery options and availability must be confirmed before order approval.'),
 ('Are all upholstered office chairs made with the same material?', 'No. Materials and mechanisms vary by model. Check the individual specification and require the quotation to identify the upholstery and components being supplied.')],
 [('/products/conference-tables','Compare meeting tables'),(EP,'Coordinate executive desks')]+common_links)

apply('index.html','Commercial Office Furniture Manufacturer | HUANGSI',
 'HUANGSI supplies commercial office furniture, electric adjustable desks, workstations, chairs and sofas for distributors, OEM orders and bulk project quotations.',
 'Commercial office furniture for coordinated project orders',[
 'Plan fixed office desks, electric height-adjustable workstations, seating and lounge furniture around one procurement brief. HUANGSI supports commercial office furniture inquiries from distributors, contractors and corporate project buyers in Foshan, China.',
 'Send a product list or floor plan, the quantity for each model, finish references and the destination. Custom adjustable desks and multi-user workstation requests are reviewed against model specifications, electrical requirements and the approved layout.'],
 links=[(AP,'Electric adjustable desks and workstations'),(OP,'Staff desks and modular workstations'),(LC,'Commercial lounge and accent chairs'),(OS,'Office reception sofas'),(OEM,'OEM project specification'),(RFQ,'Send a project RFQ')])

apply('oem-manufacturing.html','OEM Office Furniture & Custom Adjustable Desks | HUANGSI',
 'Review OEM office furniture and custom adjustable desk projects with HUANGSI. Submit models, drawings, finishes, electrical requirements and quantities for quotation.',
 'Prepare an OEM adjustable desk and workstation specification',[
 'An OEM adjustable desk request should identify the base model before changes to the worktop, frame finish, controls or packaging are reviewed. A custom size adjustable desk needs a compatible lifting frame and a clear cable plan; confirm available configurations with the project quotation.',
 'For commercial adjustable workstations, include the seat count, arrangement and privacy screens. Keep the approved model codes and drawing revisions linked to the finish references so repeated project orders can be specified consistently.'],
 ['Base model, drawing revision, desktop dimensions and lifting requirements.','Destination voltage and plug, control preference and power accessories.','Approved colors, branding or labeling request, quantity and packing brief.'],
 [('What information is needed for OEM adjustable desk quotes?', 'Provide the base model, quantity, drawings, finishes, destination electrical standard, packing or labeling requirements and destination port. Configuration and pricing are confirmed after review.'),
 ('Can OEM changes alter the lifting desk load rating?', 'A custom desktop or accessory can change the configuration. Ask for model-specific compatibility and performance information for the quoted version; do not carry over a rating from a different model.')],
 [(AP,'Review adjustable desk models'),(GUIDE,'Compare desk construction and controls')]+common_links)

apply('blog/height-adjustable-desk-vs-traditional-office-desk.html','Adjustable Desk Buying Guide for Commercial Offices | HUANGSI',
 'Compare adjustable and fixed office desks for commercial projects: ergonomics, worktop sizes, workstation layouts, controls, cable management and supplier quotations.',
 'Compare custom adjustable desks before requesting supplier quotes',[
 'For a commercial office, the benefits of adjustable desks should be evaluated against the user brief, budget and service requirements. Height adjustment can support changes between seated and standing work; it does not replace a suitable chair, monitor position or a safe cable plan.',
 'A compact adjustable computer desk may suit a smaller workspace, while larger worktops need a compatible frame and enough clearance through the full travel. Compare desktop width and depth, storage access, arm clearance and the required height range instead of choosing by a general size label.',
 'Ask an adjustable computer desk supplier to identify the actual quoted model, controls, load information and electrical standard. For custom adjustable workstations, compare single, dual and four-person configurations with the same layout and finish brief.'],
 questions=[('Are adjustable desks worth considering for an office project?', 'Compare the task, user needs, power access, available space, service support and total project cost. A sit-stand desk can support different working positions, while a fixed desk may suit tasks that need a simpler or constant-height setup.'),
 ('How do I compare adjustable desk sizes and storage options?', 'Check the worktop dimensions, approved frame compatibility and clearance for storage, arms and cables. Ask for a drawing of any custom configuration instead of assuming that shelves or drawers fit every model.')],
 links=[(AP,'Compare electric adjustable desk models'),(OP,'Review fixed office workstations'),(OEM,'Prepare a custom desk specification')])

apply('blog/how-to-choose-office-workstations-for-commercial-projects.html','Modular Office Workstation Procurement Guide | HUANGSI',
 'Plan modular office workstations and adjustable computer workstations for commercial projects. Compare seat layouts, worktop sizes, power and project quotations.',
 'Coordinate adjustable computer workstations with the office layout',[
 'Start a modular office workstation specification with seat count, circulation and power locations. A two-person or four-person arrangement should be assessed as a complete layout, including screen heights, storage access and safe movement around the desks.',
 'When the brief includes adjustable workstation desks, check each user position at both seated and raised heights. Shared screens, desktop edges and cable runs should remain clear through the full travel. Compare the actual adjustable model with the fixed staff-desk alternative before approving a floor plan.'],
 questions=[('What should a custom adjustable workstation drawing show?', 'Show the seat count, desktop dimensions, desk travel, screen positions, storage, power locations and circulation. Confirm these against the selected model before finalizing the quotation.')],
 links=[(AP,'View adjustable workstation configurations'),(OP,'View staff desk systems'),(RFQ,'Submit a workstation layout for quotation')])

apply('blog/how-to-customize-office-furniture-for-corporate-projects.html','Custom Office Furniture & Adjustable Desk Planning | HUANGSI',
 'Prepare a custom office furniture RFQ covering adjustable desks, workstations and lounge seating. Confirm model choices, finishes, quantity and project scope.',
 'Build one specification for desks, office chairs and lounge furniture',[
 'A coordinated commercial office furniture order may include custom adjustable desks, fixed staff desks, office chairs and reception seating. Define the quantity and finish for each model, then separate confirmed standard configurations from requests that need a new drawing or approval sample.',
 'For lounge and accent chairs, give the seat dimensions, base preference and upholstery reference. For a three-seater office couch or lounge sofa, specify the model and actual seating configuration. Color coordination should be confirmed with material references rather than screen images alone.'],
 links=[(OEM,'Review the OEM approval workflow'),(AP,'Choose adjustable desk models'),(LC,'Choose lounge and accent chairs'),(OS,'Choose office sofa models'),(RFQ,'Send a coordinated project RFQ')])

# Model pages retain all factual specifications and visual components.
models={
 'products/gc-p01d-1-single-height-adjustable-desk.html':('Single-user electric adjustable computer desk',AP,'one-user workstation', ['Worktop size, model-specific height range and control requirements.','Quantity, finish, destination electrical standard and cable plan.']),
 'products/gc-p01d-2-dual-height-adjustable-bench-desk.html':('Dual electric adjustable workstation',AP,'two-person bench arrangement', ['Two-user layout, privacy screen and power positions.','Worktop dimensions, finish and electrical standard for the destination.']),
 'products/gc-p01d-2a-four-person-height-adjustable-workstation.html':('Four-person electric adjustable workstation',AP,'four-person desk arrangement', ['Four-seat floor plan, circulation and independent desk movement.','Screen requirements, power positions, worktop finish and quantity.']),
 'products/gc-p05d-2-black-dual-height-adjustable-bench-desk.html':('Black dual height-adjustable bench desk',AP,'two-person black bench configuration', ['Desk layout, specified black frame finish and worktop reference.','Screen and cable requirements, quantity and destination electrical standard.']),
 'products/gc-p05d-2a-plus-black-four-person-height-adjustable-workstation.html':('Black four-person adjustable workstation',AP,'four-person black workstation configuration', ['Four-seat layout, finish reference and required screen arrangement.','Power access, desk movement clearance and project quantity.']),
 'products/kj-sj-kbbt12-a-single-height-adjustable-desk.html':('Single height-adjustable computer desk',AP,'single-user sit-stand layout', ['Required worktop size and the height range for the selected configuration.','Electrical compatibility, finish, quantity and destination.']),
 'products/kj-sj-kbbt12-e-dual-height-adjustable-bench-desk.html':('Dual height-adjustable office workstation',AP,'back-to-back two-person layout', ['Back-to-back layout, worktop dimensions and screen requirements.','Lifting configuration, finish, quantity and destination electrical standard.']),
 'products/xinyo-01-height-adjustable-executive-desk.html':('Height-adjustable executive office desk',EP,'executive layout with a motorized side worktop', ['Overall office layout, return position and the work surface that needs adjustment.','Selected size, finish, power module standard and project quantity.']),
 'products/hm-t01-height-adjustable-executive-desk.html':('Height-adjustable executive office desk',EP,'executive desk arrangement', ['Room dimensions, visitor clearance, storage access and adjustment requirement.','Selected model size, finish and destination.']),
 'products/jg-01d30-executive-office-desk.html':('Height-adjustable executive office desk',EP,'private-office desk layout', ['Selected worktop arrangement, room dimensions and adjustment requirement.','Finish reference, quantity and power-module standard.']),
 'products/md-mop011-lounge-chair.html':('Upholstered commercial lounge chair',LC,'reception seating layout', ['Seat dimensions, upholstered finish and the specified sled base.','Reception layout, model quantity and coordinated sofa finishes.']),
 'products/md-mp113-lounge-chair.html':('Commercial lounge chair and ottoman set',LC,'lounge seating arrangement', ['Chair dimensions, base configuration and the matching ottoman scope.','Upholstery reference, quantity and overall lounge layout.']),
 'products/md-mp137-lounge-chair.html':('Commercial lounge and accent chair',LC,'office lounge arrangement', ['Model-specific chair dimensions, upholstery and base.','Seat quantity, layout clearances and any matching lounge furniture.']),
 'products/md-qf001-lounge-chair.html':('Commercial lounge and accent chair',LC,'commercial reception arrangement', ['Chair dimensions, finish reference and seating arrangement.','Model quantity, matching furniture and packing destination.']),
 'products/jl-sf231-office-sofa.html':('Commercial office sofa for reception projects',OS,'office reception sofa layout', ['Model dimensions and the required seating configuration.','Upholstery, quantity, room layout and delivery access.']),
 'products/fl-hs-jl821-office-sofa.html':('Commercial office sofa for project supply',OS,'private-office or reception seating layout', ['Overall sofa dimensions, seat configuration and room clearance.','Finish reference, quantity and destination packing requirements.']),
 'products/ld25-25-lounge-sofa.html':('Commercial lounge sofa for office projects',LS,'collaborative lounge seating layout', ['Model dimensions and required lounge seating arrangement.','Upholstery reference, quantity and matching chairs.']),
 'products/ld26-14-lounge-sofa.html':('Commercial lounge sofa for reception spaces',LS,'reception lounge layout', ['Model dimensions, seat configuration and circulation.','Upholstery, quantity and delivery access.']),
 'products/a007-ergonomic-mesh-chair-with-footrest.html':('Ergonomic mesh office chair for project supply','/products/mesh-office-chairs','seated office workstation', ['Chair adjustments, arm clearance and the selected desk seated height.','Model quantity, finish and required office task.']),
}
for file,(topic,parent,use,points) in models.items():
 p=ROOT/file
 if not p.exists():raise FileNotFoundError(file)
 s=p.read_text()
 blocks=[json.loads(m) for m in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',s,re.S)]
 item=next(x for x in blocks if x.get('@type')=='ItemPage')
 model=item.get('identifier') or item['name'].split()[0]
 name=item['name']
 title=model+' '+topic+' | HUANGSI'
 # Shorter title remains specific to the model and product category.
 if len(title)>78:title=model+' '+topic.replace('for project supply','').replace('for reception projects','').replace('for office projects','').replace('for reception spaces','').strip()+' | HUANGSI'
 desc=f'Review {model} for a {use}. Confirm model dimensions, finish, configuration and bulk project requirements with HUANGSI.'
 apply(file,title,desc,f'Specify {model} for a commercial furniture order',[
  f'{E(name)} can be reviewed for a {E(use)}. Use the dimensions and functions listed for this model when preparing the project specification; other products in the collection may use different materials or mechanisms.',
  f'For a bulk order or OEM inquiry, identify {E(model)}, the quantity, destination and required finish. Any custom size, upholstery or configuration request needs confirmation against the quoted model before approval.'],
  points=points,links=[(parent,'Compare the product collection'),(RFQ+'?product='+__import__('urllib.parse',fromlist=['quote']).quote(model),'Request '+model+' project details'),('/packaging-loading','Review packing requirements')],model=True)

# Keep source-to-page decisions reviewable in the repository.
source=Path('/tmp/huangsi-coverage/attached-keywords.json')
if source.exists():
 rows=json.loads(source.read_text());records=[]
 for r in rows:
  cell=next((k for k in r if k.startswith('B') and k[1:].isdigit()),None)
  if not cell or int(cell[1:])<9:continue
  n=cell[1:];kw=r.get('B'+n,'');target=r.get('M'+n,'');cat=r.get('J'+n,'')
  path=ROOT/('index.html' if target==ORIGIN+'/' else target.removeprefix(ORIGIN+'/')+'.html')
  body=path.read_text() if path.exists() else ''
  text=html.unescape(re.sub('<[^>]+>',' ',re.sub(r'<script\b.*?</script>','',body,flags=re.S)))
  text=re.sub(r'\s+',' ',text).lower()
  mode='Exact phrase in page' if kw.lower() in text else 'Natural wording within mapped buyer topic'
  review=r.get('Q'+n,'')
  if re.search(r'heavy duty|u.shaped|shelves|shelf|drawers|drawer|adjustable width|width adjustable|white factories|wood|teacher|top desk',kw):mode='Topic covered; specific construction or wording requires confirmation'
  records.append([kw,r.get('C'+n),r.get('D'+n),cat,target,mode,review])
 dest=ROOT/'seo';dest.mkdir(exist_ok=True)
 with (dest/'b2b-keyword-coverage-20261004.csv').open('w',newline='',encoding='utf-8-sig') as f:
  writer=csv.writer(f);writer.writerow(['Keyword','Original weighted score','B2B score','Category','Target URL','Content treatment','Original verification note']);writer.writerows(records)
 (dest/'b2b-keyword-coverage-20261004.json').write_text(json.dumps({'date':DATE,'source':'HUANGSI-B2B-keywords-ranked-20261001(1).xlsx','keywords_assessed':len(records),'changed_html':changed,'policy':'Buyer topics use natural wording. Exact keyword variants, zero-volume phrases and unconfirmed specifications are not claims of rankings or product availability.','treatment_counts':{mode:sum(r[5]==mode for r in records) for mode in {r[5] for r in records}}},ensure_ascii=False,indent=2))
print(json.dumps({'changed_html':len(changed),'files':changed},indent=2))
