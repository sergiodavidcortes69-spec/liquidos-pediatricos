// DosisPro tanda 3: antimicrobianos (pediatría). Adultos: pendiente.
(function(){
const FR=(x,d=0)=>x.toLocaleString('es-CO',{maximumFractionDigits:d});
const GRP='Antimicrobianos',AP='Referencia de adultos pendiente de completar y validar. No se extrapola desde pediatría.',AR='Pendiente: Manual de Terapéutica, cap. 4 (Antibacterianos).';
const S=(k,l,d,n,o)=>Object.assign({k:k,l:l,d:d,n:n,u:'mg'},o||{});
const D=[
{id:'amoxicilina',n:'Amoxicilina',alias:'penicilina aminopenicilina otitis neumonia faringitis amoxil',rel:['amoxiclav','ampicilina','cefalexina'],
 sc:[S('a','Más de 3 meses: ITRS/ITU, hasta 50 mg/kg/día c/8 h',50,3,{minM:3}),S('b','Menos de 3 meses: 30 mg/kg/día c/12 h',30,2,{minM:1,maxM:3}),S('c','NAC: hasta 100 mg/kg/día c/8 h',100,3,{minM:3}),S('d','OMA recurrente: hasta 90 mg/kg/día c/8–12 h, 7–10 días',90,3,{minM:3})],pres:[],note:'Sin máximo diario en la fuente: verificar.'},
{id:'amoxiclav',n:'Amoxicilina/ácido clavulánico',alias:'augmentin clavulin sinusitis otitis',rel:['amoxicilina','cefalexina'],max:3000,
 sc:[S('a','Estándar del proyecto: 50 mg/kg/día c/12 h',50,2),S('b','ITRS/ITU: hasta 50 mg/kg/día c/8–12 h',50,3),S('c','Sinusitis/OMA/bronquitis: 40 mg/kg/día c/8–12 h, 10–14 días',40,3),S('d','OMA recurrente: 90 mg/kg/día c/12 h, 10 días',90,2)],
 pres:[['125/31,25 mg por 5 mL',25],['250/62,5 mg por 5 mL',50],['400/57 mg por 5 mL',80],['600/42,9 mg por 5 mL (ES)',120]],note:'Dosis expresada como amoxicilina. Máximo 3 g/día (criterio del proyecto). Sin gotas. Verificar la concentración del frasco.'},
{id:'ampicilina',n:'Ampicilina',alias:'penicilina meningitis sepsis',rel:['ampisulbactam','gentamicina','penicilinag'],
 sc:[S('a','General (proyecto): 200 mg/kg/día c/6 h',200,4,{minM:1}),S('b','Sepsis: hasta 300 mg/kg/día c/6 h IV',300,4,{minM:1}),S('c','Meningitis: hasta 400 mg/kg/día c/6 h IV',400,4,{minM:1})],pres:[],note:'Solo mayores de 28 días.'},
{id:'ampisulbactam',n:'Ampicilina/sulbactam (IV–IM)',alias:'unasyn sulbactam',rel:['ampicilina','ceftriaxona'],
 sc:[S('a','Infección leve: hasta 100 mg/kg/día c/6 h',100,4,{minM:1}),S('b','Infección moderada: hasta 200 mg/kg/día c/6 h',200,4,{minM:1}),S('c','Infección grave o meningitis: hasta 300 mg/kg/día c/6 h',300,4,{minM:1})],pres:[],note:'La fuente no aclara si los mg/kg son de ampicilina o de la combinación: se usa el valor tal como está escrito. Solo vía parenteral.'},
{id:'cefalexina',n:'Cefalexina',alias:'keflex cefalosporina piodermitis faringoamigdalitis otitis',rel:['cefazolina','amoxicilina'],
 sc:[S('a','Habitual: hasta 50 mg/kg/día c/6 h VO',50,4,{minM:1}),S('b','Infección severa: hasta 100 mg/kg/día c/6 h (máx. 4 g/día)',100,4,{minM:1,max:4000}),S('c','Faringoamigdalitis/piodermitis: hasta 50 mg/kg/día c/12 h',50,2,{minM:1}),S('d','OMA: hasta 100 mg/kg/día c/6 h',100,4,{minM:1})],pres:[['250 mg por 5 mL',50]],note:''},
{id:'cefazolina',n:'Cefazolina',alias:'ancef cefalosporina profilaxis quirurgica',rel:['cefalexina','ceftriaxona'],
 sc:[S('a','50–100 mg/kg/día c/8 h IV–IM (se calcula con 100)',100,3,{minM:1})],pres:[],note:'Solo mayores de 28 días.'},
{id:'ceftriaxona',n:'Ceftriaxona',alias:'rocefin cefalosporina meningitis otitis',rel:['cefazolina','ampisulbactam'],
 sc:[S('a','Mayores de 28 días: hasta 100 mg/kg/día c/12 h IV–IM',100,2,{minM:1}),S('b','Meningitis: hasta 100 mg/kg/día c/12 h IV',100,2,{minM:1}),S('c','OMA: 50 mg/kg DUD IM, máx. 1 g, 3 días',50,1,{minM:1,max:1000})],pres:[],note:'Rango de la fuente c/12–24 h; se calcula c/12 h salvo OMA.'},
{id:'azitromicina',n:'Azitromicina',alias:'zitromax macrolido',rel:['eritromicina','claritromicina'],
 sc:[S('a','Más de 6 meses: hasta 20 mg/kg DUD, 3–5 días',20,1,{minM:6}),S('b','Menos de 6 meses: 10 mg/kg DUD, 3–5 días',10,1,{minM:1,maxM:6}),S('c','Respiratoria: 10 mg/kg día 1; 5 mg/kg/día días 2–5',10,1,{minM:1,d2:5})],pres:[['200 mg por 5 mL',40]],note:'Tomar 2 h antes o después de comidas.'},
{id:'eritromicina',n:'Eritromicina',alias:'macrolido ilosone pantomicina',rel:['azitromicina'],
 sc:[S('a','Etilsuccinato: hasta 50 mg/kg/día c/6 h VO',50,4,{minM:1}),S('b','Estolato: hasta 50 mg/kg/día c/6 h VO',50,4,{minM:1})],pres:[['250 mg por 5 mL',50]],note:'Evitar jugo de pomelo.'},
{id:'clindamicina',n:'Clindamicina IV',alias:'dalacin anaerobios',rel:['metronidazol','penicilinag'],
 sc:[S('a','General: 30 mg/kg/día c/8 h IV',30,3,{minM:1}),S('b','Anaerobios: 40 mg/kg/día c/8 h IV–IM',40,3,{minM:1})],pres:[],note:'Rango de la fuente c/6–8 h; se calcula c/8 h.'},
{id:'metronidazol',n:'Metronidazol',alias:'flagyl anaerobios amebiasis giardiasis',rel:['clindamicina'],
 sc:[S('a','Anaerobios: hasta 50 mg/kg/día c/8 h',50,3,{minM:1}),S('b','Amebiasis: hasta 50 mg/kg/día c/8 h, 7–10 días VO',50,3,{minM:1}),S('c','Giardiasis: 15 mg/kg/día c/8 h, 5 días VO',15,3,{minM:1})],pres:[['250 mg por 5 mL',50]],note:''},
{id:'gentamicina',n:'Gentamicina',alias:'aminoglucosido',rel:['amikacina','ampicilina'],
 sc:[S('a','Mayores de 28 días: 7,5 mg/kg/día c/8 h IV–IM',7.5,3,{minM:1})],pres:[],note:'La fuente trae además «mayores: 3–6 mg/kg/día c/8–24 h» sin edad precisa; no se usa. Vigilar función renal.'},
{id:'amikacina',n:'Amikacina',alias:'aminoglucosido',rel:['gentamicina'],
 sc:[S('a','Mayores de 28 días: hasta 22,5 mg/kg/día c/8 h IV–IM',22.5,3,{minM:1}),S('b','ITU: hasta 15 mg/kg/día DUD, 10 días',15,1,{minM:1})],pres:[],note:'Vigilar función renal.'},
{id:'ciprofloxacina',n:'Ciprofloxacina',alias:'quinolona fluoroquinolona',rel:['trimetoprim'],
 sc:[S('a','Mayores de 12 años VO: hasta 40 mg/kg/día c/12 h',40,2,{minM:144}),S('b','Mayores de 12 años IV: hasta 20 mg/kg/día c/12 h',20,2,{minM:144})],pres:[],note:'No tomar con cationes (hierro, calcio, aluminio, magnesio).'},
{id:'penicilinag',n:'Penicilina G benzatínica',alias:'bencetacil benzetacil sifilis fiebre reumatica faringitis',rel:['penicilinac','amoxicilina'],
 sc:[S('a','Faringoamigdalitis/ITRS: hasta 50.000 UI/kg DU IM (máx. 1.200.000)',50000,1,{minM:1,u:'UI',max:1200000}),S('b','Fiebre reumática, prevención: DU IM cada 21 días',0,1,{minM:1,u:'UI',fixed:w=>w<30?600000:1200000}),S('c','Sífilis congénita: 50.000 UI/kg semanal ×3',50000,1,{minM:1,u:'UI',max:1200000})],pres:[],note:'Corte 30 kg: criterio del proyecto (la fuente usa 27 kg).'},
{id:'penicilinac',n:'Penicilina G cristalina',alias:'penicilina sodica potasica',rel:['penicilinag','oxacilina'],
 sc:[S('a','Mayores de 28 días: hasta 250.000 UI/kg/día c/6 h',250000,4,{minM:1,u:'UI'}),S('b','Neumonía: hasta 300.000 UI/kg/día c/6 h',300000,4,{minM:1,u:'UI'}),S('c','Infección severa: hasta 400.000 UI/kg/día c/6 h IV',400000,4,{minM:1,u:'UI'})],pres:[],note:'Rango de la fuente c/4–6 h; se calcula c/6 h. Sepsis y meningitis: el doble de la dosis usual, confirmar.'},
{id:'oxacilina',n:'Oxacilina',alias:'penicilina antiestafilococica prostafilina',rel:['penicilinac','cefazolina'],
 sc:[S('a','Leve/moderada: hasta 150 mg/kg/día c/6 h IV',150,4,{minM:1}),S('b','Grave: hasta 200 mg/kg/día c/6 h IV',200,4,{minM:1}),S('c','Artritis séptica/osteomielitis: 200 mg/kg/día c/6 h IV',200,4,{minM:1})],pres:[],note:''},
{id:'trimetoprim',n:'Trimetoprim/sulfametoxazol',alias:'tmp smx bactrim septrin cotrimoxazol',rel:['ciprofloxacina'],
 sc:[S('a','General: hasta 12 mg/kg/día de TMP c/12 h',12,2,{minM:1}),S('b','Diarrea bacteriana: 8 mg/kg/día de TMP c/12 h, 5 días',8,2,{minM:1}),S('c','OMA: 10 mg/kg/día de TMP c/12 h, 10 días',10,2,{minM:1}),S('d','Pneumocystis: hasta 20 mg/kg/día de TMP c/6 h, 21 días',20,4,{minM:1})],pres:[['40/200 mg por 5 mL',8],['80/400 mg por 5 mL',16]],note:'Dosis expresada como trimetoprim.'}
];
function mk(m){
 const opts=m.sc.map(s=>[s.k,s.l]);
 return {id:m.id,n:m.n,grp:GRP,alias:m.alias,rel:m.rel,
  fields:[W,{id:'m',label:'Edad (meses)',type:'number'},{id:'s',label:'Esquema',type:'select',opts:opts}],
  calc:v=>calcAbx(m,v),refP:PED+' Ficha de '+m.n.split(' (')[0]+'.',
  adult:AP,refA:AR,info:m.note?'<p>'+m.note+'</p>':''};
}
function calcAbx(m,v){
 if(!(v.w>0))return {error:'Ingrese el peso.'};
 if(!Number.isFinite(v.m)||v.m<0)return {error:'Ingrese la edad en meses.'};
 const s=m.sc.find(x=>x.k===v.s)||m.sc[0];
 if(v.m<1)return {error:'Menor de 28 días: esquema neonatal por edad gestacional y peso; este módulo no lo calcula.'};
 if(s.minM!==undefined&&v.m<s.minM)return {error:'Este esquema no aplica: edad mínima '+s.minM+' meses.'};
 if(s.maxM!==undefined&&v.m>=s.maxM)return {error:'Este esquema no aplica: edad máxima menor de '+s.maxM+' meses.'};
 const u=s.u,w=[],l=[],per=u==='UI'?1000:1;
 if(s.fixed){const x=s.fixed(v.w);l.push('Dosis única: '+FR(x)+' UI IM'+(s.k==='b'?' cada 21 días.':'.'));l.push('Corte: menos de 30 kg 600.000 UI; 30 kg o más 1.200.000 UI.');return {warn:w,lines:l}}
 let day=s.d*v.w,cap=s.max||m.max;
 if(cap&&day>cap){day=cap;w.push('Se aplicó el máximo de '+FR(cap)+' '+u+'/día.')}
 const tot=Math.round(day/per)*per,p=Math.round(day/s.n/per)*per;
 l.push('Total diario: '+FR(tot)+' '+u+'/día ('+FR(s.d)+' '+u+'/kg/día × '+FR(v.w,2)+' kg).');
 l.push('Por dosis: '+FR(p)+' '+u+(s.n>1?' cada '+24/s.n+' horas ('+s.n+' dosis).':', dosis única diaria.'));
 if(s.d2){l.push('Días 2 a 5: '+FR(Math.round(s.d2*v.w))+' mg una vez al día.')}
 (m.pres||[]).forEach(r=>{l.push('Volumen con '+r[0]+': '+FR(p/r[1],1)+' mL por dosis.')});
 l.push('Dosis más alta del rango de la fuente. Sin tope definido en la fuente salvo el indicado: verificar.');
 return {warn:w,lines:l};
}
D.forEach(m=>MEDS.push(mk(m)));
if(typeof module!=='undefined')module.exports={D,calcAbx};
})();
