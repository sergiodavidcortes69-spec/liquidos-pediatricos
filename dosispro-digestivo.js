// DosisPro tanda 5: digestivo (antieméticos, protección gástrica, antiespasmódico, SRO).
(function(){
const FR=(x,d=0)=>x.toLocaleString('es-CO',{maximumFractionDigits:d});
const RD=x=>x<1?Math.round(x*100)/100:x<10?Math.round(x*10)/10:Math.round(x);
const GRP='Gastrointestinal';
const PP='PEDIADOSIS®. Dosis de medicamentos en pediatría. Velásquez O.J. Health Book’s Editorial.';
const RA='Guía básica de anestesia (capítulos de antieméticos y analgésicos)';
const AD={
metoclopramida:['10 mg IM o IV.',RA+'.'],
ondansetron:['4 mg IV. Rescate: 1 mg IV cada 5–10 min si persiste el vómito, máximo 4 mg adicionales; si continúa, recurrir a otras medidas.',RA+'.'],
omeprazol:['Úlcera duodenal: 20 mg/día por 4 semanas (40 mg/día si es resistente a anti-H2). Úlcera gástrica y esofagitis por reflujo: 20 mg/día por 4–8 semanas (40 mg/día por 8 semanas si es resistente). Zollinger-Ellison: 60 mg/día en una sola toma. IV: diluir el liofilizado en 10 mL de SSN 0,9 % o DAD 5 %, completar a 100 mL con la misma solución y pasar en 30 min cada 24 h.',RA+'.'],
dimenhidrinato:['50 mg VO cada 8 h.',RA+'. Según la fuente, cada vez es más difícil conseguirlo en Colombia.'],
hioscina:['1–2 tabletas (10–20 mg) VO cada 6 h, o 1 ampolla de 20 mg cada 4–6 h IM o IV lenta.',RA+'.'],
sro:['Sin dosis de adulto en la fuente de este módulo.','—']
};
const S=(k,l,o)=>Object.assign({k:k,l:l,n:1,u:'mg'},o||{});
const D=[
{id:'metoclopramida',n:'Metoclopramida',alias:'antiemetico procinetico nauseas vomito plasil primperan',rel:['ondansetron','dimenhidrinato'],
 sc:[S('a','Antiemético: 0,1–0,15 mg/kg/dosis c/8 h VO-IM-IV (se calcula 0,15)',{pd:0.15,n:3,maxDose:10})],
 pres:[['jarabe 1 mg por mL',1],['gotas 4 mg por mL',4]],tabs:[[10,false,'10 mg']],
 pt:'ampolla 10 mg/2 mL; tableta 10 mg; jarabe 1 mg/mL; gotas 4 mg/mL (0,2 o 0,125 mg por gota según marca).',
 note:'Tope de 10 mg por dosis (dosis de adulto). Gotas: no se calcula por número de gotas porque varía por marca; verifique la concentración del frasco.'},
{id:'ondansetron',n:'Ondansetrón',alias:'antiemetico nauseas vomito gastroenteritis zofran ondax',rel:['metoclopramida','dimenhidrinato'],
 sc:[S('a','Antiemético: 0,15 mg/kg/dosis c/8 h VO-IV',{pd:0.15,n:3})],
 pres:[['ampolla 8 mg/4 mL (2 mg por mL)',2]],tabs:[[4,false,'4 mg'],[8,false,'8 mg']],
 pt:'ampolla 8 mg/4 mL; tabletas de 4 y 8 mg (incluye ODT).',
 note:'Dosis indicada por el equipo de Galenio a partir de PEDIADOSIS; no se usa el esquema de quimioterapia. La fuente no define tope pediátrico por dosis: verifique contra la ficha.'},
{id:'omeprazol',n:'Omeprazol',alias:'ibp inhibidor bomba protones gastritis reflujo dispepsia',rel:['hioscina'],
 sc:[S('a','Por peso, una vez al día: 5–10 kg, 5 mg; 10–20 kg, 10 mg; más de 20 kg, 20 mg VO',{wt:true}),S('b','0,7–1 mg/kg/día en dosis única VO-IV (se calcula 1)',{d:1,n:1}),S('c','Helicobacter pylori: 10–20 mg c/12 h VO (se calcula 20)',{fix:20,n:2})],
 pres:[],tabs:[[10,false,'cápsula de 10 mg'],[20,false,'cápsula de 20 mg'],[40,false,'cápsula de 40 mg']],
 pt:'cápsulas de 10, 20 y 40 mg; vial de 40 mg (Losec y Orazole: 40 mg/10 mL).',
 note:'Administrar en ayunas. Por peso: 5 kg o menos no está definido en la ficha.'},
{id:'dimenhidrinato',n:'Dimenhidrinato',alias:'antiemetico anticinetosico vertigo dramamine mareol',rel:['metoclopramida','ondansetron'],
 sc:[S('a','2–6 años: 12,5–25 mg c/8 h VO (se calcula 25)',{fix:25,n:3,minM:24,maxM:72}),S('b','6–12 años: 25–50 mg c/8 h VO (se calcula 50)',{fix:50,n:3,minM:72,maxM:144})],
 pres:[['jarabe 12,5 mg por 5 mL',2.5]],tabs:[[50,false,'50 mg']],
 pt:'tabletas de 50 mg; jarabe de 12,5 mg/5 mL; supositorios de 25 y 100 mg.',
 note:'Disponibilidad limitada en Colombia según la fuente.'},
{id:'hioscina',n:'Hioscina (N-butilbromuro)',alias:'butilbromuro buscapina antiespasmodico colico dolor abdominal',rel:['omeprazol'],
 sc:[S('a','5–10 mg/dosis c/8 h VO-IM-IV (se calcula 10)',{fix:10,lo:5,n:3})],
 pres:[['ampolla 20 mg por mL',20]],tabs:[[10,false,'gragea o tableta de 10 mg']],
 pt:'ampolla 20 mg/mL (caja x 3); gragea o tableta de 10 mg (caja x 20).',
 note:'Dosis fija por toma según PEDIADOSIS, sin ajuste por peso. La fuente de anestesia da 1 gota/kg/dosis c/6–8 h para niños; no se calcula por gotas.'},
{id:'sro',n:'Sales de rehidratación oral (SRO)',alias:'suero oral rehidratacion diarrea deshidratacion servhidrat',rel:['zinc'],sro:true,
 sc:[S('a','Prevención, menor de 1 año: 50–100 mL por cada diarrea',{rng:[50,100],unit:'por cada diarrea'}),
     S('b','Prevención, 1–10 años: 100–200 mL por cada diarrea',{rng:[100,200],unit:'por cada diarrea'}),
     S('c','Reposición de pérdidas: 10–20 mL/kg por cada diarrea',{kg:[10,20],unit:'por cada diarrea'}),
     S('d','Deshidratación leve o moderada: 50–100 mL/kg en 4–6 h VO',{kg:[50,100],unit:'en 4–6 h'}),
     S('e','Deshidratación severa: 150 mL/kg en 4 h VO',{kg:[150,150],unit:'en 4 h',sev:true})],
 pres:[],tabs:null,
 pt:'sobres (Servhidrat, caja x 30). OMS osmolaridad reducida: Na 75, glucosa 75, K 20, Cl 65, citrato 10 mmol/L; osmolaridad 245. Suero casero: 3 cucharadas de azúcar y 1 cucharadita de sal en 1 litro de agua hervida fría.',
 note:'Información de PEDIADOSIS. No reemplaza la calculadora de líquidos IV (DHT I, II y III).'}
];
function mk(m){
 const opts=m.sc.map(s=>[s.k,s.l]),a=AD[m.id];
 return {id:m.id,n:m.n,grp:GRP,alias:m.alias,rel:m.rel,
  fields:[W,{id:'ay',label:'Edad: años cumplidos (admite decimales)',type:'number'},{id:'am',label:'Edad: meses adicionales (si es menor de 1 año, escriba solo los meses)',type:'number'},{id:'s',label:'Esquema',type:'select',opts:opts}],
  calc:v=>m.sro?calcSro(m,v):calcDg(m,v),refP:PP+' Ficha de '+m.n.split(' (')[0]+'.',
  adult:a[0],refA:a[1],info:(m.pt?'<p>Presentaciones disponibles: '+m.pt+'</p>':'')+(m.note?'<p>'+m.note+'</p>':'')};
}
function ageM(v){const y=Number.isFinite(v.ay)?v.ay:null,mo=Number.isFinite(v.am)?v.am:null;if(y===null&&mo===null)return null;return (y||0)*12+(mo||0)}
function tabCheck(m,p){
 if(!m.tabs)return null;
 const ok=[];
 m.tabs.forEach(t=>{const r=Math.round(p/t[0]);if(r>=1&&Math.abs(p-r*t[0])/p<=0.10)ok.push(FR(r)+' de '+t[2]+' ('+FR(r*t[0])+' mg)')});
 return ok;
}
function calcDg(m,v){
 if(!(v.w>0))return {error:'Ingrese el peso.'};
 const s=m.sc.find(x=>x.k===v.s)||m.sc[0];
 const needAge=s.minM!==undefined||s.maxM!==undefined;
 const M=ageM(v);
 if(needAge&&(M===null||M<0))return {error:'Ingrese la edad en años y/o meses.'};
 if(s.minM!==undefined&&M<s.minM)return {error:'Este esquema no aplica: edad mínima '+s.minM+' meses.'};
 if(s.maxM!==undefined&&M>=s.maxM)return {error:'Este esquema no aplica: edad máxima menor de '+s.maxM+' meses.'};
 const w=[],l=[],n=s.n;
 let dose;
 if(s.wt){if(v.w<5)return {error:'Esquema por peso definido desde 5 kg.'};dose=v.w<=10?5:v.w<=20?10:20}
 else dose=s.fix!==undefined?s.fix:(s.pd!==undefined?s.pd*v.w:s.d*v.w/n);
 if(s.maxDose&&dose>s.maxDose){dose=s.maxDose;w.push('Se aplicó el máximo de '+FR(s.maxDose)+' mg por dosis.')}
 const p=RD(dose),tot=RD(dose*n);
 if(n===1)l.push('Dosis: '+FR(p,2)+' mg una vez al día.');
 else{l.push('Por dosis: '+FR(p,2)+' mg cada '+24/n+' horas ('+n+' dosis).');l.push('Total diario: '+FR(tot,2)+' mg/día.')}
 if(s.d!==undefined)l.push('Regla: '+FR(s.d,2)+' mg/kg/día × '+FR(v.w,2)+' kg.');else if(s.pd!==undefined)l.push('Regla: '+FR(s.pd,2)+' mg/kg/dosis × '+FR(v.w,2)+' kg.');
 if(s.lo)l.push('Rango de la fuente: '+FR(s.lo)+'–'+FR(p,2)+' mg por dosis.');
 const tc=tabCheck(m,p);
 if(tc){if(tc.length)l.push('Presentación sólida: '+tc.join(' o ')+'.');else if(m.tabs.length)w.push('Rectificar presentación: '+FR(p,2)+' mg por toma no se ajusta a las tabletas o cápsulas disponibles. '+((m.pres||[]).length?'Se recomienda jarabe, solución o ampolla (ver volumen abajo).':'Se recomienda ajustar la dosis o usar otra presentación.'))}
 (m.pres||[]).forEach(r=>{let t='Volumen con '+r[0]+': '+FR(p/r[1],2)+' mL por dosis';if(s.lo)t+=' (dosis baja: '+FR(s.lo/r[1],2)+' mL)';l.push(t+'.')});
 l.push('Dosis más alta del rango de la fuente. Verificar contra la ficha y el estado clínico.');
 return {warn:w,lines:l};
}
function calcSro(m,v){
 const s=m.sc.find(x=>x.k===v.s)||m.sc[0],w=[],l=[];
 if(s.rng){l.push('Volumen: '+FR(s.rng[0])+'–'+FR(s.rng[1])+' mL '+s.unit+', VO.')}
 else{
  if(!(v.w>0))return {error:'Ingrese el peso.'};
  const lo=s.kg[0]*v.w,hi=s.kg[1]*v.w;
  l.push('Regla: '+FR(s.kg[0])+(s.kg[1]!==s.kg[0]?'–'+FR(s.kg[1]):'')+' mL/kg × '+FR(v.w,2)+' kg.');
  l.push('Volumen: '+(lo===hi?FR(lo):FR(lo)+'–'+FR(hi))+' mL '+s.unit+', VO.');
  if(s.unit==='en 4–6 h')l.push('Equivale a '+FR(lo/6)+'–'+FR(hi/4)+' mL/h.');
  if(s.unit==='en 4 h')l.push('Equivale a '+FR(hi/4)+' mL/h.');
 }
 if(s.sev)w.push('Deshidratación grave o con signos de shock: la rehidratación es IV; use la calculadora de líquidos (DHT III con bolo). Esta vía oral aplica solo si el paciente la tolera.');
 l.push('Ofrecer en sorbos pequeños y frecuentes; si vomita, esperar 10 min y reiniciar más lento.');
 return {warn:w,lines:l};
}
D.forEach(m=>MEDS.push(mk(m)));
if(typeof module!=='undefined')module.exports={D,calcDg,calcSro};
})();
