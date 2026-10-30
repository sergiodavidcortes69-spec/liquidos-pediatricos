/* ===== Galenio · galenio.js · cargar DESPUÉS del <script> original. No modifica fórmulas ni cálculos. ===== */
(function(){
'use strict';
var BM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5h11v17L12 16.5l-5.5 4z"/></svg>';
var CH='<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
var MODS=[
 {id:'dosispro',n:'DosisPro',kw:'medicamentos dosis fármacos',tipo:'Módulo'},
 {id:'liquidos',n:'Líquidos pediátricos',kw:'basales deshidratación dht oms bolo reposición',tipo:'Módulo'},
 {id:'sir',n:'Secuencia de intubación',kw:'sir intubación rápida tubo fármacos relajante inducción',tipo:'Módulo'},
 {id:'formulas',n:'Fórmulas médicas',kw:'calculadoras superficie corporal peso estimado tubo convertidor ml déficit',tipo:'Módulo'},
 {id:'esp-urgencias',n:'Urgencias',kw:'',tipo:'Especialidad'},
 {id:'esp-interna',n:'Medicina Interna',kw:'',tipo:'Especialidad'},
 {id:'esp-gineco',n:'Ginecología y Obstetricia',kw:'',tipo:'Especialidad'},
 {id:'esp-cirugia',n:'Cirugía General',kw:'',tipo:'Especialidad'},
 {id:'esp-pediatria',n:'Pediatría',kw:'',tipo:'Especialidad'}];
var ESP={'esp-urgencias':['sir'],'esp-interna':[],'esp-gineco':[],'esp-cirugia':[],'esp-pediatria':['liquidos','formulas','sir']};
var VIEW_ID={dosispro:'dosispro',liquidos:'liquidos',sir:'sir',formulas:'formulas'};
var TITLES={liquidos:'Líquidos pediátricos',sir:'Secuencia de intubación',formulas:'Fórmulas médicas'};
var KEY='galenio.favoritos.v1';
function byId(i){return document.getElementById(i)}
function name(id){for(var i=0;i<MODS.length;i++)if(MODS[i].id===id)return MODS[i].n;return id}
function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function getFav(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a.filter(function(x){return MODS.some(function(m){return m.id===x})}):[]}catch(e){return[]}}
function setFav(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}

var irOrig=window.ir, current='home';
function show(v){
  var isEsp=v.indexOf('esp-')===0;
  if(isEsp){openEsp(v);v='esp'}
  irOrig(v); current=v; document.body.className='';
  if(v==='saved')renderSaved();
  updateSave(); setNav(v==='home'?'home':v==='saved'?'saved':''); closeMenu();
}
window.ir=function(v){ if(v==='home')byId('gx-q')&&clearSearch(); show(v) };
function setNav(k){document.querySelectorAll('[data-nav]').forEach(function(b){
  if(b.tagName!=='BUTTON')return;
  if(b.getAttribute('data-nav')===k)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')})}

function openEsp(id){
  byId('esp-title').textContent=name(id);
  var links=ESP[id]||[], ul=byId('esp-links'); ul.innerHTML='';
  byId('esp-txt').textContent=links.length?'Mientras tanto, estos módulos ya están disponibles:':'Esta especialidad aún no tiene módulos disponibles.';
  links.forEach(function(m){var li=document.createElement('li'),b=document.createElement('button');
    b.type='button';b.className='gx-row';b.setAttribute('data-open',m);
    b.innerHTML='<span class="tx"></span>'+CH;
    b.firstChild.textContent=name(m);li.appendChild(b);ul.appendChild(li)});
  byId('v-esp').setAttribute('data-id',id);
}
function openId(id){ if(id.indexOf('esp-')===0)show(id); else show(VIEW_ID[id]||id) }
document.addEventListener('click',function(e){
  var o=e.target.closest('[data-open]'); if(o){e.preventDefault();openId(o.getAttribute('data-open'));return}
  var n=e.target.closest('[data-nav]'); if(n){e.preventDefault();var k=n.getAttribute('data-nav');
    if(k==='home')show('home'); else if(k==='saved')show('saved'); else if(k==='search'){show('home');setNav('search');byId('gx-q').focus();window.scrollTo(0,0)}return}
  var m=byId('gx-menu'); if(m&&!m.hidden&&!e.target.closest('#gx-menu')&&!e.target.closest('#gx-menu-btn'))closeMenu();
});

function closeMenu(){var m=byId('gx-menu'),b=byId('gx-menu-btn');if(m){m.hidden=true;b.setAttribute('aria-expanded','false')}}
byId('gx-menu-btn').addEventListener('click',function(){var m=byId('gx-menu'),open=m.hidden;m.hidden=!open;this.setAttribute('aria-expanded',String(open));this.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');if(open)m.querySelector('button').focus()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var b=byId('gx-menu-btn');if(!byId('gx-menu').hidden){closeMenu();b.focus()}}});

var q=byId('gx-q'),res=byId('gx-res'),st=byId('gx-status');
function clearSearch(){q.value='';res.innerHTML='';st.textContent=''}
function runSearch(){
  var t=norm(q.value).trim(); res.innerHTML=''; if(!t){st.textContent='';return}
  var hits=MODS.filter(function(m){return norm(m.n+' '+m.kw).indexOf(t)>-1});
  st.textContent=hits.length?hits.length+(hits.length===1?' resultado':' resultados')+' entre los módulos disponibles':'Sin resultados entre los módulos disponibles.';
  hits.forEach(function(m){var li=document.createElement('li'),b=document.createElement('button');
    b.type='button';b.className='gx-resbtn';b.setAttribute('data-open',m.id);
    var s=document.createElement('span');s.textContent=m.n;var sm=document.createElement('small');sm.textContent=m.tipo;
    b.appendChild(s);b.appendChild(sm);li.appendChild(b);res.appendChild(li)});
}
q.addEventListener('input',runSearch);
q.addEventListener('keydown',function(e){if(e.key==='Enter'){var f=res.querySelector('button');if(f){e.preventDefault();f.click()}}});

function setupBars(){
  document.querySelectorAll('.view').forEach(function(v){
    var id=v.id.slice(2), back=v.querySelector(':scope > button.back'); if(!back)return;
    var bar=document.createElement('div');bar.className='gx-bar';v.insertBefore(bar,back);bar.appendChild(back);
    if(VIEW_ID[id]){
      var s=document.createElement('button');s.type='button';s.className='gx-save';s.setAttribute('data-fav',id);s.setAttribute('aria-pressed','false');
      s.innerHTML=BM+'<span>Guardar</span>';bar.appendChild(s);
    }
    if(TITLES[id]&&!v.querySelector('.gx-vtitle')){var h=document.createElement('h2');h.className='gx-vtitle';h.textContent=TITLES[id];bar.insertAdjacentElement('afterend',h)}
  });
}
function updateSave(){var f=getFav();document.querySelectorAll('.gx-save').forEach(function(b){var on=f.indexOf(b.getAttribute('data-fav'))>-1;b.setAttribute('aria-pressed',String(on));b.lastChild.textContent=on?'Guardado':'Guardar'})}
document.addEventListener('click',function(e){var b=e.target.closest('.gx-save');if(!b)return;var id=b.getAttribute('data-fav'),f=getFav(),i=f.indexOf(id);
  if(i>-1)f.splice(i,1);else f.push(id);setFav(f);updateSave()});
function renderSaved(){
  var f=getFav(),box=byId('saved-body');box.innerHTML='';
  if(!f.length){box.innerHTML='<div class="gx-note gx-empty"><b>Aún no tienes guardados</b>Abre un módulo y toca «Guardar» para tenerlo aquí. Solo se guarda el nombre del módulo, nunca datos del paciente.</div>';return}
  var ul=document.createElement('ul');ul.className='gx-list';
  f.forEach(function(id){var li=document.createElement('li'),b=document.createElement('button');b.type='button';b.className='gx-row';b.setAttribute('data-open',id);
    b.innerHTML='<span class="tx"></span>'+CH;
    b.firstChild.textContent=name(id);li.appendChild(b);ul.appendChild(li)});
  box.appendChild(ul);
}

document.addEventListener('focusin',function(e){if(/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)&&window.matchMedia('(max-width:899px)').matches)document.body.classList.add('gx-kbd')});
document.addEventListener('focusout',function(){document.body.classList.remove('gx-kbd')});

setupBars();updateSave();
})();
