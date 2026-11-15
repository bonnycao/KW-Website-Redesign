/* Hero animation, responsive navigation, footer behaviors. */

(()=>{const hero=document.querySelector('.hero');const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let seen=false;try{seen=sessionStorage.getItem('kwLighthouseIntroPlayed')==='1'}catch(e){}if(seen||reduce){hero.classList.add('is-revealed')}else{try{sessionStorage.setItem('kwLighthouseIntroPlayed','1')}catch(e){}setTimeout(()=>hero.classList.add('is-revealed'),1200)}})();
const menuBtn=document.querySelector('.menu-btn');const mobileNav=document.querySelector('.mobile-nav');const menuIcon=menuBtn.querySelector('.menu-icon');function closeMenu(){mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open navigation menu');menuIcon.textContent='menu'}menuBtn.addEventListener('click',()=>{const isOpen=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(isOpen));menuBtn.setAttribute('aria-label',isOpen?'Close navigation menu':'Open navigation menu');menuIcon.textContent=isOpen?'close':'menu'});document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));window.addEventListener('resize',()=>{if(innerWidth>1210)closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.getElementById('year').textContent=new Date().getFullYear();

// Accessible desktop dropdown toggles, outside-click dismissal, and Escape support.
const desktopDropdowns=[...document.querySelectorAll('.desktop-nav .has-dropdown')];
function closeDropdowns(){desktopDropdowns.forEach(item=>{item.classList.remove('open');item.querySelector('.dropdown-trigger').setAttribute('aria-expanded','false')})}
desktopDropdowns.forEach(item=>{const trigger=item.querySelector('.dropdown-trigger');trigger.addEventListener('click',event=>{event.stopPropagation();const wasOpen=item.classList.contains('open');closeDropdowns();if(!wasOpen){item.classList.add('open');trigger.setAttribute('aria-expanded','true')}})});
document.addEventListener('click',event=>{if(!event.target.closest('.desktop-nav .has-dropdown'))closeDropdowns()});
document.querySelectorAll('.mobile-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{const panel=document.getElementById(trigger.getAttribute('aria-controls'));const open=panel.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open));trigger.querySelector('.chevron').style.transform=open?'rotate(180deg)':''}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeDropdowns();document.querySelectorAll('.mobile-submenu.open').forEach(panel=>panel.classList.remove('open'));document.querySelectorAll('.mobile-trigger').forEach(trigger=>trigger.setAttribute('aria-expanded','false'));}});


// Shared scroll-to-top button; appears after the visitor scrolls down.
(()=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='kw-back-to-top';
  button.setAttribute('aria-label','Back to top');
  button.setAttribute('title','Back to top');
  button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5m-7 7 7-7 7 7"/></svg>';
  document.body.appendChild(button);
  const update=()=>{const visible=window.scrollY>300;button.classList.toggle('is-visible',visible);button.tabIndex=visible?0:-1;};
  window.addEventListener('scroll',update,{passive:true});
  update();
  button.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
})();

// Donate Sample 3: decorative heart-centered burst; existing external links navigate normally.
(()=>{
  const points=[[0,-34],[23,-25],[35,0],[24,25],[0,35],[-24,25],[-35,0],[-23,-25]];
  document.querySelectorAll('a.header-donate').forEach(link=>{
    const heart=link.querySelector('svg.donate-heart');
    if(!heart||heart.closest('.kw-heart-burst-origin'))return;
    const origin=document.createElement('span');
    origin.className='kw-heart-burst-origin';
    origin.setAttribute('aria-hidden','true');
    heart.before(origin);
    origin.appendChild(heart);
    const ring=document.createElement('span');ring.className='kw-heart-ring';origin.prepend(ring);
    points.forEach(([x,y])=>{
      const dot=document.createElement('span');dot.className='kw-heart-dot';
      dot.style.setProperty('--kw-dx',x+'px');dot.style.setProperty('--kw-dy',y+'px');
      origin.appendChild(dot);
    });
    const playBurst=()=>{
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      origin.classList.remove('kw-burst');
      void origin.offsetWidth;
      origin.classList.add('kw-burst');
    };
    const resetBurst=()=>origin.classList.remove('kw-burst');
    link.addEventListener('pointerenter',playBurst);
    link.addEventListener('pointerleave',resetBurst);
    link.addEventListener('focus',playBurst);
    link.addEventListener('blur',resetBurst);
  });
})();
