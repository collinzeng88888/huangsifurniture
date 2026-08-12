document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  const header = document.querySelector('.home-header');
  const megaItem = document.querySelector('.nav-item-mega');
  const megaLink = megaItem ? megaItem.querySelector('.nav-top-link') : null;

  const a008Card = document.querySelector('.mesh-chair-card[data-name="A008"]');
  if(a008Card){
    const a008Url = '/products/a008-multi-support-mesh-office-chair';
    a008Card.classList.add('mesh-chair-card--link');
    a008Card.setAttribute('role', 'link');
    a008Card.setAttribute('tabindex', '0');
    a008Card.setAttribute('aria-label', 'View A008 Multi-Support Ergonomic Mesh Office Chair details');
    a008Card.style.cursor = 'pointer';

    const a008Link = a008Card.querySelector('.mesh-chair-card__link');
    if(a008Link){
      a008Link.setAttribute('href', a008Url);
      a008Link.innerHTML = 'View product <span>→</span>';
    }

    a008Card.addEventListener('click', event=>{
      if(event.target.closest('a')) return;
      window.location.href = a008Url;
    });
    a008Card.addEventListener('keydown', event=>{
      if(event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        window.location.href = a008Url;
      }
    });
  }

  if(btn && nav){
    btn.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      if(!isOpen && megaItem){
        megaItem.classList.remove('is-open');
        if(megaLink) megaLink.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event=>{
      if(event.key === 'Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation');
        btn.focus();
      }
    });
  }

  if(megaItem && megaLink){
    const megaMenu = megaItem.querySelector('.home-mega-menu');
    let megaCloseTimer = null;
    const cancelMegaClose = ()=>{
      if(megaCloseTimer){
        window.clearTimeout(megaCloseTimer);
        megaCloseTimer = null;
      }
    };
    const closeMega = ()=>{
      cancelMegaClose();
      megaItem.classList.remove('is-open');
      megaLink.setAttribute('aria-expanded', 'false');
    };
    const openMega = ()=>{
      cancelMegaClose();
      megaItem.classList.add('is-open');
      megaLink.setAttribute('aria-expanded', 'true');
    };
    const scheduleMegaClose = ()=>{
      cancelMegaClose();
      megaCloseTimer = window.setTimeout(closeMega, 450);
    };

    megaItem.addEventListener('mouseenter', ()=>{
      if(window.innerWidth > 900) openMega();
    });
    megaItem.addEventListener('mouseleave', ()=>{
      if(window.innerWidth > 900) scheduleMegaClose();
    });
    if(megaMenu){
      megaMenu.addEventListener('mouseenter', openMega);
      megaMenu.addEventListener('mouseleave', ()=>{
        if(window.innerWidth > 900) scheduleMegaClose();
      });
    }

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

  const buildRfqMessage = form=>{
    const values = Object.fromEntries(new FormData(form).entries());
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
    return {values, body};
  };

  document.querySelectorAll('[data-rfq-form]').forEach(form=>{
    form.addEventListener('submit', event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;

      const {values, body} = buildRfqMessage(form);
      const subjectParts = ['Website RFQ'];
      if(values.product) subjectParts.push(values.product);
      if(values.company || values.name) subjectParts.push(values.company || values.name);

      const status = form.querySelector('[data-rfq-status]');
      if(status) status.textContent = 'Opening your email application with the RFQ details prepared…';

      window.location.href = `mailto:huangsifurniture@gmail.com?subject=${encodeURIComponent(subjectParts.join(' - '))}&body=${encodeURIComponent(body)}`;
    });

    const copyButton = form.querySelector('[data-copy-rfq]');
    if(copyButton){
      copyButton.addEventListener('click', async ()=>{
        if(!form.reportValidity()) return;
        const {body} = buildRfqMessage(form);
        const status = form.querySelector('[data-rfq-status]');
        try{
          await navigator.clipboard.writeText(`To: huangsifurniture@gmail.com\n\n${body}`);
          if(status) status.textContent = 'RFQ details copied. Paste them into your preferred email or messaging application.';
        }catch{
          if(status) status.textContent = 'Copy was blocked by your browser. Email huangsifurniture@gmail.com directly.';
        }
      });
    }
  });

  const heroSlider = document.querySelector('.cover-hero-slider');
  if(heroSlider){
    const slides = Array.from(heroSlider.querySelectorAll('.cover-hero-slide'));
    const dots = Array.from(heroSlider.querySelectorAll('.cover-hero__dot'));
    const prevBtn = heroSlider.querySelector('.cover-hero__arrow--prev');
    const nextBtn = heroSlider.querySelector('.cover-hero__arrow--next');
    const pauseBtn = heroSlider.querySelector('.cover-hero__pause');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = slides.findIndex(slide => slide.classList.contains('is-active'));
    if(activeIndex < 0) activeIndex = 0;
    let timer = null;
    let userPaused = reduceMotion.matches;

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
      if(userPaused || reduceMotion.matches) return;
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
    const syncPauseButton = ()=>{
      if(!pauseBtn) return;
      pauseBtn.textContent = userPaused ? 'Play' : 'Pause';
      pauseBtn.setAttribute('aria-pressed', String(userPaused));
      pauseBtn.setAttribute('aria-label', userPaused ? 'Play automatic slides' : 'Pause automatic slides');
    };

    if(prevBtn) prevBtn.addEventListener('click', ()=> nudgeTo(activeIndex - 1));
    if(nextBtn) nextBtn.addEventListener('click', ()=> nudgeTo(activeIndex + 1));
    dots.forEach((dot, index)=>{
      dot.addEventListener('click', ()=> nudgeTo(index));
    });
    if(pauseBtn){
      pauseBtn.addEventListener('click', ()=>{
        userPaused = !userPaused;
        if(userPaused) stopAuto();
        else startAuto();
        syncPauseButton();
      });
    }
    reduceMotion.addEventListener('change', ()=>{
      if(reduceMotion.matches) stopAuto();
      else if(!userPaused) startAuto();
      syncPauseButton();
    });

    heroSlider.addEventListener('mouseenter', stopAuto);
    heroSlider.addEventListener('mouseleave', startAuto);
    heroSlider.addEventListener('focusin', stopAuto);
    heroSlider.addEventListener('focusout', startAuto);

    setSlide(activeIndex);
    syncPauseButton();
    startAuto();
  }

});
