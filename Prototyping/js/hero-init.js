/* Runs early to prevent replay flash for returning visitors. */
try{if(sessionStorage.getItem('kwLighthouseIntroPlayed')==='1')document.documentElement.classList.add('kw-seen')}catch(e){}
