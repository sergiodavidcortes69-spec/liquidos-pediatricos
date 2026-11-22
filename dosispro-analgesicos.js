// DosisPro tanda 4: analgésicos (pediatría y adultos).
(function(){
const FR=(x,d=0)=>x.toLocaleString('es-CO',{maximumFractionDigits:d});
const RD=x=>x<1?Math.round(x*100)/100:x<10?Math.round(x*10)/10:Math.round(x);
const GRP='Analgésicos';
const RT='Terapéutica Médica, 20.ª ed.',RL='Analgésicos, libro de terapéutica (proyecto)',RM='Manual MSD, tabla de AINE (dosis diaria máxima)',RI='Ipas, Anexo A: tabla de medicamentos para el manejo del dolor',RK='NCBI, tabla de dosis de acetaminofén y AINE',RE='EFSM, metamizol: perfil beneficio-riesgo',RS='Guías de práctica clínica MSF, codeína oral',PP='PEDIADOSIS®. Dosis de medicamentos en pediatría. Velásquez O.J. Health Book’s Editorial.';
const OPI='Opioide: uso supervisado, con monitorización de frecuencia respiratoria y sedación. Este módulo no genera orden de administración.';
const AD={
acetaminofen:['0,5–1 g VO cada 6–8 h, o 1 g IV cada 8 h. Máximo 4 g/día. Evitar o tener precaución en hepatopatía.',RT+'; máximo diario: '+RI+'. PEDIADOSIS (mayores de 12 años): 325–650 mg cada 4–6 h, máximo 4 g/día.'],
dipirona:['500 mg–1 g VO cada 6–8 h; 1 g IV o IM. En pacientes graves o con intolerancia oral: 2 g IV o IM en bolo de 3 min. Máximo 4 g/día.',RT+'; '+RE+'.'],
ibuprofeno:['400–600 mg VO cada 6–8 h. Máximo 3.200 mg/día.',RT+'; máximo diario: '+RM+'. PEDIADOSIS indica 400–800 mg cada 6–8 h.'],
naproxeno:['275–550 mg VO cada 12 h. Máximo 1.500 mg/día.',RT+'; máximo diario: '+RM+'.'],
diclofenaco:['50 mg VO cada 8 h; 50–75 mg IM. Máximo 150 mg/día.',RT+'; máximo diario: '+RM+'.'],
ketorolaco:['VO: 10 mg cada 4–6 h, máximo 40 mg/día, por no más de 5 días. IV: 10 mg. IM: 10, 30 o 60 mg. PEDIADOSIS (mayores de 16 años): 60 mg VO o 30 mg IV, dosis única.',RT+'; '+RK+'; '+PP],
tramadol:['50–100 mg VO o IV cada 6–8 h. Máximo 400 mg/día.',RT+'; máximo diario: PEDIADOSIS, ficha de tramadol (adolescentes).'],
codeina:['30–60 mg VO cada 4–6 h; en tabletas combinadas, 1–2 cada 6–8 h, con intervalo no menor de 4 h. Máximo 200 mg/día.',RS+'; '+RL+'.'],
morfina:['Sin dosis estándar de inicio: titular según la respuesta del paciente, con dosis menores si no venía usando opioides. Sin cálculo automático. Contraindicada en pancreatitis y en diverticulitis del colon.',RL+'; '+RT+'.']
};
const S=(k,l,o)=>Object.assign({k:k,l:l,n:1,u:'mg'},o||{});
const D=[
{id:'acetaminofen',n:'Acetaminofén (paracetamol)',alias:'paracetamol dolex dolor fiebre antipiretico tylenol',rel:['ibuprofeno','dipirona','naproxeno'],max:4000,mkd:60,
 sc:[S('a','VO: 10–15 mg/kg/dosis c/6 h (se calcula 15)',{pd:15,n:4}),S('b','Mayores de 12 años: 325–650 mg c/6 h (se calcula 650)',{fix:650,n:4,minM:144}),S('c','Rectal: 20–25 mg/kg/dosis c/12 h (se calcula 25)',{pd:25,n:2,rect:true})],
 pres:[['solución/gotas 100 mg por mL',100],['jarabe 160 mg por 5 mL',32],['jarabe 150 mg por 5 mL',30],['suspensión 250 mg por 5 mL',50]],tabs:[[100,false,'masticable de 100 mg'],[500,false,'500 mg']],
 pt:'gotas o solución 100 mg/mL; jarabe 150 y 160 mg/5 mL; suspensión 250 mg/5 mL; tabletas masticables de 100 mg; tabletas de 500 mg; supositorios de 300 mg.',note:'Máximo 60 mg/kg/día en niños y 4 g/día en adultos. La ficha da 3 gotas/kg en gotas; no se calcula por gotas, verifique la concentración del frasco.'},
{id:'dipirona',n:'Dipirona (metamizol)',alias:'metamizol novalgina lisalgil dolor fiebre antipiretico',rel:['acetaminofen','ibuprofeno'],max:4000,mkd:40,
 sc:[S('a','Antipirético: 7–10 mg/kg/dosis c/8 h VO–IV–IM (se calcula 10)',{pd:10,n:3}),S('b','Analgésico: 20–40 mg/kg/día c/8 h VO–IV–IM (se calcula 40)',{d:40,n:3})],
 pres:[['jarabe 250 mg por 5 mL',50]],tabs:[[500,false,'500 mg']],
 pt:'tabletas de 500 mg; ampollas de 1 g/2 mL y 2 g/5 mL; gotas de 25 mg/gota; jarabe de 250 mg/5 mL.',note:'Máximo 40 mg/kg/día en niños. La ficha también da 1 gota/kg/dosis y 0,5–1 mL de jarabe por cada 3 kg: no se calculan, verifique la concentración.'},
{id:'ibuprofeno',n:'Ibuprofeno',alias:'aine antiinflamatorio dolor fiebre advil motrin',rel:['naproxeno','diclofenaco','acetaminofen'],max:3200,mkd:40,
 sc:[S('a','Analgésico y antipirético: 4–6 mg/kg/dosis c/8 h VO (se calcula 6)',{pd:6,n:3}),S('b','Antiinflamatorio: 8–10 mg/kg/dosis c/8 h VO (se calcula 10)',{pd:10,n:3}),S('c','Artritis reumatoide juvenil: 30–40 mg/kg/día c/8 h VO (se calcula 40)',{d:40,n:3})],
 pres:[['suspensión 100 mg por 5 mL',20]],tabs:[[400,false,'400 mg'],[600,false,'600 mg'],[800,false,'800 mg']],
 pt:'suspensión de 100 mg/5 mL; tabletas de 400, 600 y 800 mg (libro de analgésicos).',note:'Máximo 40 mg/kg/día. La ficha da 5 gotas/kg/dosis: no se calcula por gotas.'},
{id:'naproxeno',n:'Naproxeno',alias:'aine antiinflamatorio dolor apronax flanax',rel:['ibuprofeno','diclofenaco'],max:1500,
 sc:[S('a','Analgésico y antipirético: 10–15 mg/kg/día c/12 h VO (se calcula 15)',{d:15,n:2}),S('b','Antiinflamatorio: 20–30 mg/kg/día c/12 h VO (se calcula 30)',{d:30,n:2})],
 pres:[['suspensión 125 mg por 5 mL',25]],tabs:[[100,false,'100 mg'],[250,false,'cápsula de 250 mg'],[275,false,'275 mg'],[550,false,'550 mg']],
 pt:'suspensión de 125 mg/5 mL; tabletas de 100, 275 y 550 mg; cápsulas de 250 mg.',note:'Sin máximo pediátrico en la ficha. Tope de adultos 1.500 mg/día.'},
{id:'diclofenaco',n:'Diclofenaco',alias:'aine antiinflamatorio dolor voltaren cataflam',rel:['ibuprofeno','naproxeno','ketorolaco'],max:150,
 sc:[S('a','Analgésico y antipirético: 0,5–1 mg/kg/día c/12 h VO–IM–IV (se calcula 1)',{d:1,n:2}),S('b','Antiinflamatorio: 1–2 mg/kg/día c/8 h VO–IM–IV (se calcula 2)',{d:2,n:3})],
 pres:[['suspensión pediátrica 90 mg por 5 mL',18]],tabs:[[25,false,'gragea de 25 mg'],[50,false,'50 mg'],[75,false,'75 mg'],[100,false,'100 mg']],
 pt:'gotas de 0,5 mg/gota; grageas de 25, 50, 75 y 100 mg; supositorios de 12,5 y 100 mg; ampolla de 75 mg/3 mL; suspensión pediátrica de 90 mg/5 mL.',note:'Dosis de la ficha tal como está escrita. Sin máximo pediátrico en la ficha. Tope de adultos 150 mg/día. La ficha da 1 gota/kg/día: no se calcula por gotas.'},
{id:'ketorolaco',n:'Ketorolaco',alias:'aine dolor acdol ketron toradol',rel:['diclofenaco','ibuprofeno'],
 sc:[S('a','2–16 años VO o IM: 1 mg/kg, dosis única (máx. 30 mg)',{pd:1,n:1,once:true,maxDose:30,minM:24,maxM:192}),S('b','2–16 años IV: 0,5 mg/kg, dosis única (máx. 15 mg)',{pd:0.5,n:1,once:true,maxDose:15,iv:true,minM:24,maxM:192})],
 pres:[],tabs:[[10,false,'10 mg']],
 pt:'ampollas de 30 mg/mL; tabletas de 10 mg.',note:'Solo de 2 a 16 años. Dosis única: la ficha no define repetición.'},
{id:'tramadol',n:'Tramadol',alias:'opioide dolor tramal',rel:['codeina','morfina'],max:400,opi:true,
 sc:[S('a','Niños: 1–2 mg/kg/dosis c/6 h VO–IV–IM (se calcula 2)',{pd:2,n:4}),S('b','Adolescentes: 50–100 mg c/6 h VO (se calcula 100)',{fix:100,n:4,minM:144})],
 pres:[],tabs:[[50,false,'cápsula de 50 mg']],
 pt:'cápsulas de 50 mg; ampollas de 50 y 100 mg; gotas de 100 mg (ficha: 40 gotas = 100 mg).',note:'Sin límite de edad en la ficha. Máximo 400 mg/día.'},
{id:'codeina',n:'Codeína',alias:'opioide dolor tos antitusigeno',rel:['tramadol','morfina','acetaminofen'],max:200,opi:true,
 sc:[S('a','Analgésico (libro): 0,5–1 mg/kg/dosis c/6 h VO (se calcula 1)',{pd:1,n:4}),S('b','Antitusígeno (ficha): 1–1,5 mg/kg/día c/6 h VO (se calcula 1,5)',{d:1.5,n:4}),S('c','Antitusígeno por edad, 2–5 años: 5 mg c/12 h',{fix:5,n:2,minM:24,maxM:72}),S('d','Antitusígeno por edad, 6–12 años: 10 mg c/12 h',{fix:10,n:2,minM:72,maxM:156}),S('e','Antitusígeno por edad, mayores de 12 años: 20 mg c/12 h',{fix:20,n:2,minM:156})],
 pres:[['jarabe 10 mg por 5 mL',2]],tabs:[[30,false,'cápsula de 30 mg']],
 pt:'jarabe de 10 mg/5 mL; cápsulas de 30 mg; combinaciones con acetaminofén (8, 15 o 30 mg de codeína) o diclofenaco.',note:'Máximo 200 mg/día. Intervalo mínimo de 4 h. Los esquemas por edad usan el valor alto de la ficha y son antitusígenos, no analgésicos.'},
{id:'morfina',n:'Morfina',alias:'opioide dolor sulfato de morfina',rel:['tramadol','codeina'],opi:true,
 sc:[S('a','Libro, IV: 0,08–0,1 mg/kg c/3–4 h (se calcula 0,1 c/4 h)',{pd:0.1,n:6,iv:true}),S('b','Lactantes y niños VO: 0,2–0,5 mg/kg/dosis c/4–6 h (se calcula 0,5 c/6 h)',{pd:0.5,n:4,minM:1}),S('c','PEDIADOSIS, IV–IM–SC: 0,1–0,2 mg/kg/dosis c/2–4 h (se calcula 0,2 c/4 h; máx. 15 mg)',{pd:0.2,n:6,iv:true,maxDose:15,minM:1}),S('d','Recién nacidos: 0,05 mg/kg c/4–8 h IM–IV–SC (se calcula c/8 h)',{pd:0.05,n:3,iv:true,neo:true,maxM:1}),S('e','Adolescentes, sedación y analgesia: 3–4 mg/dosis IV (se calcula 4 mg)',{fix:4,n:1,once:true,iv:true,minM:144})],
 pres:[],tabs:null,
 pt:'ampolla de 10 mg/mL; solución al 2 % (gotas); solución oral al 3 %; tabletas de 10, 15 y 30 mg.',note:'Contraindicada en pancreatitis y diverticulitis del colon. Sin máximo diario definido, salvo 15 mg por dosis (IV, IM o SC).'}
];
function mk(m){
 const opts=m.sc.map(s=>[s.k,s.l]),a=AD[m.id];
 return {id:m.id,n:m.n,grp:GRP,alias:m.alias,rel:m.rel,
  fields:[W,{id:'ay',label:'Edad: años cumplidos (admite decimales)',type:'number'},{id:'am',label:'Edad: meses adicionales (si es menor de 1 año, escriba solo los meses)',type:'number'},{id:'s',label:'Esquema',type:'select',opts:opts}],
  calc:v=>calcAn(m,v),refP:PED+' Ficha de '+m.n.split(' (')[0]+(m.id==='ibuprofeno'||m.id==='morfina'||m.id==='codeina'?'; '+RL:'')+'.',
  adult:a[0],refA:a[1],info:(m.pt?'<p>Presentaciones disponibles: '+m.pt+'</p>':'')+(m.note?'<p>'+m.note+'</p>':'')+(m.opi?'<p>'+OPI+'</p>':'')};
}
function ageM(v){const y=Number.isFinite(v.ay)?v.ay:null,mo=Number.isFinite(v.am)?v.am:null;if(y===null&&mo===null)return null;return (y||0)*12+(mo||0)}
function tabCheck(m,s,p){
 if(!m.tabs||s.iv||s.rect)return null;
 const ok=[];
 m.tabs.forEach(t=>{const n=p/t[0],r=t[1]?Math.round(n*2)/2:Math.round(n);if(r>=(t[1]?0.5:1)&&Math.abs(p-r*t[0])/p<=0.10)ok.push(FR(r,1)+' de '+t[2]+' ('+FR(r*t[0])+' mg)')});
 return ok;
}
function calcAn(m,v){
 if(!(v.w>0))return {error:'Ingrese el peso.'};
 const M=ageM(v);
 if(M===null||M<0)return {error:'Ingrese la edad en años y/o meses.'};
 const s=m.sc.find(x=>x.k===v.s)||m.sc[0];
 if(M<1&&!s.neo)return {error:'Menor de 28 días: esquema neonatal por edad gestacional y peso; este módulo no lo calcula.'};
 if(s.minM!==undefined&&M<s.minM)return {error:'Este esquema no aplica: edad mínima '+s.minM+' meses.'};
 if(s.maxM!==undefined&&M>=s.maxM)return {error:'Este esquema no aplica: edad máxima menor de '+s.maxM+' meses.'};
 const w=[],l=[],n=s.n;
 let dose=s.fix!==undefined?s.fix:(s.pd!==undefined?s.pd*v.w:s.d*v.w/n);
 if(s.maxDose&&dose>s.maxDose){dose=s.maxDose;w.push('Se aplicó el máximo de '+FR(s.maxDose)+' mg por dosis.')}
 let day=dose*n;
 const mkd=s.mkd||m.mkd;
 if(mkd&&day>mkd*v.w){day=mkd*v.w;w.push('Se aplicó el máximo de '+FR(mkd)+' mg/kg/día.')}
 if(m.max&&day>m.max){day=m.max;w.push('Se aplicó el tope de '+FR(m.max)+' mg/día.')}
 if(day<dose*n)dose=day/n;
 const p=RD(dose),tot=RD(day);
 if(s.once){l.push('Dosis única: '+FR(p,2)+' mg.')}
 else{l.push('Total diario: '+FR(tot,2)+' mg/día.');l.push('Por dosis: '+FR(p,2)+' mg cada '+24/n+' horas ('+n+' dosis).')}
 if(s.d!==undefined)l.push('Regla: '+FR(s.d,2)+' mg/kg/día × '+FR(v.w,2)+' kg.');else if(s.pd!==undefined)l.push('Regla: '+FR(s.pd,2)+' mg/kg/dosis × '+FR(v.w,2)+' kg.');
 const tc=tabCheck(m,s,p);
 if(tc){if(tc.length)l.push('Tabletas: '+tc.join(' o ')+'.');else if(m.tabs.length)w.push('Rectificar presentación: '+FR(p,2)+' mg por toma no se ajusta a las tabletas disponibles. '+((m.pres||[]).length?'Se recomienda suspensión o solución (ver volumen abajo).':'Se recomienda ajustar la dosis o usar otra presentación.'))}
 if(!s.iv&&!s.rect)(m.pres||[]).forEach(r=>{l.push('Volumen con '+r[0]+': '+FR(p/r[1],1)+' mL por dosis.')});
 if(m.opi)w.push(OPI);
 l.push('Dosis más alta del rango de la fuente. Verificar contra la ficha y el estado clínico.');
 return {warn:w,lines:l};
}
D.forEach(m=>MEDS.push(mk(m)));
if(typeof module!=='undefined')module.exports={D,calcAn};
})();
