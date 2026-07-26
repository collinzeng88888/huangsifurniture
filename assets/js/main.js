
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  const header = document.querySelector('.home-header');
  const megaItem = document.querySelector('.nav-item-mega');
  const megaLink = megaItem ? megaItem.querySelector('.nav-top-link') : null;

  if(btn && nav){
    btn.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if(!isOpen && megaItem){
        megaItem.classList.remove('is-open');
        if(megaLink) megaLink.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if(megaItem && megaLink){
    const closeMega = ()=>{
      megaItem.classList.remove('is-open');
      megaLink.setAttribute('aria-expanded', 'false');
    };
    const openMega = ()=>{
      megaItem.classList.add('is-open');
      megaLink.setAttribute('aria-expanded', 'true');
    };

    megaItem.addEventListener('mouseenter', ()=>{
      if(window.innerWidth > 900) openMega();
    });
    megaItem.addEventListener('mouseleave', ()=>{
      if(window.innerWidth > 900) closeMega();
    });

    megaLink.addEventListener('click', (e)=>{
      if(window.innerWidth <= 900){
        e.preventDefault();
        megaItem.classList.toggle('is-open');
        megaLink.setAttribute('aria-expanded', String(megaItem.classList.contains('is-open')));
      }
    });

    document.addEventListener('click', (e)=>{
      if(!megaItem.contains(e.target) && window.innerWidth <= 900){
        closeMega();
      }
    });

    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 900){
        megaItem.classList.remove('is-open');
        megaLink.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if(header){
    const syncHeader = ()=> header.classList.toggle('is-scrolled', window.scrollY > 36);
    syncHeader();
    window.addEventListener('scroll', syncHeader, {passive:true});
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){
        e.preventDefault();
        t.scrollIntoView({behavior:'smooth'});
        if(nav) nav.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('[data-rfq-form]').forEach(form=>{
    form.addEventListener('submit', event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;

      const values = Object.fromEntries(new FormData(form).entries());
      const subjectParts = ['Website RFQ'];
      if(values.product) subjectParts.push(values.product);
      if(values.company || values.name) subjectParts.push(values.company || values.name);

      const labels = {
        name: 'Name',
        company: 'Company',
        email: 'Business email',
        country: 'Country / region',
        product: 'Product category',
        quantity: 'Estimated quantity',
        destination: 'Destination',
        schedule: 'Target schedule',
        message: 'Project details'
      };
      const body = Object.entries(labels)
        .filter(([key])=> values[key])
        .map(([key,label])=> `${label}: ${values[key]}`)
        .join('\n\n');
      const status = form.querySelector('[data-rfq-status]');
      if(status) status.textContent = 'Opening your email application with the RFQ details prepared…';

      window.location.href = `mailto:huangsifurniture@gmail.com?subject=${encodeURIComponent(subjectParts.join(' - '))}&body=${encodeURIComponent(body)}`;
    });
  });

  const heroSlider = document.querySelector('.cover-hero-slider');
  if(heroSlider){
    const slides = Array.from(heroSlider.querySelectorAll('.cover-hero-slide'));
    const dots = Array.from(heroSlider.querySelectorAll('.cover-hero__dot'));
    const prevBtn = heroSlider.querySelector('.cover-hero__arrow--prev');
    const nextBtn = heroSlider.querySelector('.cover-hero__arrow--next');
    let activeIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
    if(activeIndex < 0) activeIndex = 0;
    let timer = null;

    const setSlide = (index)=>{
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i)=> slide.classList.toggle('is-active', i === activeIndex));
      dots.forEach((dot, i)=>{
        const isActive = i === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    };

    const startAuto = ()=>{
      stopAuto();
      timer = window.setInterval(()=> setSlide(activeIndex + 1), 5200);
    };
    const stopAuto = ()=>{
      if(timer){
        window.clearInterval(timer);
        timer = null;
      }
    };
    const nudgeTo = (index)=>{
      setSlide(index);
      startAuto();
    };

    if(prevBtn) prevBtn.addEventListener('click', ()=> nudgeTo(activeIndex - 1));
    if(nextBtn) nextBtn.addEventListener('click', ()=> nudgeTo(activeIndex + 1));
    dots.forEach((dot, index)=>{
      dot.addEventListener('click', ()=> nudgeTo(index));
    });

    heroSlider.addEventListener('mouseenter', stopAuto);
    heroSlider.addEventListener('mouseleave', startAuto);
    heroSlider.addEventListener('focusin', stopAuto);
    heroSlider.addEventListener('focusout', startAuto);

    setSlide(activeIndex);
    startAuto();
  }

});
