(function(){
'use strict';
var CFG=window.EW_CONFIG||{};
var root=document.documentElement;
var EN=window.EW_EN||{};
function sget(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sset(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var lang=root.lang==='en'?'en':'fr';

/* ---------- Thème ---------- */
function setTheme(t){root.setAttribute('data-theme',t);sset('ew-theme',t);
  $$('.theme-btn').forEach(function(b){b.setAttribute('aria-pressed',String(t==='dark'))});}
/* ---------- Langue ---------- */
var MSG={
 fr:{sending:'Envoi en cours…',ok:'Merci ! Votre message a bien été envoyé à notre équipe. Nous vous répondrons très vite.',err:'Désolé, l’envoi a échoué. Réessayez ou écrivez-nous directement à ',fb:'Votre application de messagerie va s’ouvrir pour envoyer votre message.',req:'Merci de remplir les champs obligatoires et d’accepter la case de consentement.',langBtn:'EN',langLabel:'Passer le site en anglais',themeLabel:'Basculer entre mode clair et sombre',menuLabel:'Ouvrir le menu'},
 en:{sending:'Sending…',ok:'Thank you! Your message has been sent to our team. We will get back to you shortly.',err:'Sorry, sending failed. Please try again or write to us directly at ',fb:'Your email app will open so you can send your message.',req:'Please fill in the required fields and tick the consent box.',langBtn:'FR',langLabel:'Switch the site to French',themeLabel:'Toggle light and dark mode',menuLabel:'Open menu'}
};
function setLang(l){
  lang=l;root.lang=l;sset('ew-lang',l);
  $$('[data-i18n]').forEach(function(el){
    if(el.dataset.fr===undefined)el.dataset.fr=el.innerHTML;
    var k=el.getAttribute('data-i18n');
    el.innerHTML=(l==='en'&&EN[k]!==undefined)?EN[k]:el.dataset.fr;
  });
  $$('[data-i18n-attr]').forEach(function(el){
    el.getAttribute('data-i18n-attr').split(';').forEach(function(pair){
      var p=pair.split(':'),a=p[0],k=p[1];if(!a||!k)return;
      var ok='fr_'+a.replace(/-/g,'_');
      if(el.dataset[ok]===undefined)el.dataset[ok]=el.getAttribute(a)||'';
      el.setAttribute(a,(l==='en'&&EN[k]!==undefined)?EN[k]:el.dataset[ok]);
    });
  });
  $$('.lang-btn').forEach(function(b){b.textContent=MSG[l].langBtn;b.setAttribute('aria-label',MSG[l].langLabel)});
  $$('.theme-btn').forEach(function(b){b.setAttribute('aria-label',MSG[l].themeLabel)});
  $$('.burger').forEach(function(b){b.setAttribute('aria-label',MSG[l].menuLabel)});
}

document.addEventListener('DOMContentLoaded',function(){
  root.classList.add('js');
  /* thème */
  setTheme(root.getAttribute('data-theme')||'light');
  $$('.theme-btn').forEach(function(b){b.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark')})});
  /* langue */
  $$('.lang-btn').forEach(function(b){b.addEventListener('click',function(){setLang(lang==='fr'?'en':'fr')})});
  setLang(lang);

  /* navigation active */
  var page=document.body.getAttribute('data-page');
  $$('[data-nav]').forEach(function(a){if(a.getAttribute('data-nav')===page)a.classList.add('active')});
  var expPages=['poles','services','produits','formations','realisations'];
  if(expPages.indexOf(page)>-1){$$('.nav-drop').forEach(function(d){d.classList.add('active')})}

  /* menu desktop (Expertises) */
  $$('.nav-drop').forEach(function(d){
    var b=$('button',d);
    b.addEventListener('click',function(e){e.stopPropagation();var o=d.classList.toggle('open');b.setAttribute('aria-expanded',String(o))});
    d.addEventListener('mouseenter',function(){if(window.matchMedia('(hover:hover)').matches){d.classList.add('open');b.setAttribute('aria-expanded','true')}});
    d.addEventListener('mouseleave',function(){if(window.matchMedia('(hover:hover)').matches){d.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  });
  /* menu mobile : petit panneau sous le bouton */
  var burger=$('.burger'),panel=$('#mobilePanel');
  function closePanel(){if(panel){panel.classList.remove('open');if(burger)burger.setAttribute('aria-expanded','false')}}
  if(burger&&panel){
    burger.addEventListener('click',function(e){e.stopPropagation();var o=panel.classList.toggle('open');burger.setAttribute('aria-expanded',String(o))});
    panel.addEventListener('click',function(e){e.stopPropagation();if(e.target.closest('a'))closePanel()});
  }
  $$('.m-drop>button').forEach(function(b){b.addEventListener('click',function(){var d=b.parentElement;var o=d.classList.toggle('open');b.setAttribute('aria-expanded',String(o))})});
  document.addEventListener('click',function(){closePanel();$$('.nav-drop.open').forEach(function(d){d.classList.remove('open');$('button',d).setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closePanel();$$('.nav-drop.open').forEach(function(d){d.classList.remove('open')})}});

  /* apparition douce */
  var rv=$$('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('in')});

  /* retour en haut */
  var top=$('#toTop');
  if(top){window.addEventListener('scroll',function(){top.classList.toggle('show',window.scrollY>500)},{passive:true});top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}

  /* réseaux sociaux */
  $$('[data-social]').forEach(function(a){
    var t=a.getAttribute('data-social');
    a.href=t==='facebook'?(CFG.FACEBOOK_URL||'https://www.facebook.com/search/top?q=EvalWeb%20Solutions'):(CFG.LINKEDIN_URL||'https://www.linkedin.com/search/results/all/?keywords=EvalWeb%20Solutions');
    a.target='_blank';a.rel='noopener';
  });

  /* enregistrement du webinaire */
  $$('[data-replay]').forEach(function(box){
    var link=$('[data-replay-link]',box),soon=$('[data-replay-soon]',box);
    if(CFG.WEBINAR_REPLAY_URL){link.href=CFG.WEBINAR_REPLAY_URL;link.hidden=false;soon.hidden=true}
    else{link.hidden=true;soon.hidden=false}
  });

  /* visionneuse d'images */
  var lb=$('#lightbox'),items=[],idx=0;
  if(lb){
    var lbImg=$('img',lb),lbCap=$('figcaption',lb);
    function show(i){idx=(i+items.length)%items.length;var b=items[idx];lbImg.src=b.getAttribute('data-full');lbImg.alt=b.getAttribute('data-caption')||'';lbCap.textContent=b.getAttribute('data-caption')||'';}
    function open(b){items=$$('[data-lightbox="'+b.getAttribute('data-lightbox')+'"]');show(items.indexOf(b));lb.classList.add('open');document.body.style.overflow='hidden';$('.lb-close',lb).focus()}
    function close(){lb.classList.remove('open');document.body.style.overflow=''}
    $$('[data-lightbox]').forEach(function(b){b.addEventListener('click',function(){open(b)})});
    $('.lb-close',lb).addEventListener('click',close);
    $('.lb-prev',lb).addEventListener('click',function(){show(idx-1)});
    $('.lb-next',lb).addEventListener('click',function(){show(idx+1)});
    lb.addEventListener('click',function(e){if(e.target===lb)close()});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
  }

  /* formulaire de contact (EmailJS) */
  var form=$('#contactForm');
  if(form){
    var msg=$('#formMsg'),sel=form.elements['subject'];
    var map={service:'Service digital',suivi:'Suivi-évaluation / analyse',economie:'Étude économique',formation:'Formation',video:'Montage vidéo & contenus',produit:'Autre',autre:'Autre'};
    try{var q=new URLSearchParams(location.search).get('sujet');if(q&&map[q])sel.value=map[q]}catch(e){}
    function show(type,text){msg.className='form-msg '+type;msg.textContent=text}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(form.elements['website'].value)return; /* anti-spam */
      if(!form.checkValidity()){show('err',MSG[lang].req);form.reportValidity();return}
      var f=form.elements,btn=$('button[type=submit]',form);
      var params={from_name:f['name'].value.trim(),organisation:f['organisation'].value.trim()||'—',reply_to:f['email'].value.trim(),phone:f['phone'].value.trim()||'—',subject:f['subject'].value,message:f['message'].value.trim(),site_lang:lang.toUpperCase()};
      var mailto='mailto:'+(CFG.CONTACT_EMAIL||'evalwebsolutions@gmail.com');
      if(CFG.EMAILJS_SERVICE_ID&&CFG.EMAILJS_TEMPLATE_ID&&CFG.EMAILJS_PUBLIC_KEY){
        btn.disabled=true;show('ok',MSG[lang].sending);
        fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service_id:CFG.EMAILJS_SERVICE_ID,template_id:CFG.EMAILJS_TEMPLATE_ID,user_id:CFG.EMAILJS_PUBLIC_KEY,template_params:params})})
        .then(function(r){if(!r.ok)throw new Error('http '+r.status);show('ok',MSG[lang].ok);form.reset()})
        .catch(function(){show('err',MSG[lang].err+(CFG.CONTACT_EMAIL||'evalwebsolutions@gmail.com')+'.')})
        .then(function(){btn.disabled=false});
      }else{
        /* EmailJS pas encore configuré : repli par e-mail */
        var body='Nom : '+params.from_name+'\nOrganisation : '+params.organisation+'\nE-mail : '+params.reply_to+'\nTéléphone : '+params.phone+'\n\n'+params.message;
        show('ok',MSG[lang].fb);
        location.href=mailto+'?subject='+encodeURIComponent(params.subject+' — '+params.from_name)+'&body='+encodeURIComponent(body);
      }
    });
  }
});
})();
