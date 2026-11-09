(function(){
const $=id=>document.getElementById(id),F=x=>x.toLocaleString('es-CO',{maximumFractionDigits:2});
const P={
salbutamol:w=>{const mg=Math.min(Math.max(0.15*w,1.25),2.5);return ['Nebulizar '+F(mg)+' mg ('+F(mg/5)+' mL de solución 5 mg/mL) diluidos en 2–3 mL de SSN cada 6 horas.','Regla: 0,15 mg/kg; mínimo 1,25 mg y máximo 2,5 mg.']},
ipratropio:w=>['Nebulizar 0,2 mg ('+F(0.2/0.25)+' mL de solución 0,25 mg/mL) cada 6 horas.','Dosis fija, independiente del peso.'],
prednisona:w=>{const d=2*w,o=['Total diario: '+F(d)+' mg/día en 1 toma (2 mg/kg/día).','PENDIENTE DE VERIFICAR: sin máximo diario definido en la fuente.'];if(d>60)o.push('ALERTA: supera 60 mg/día (rango de adultos de Neumología). Verificar.');return o},
hidrocortisona:w=>{const d=10*w;return ['Inicial: '+F(d)+' mg IV ('+F(d/50)+' mL de 50 mg/mL, ampolla 100 mg/2 mL).','Luego: '+F(d)+' mg IV cada 6 horas.','Regla: 10 mg/kg. Sin máximo definido en la fuente: verificar.']},
metilprednisolona:w=>{const d=2*w;return ['Inicial: '+F(d)+' mg IV.','Luego: '+F(d)+' mg cada 8 horas.','Regla: 2 mg/kg. Sin máximo definido en la fuente: verificar.']},
dexametasona:w=>{const mg=Math.min(0.15*w,5);return ['Dosis única: '+F(mg)+' mg ('+F(mg/4)+' mL de ampolla 4 mg/mL).','Regla: 0,15 mg/kg; máximo 5 mg. La fuente no indica la indicación (crup o asma): confirmar.']},
adrenalina:w=>{const mg=Math.min(0.01*w,0.3);return ['Dosis única SC: '+F(mg)+' mg ('+F(mg)+' mL de solución 1 mg/mL).','Regla: 0,01 mg/kg; máximo 0,3 mg.']},
teofilina:w=>{const d=16*w;return ['Total diario: '+F(d)+' mg/día.','Por toma: '+F(d/2)+' mg cada 12 horas (2 tomas).','Regla: 16 mg/kg/día. Idealmente con niveles plasmáticos.']},
aminofilina:(w,a)=>{if(!Number.isFinite(a)||a<0.5)return ['Requiere edad de 6 meses o más. Sin cálculo para edad menor o no ingresada.'];if(a>16)return ['Mayor de 16 años: usar la pestaña de adultos.'];const r=a<10?1:0.8,c=Math.min(5*w,250);return ['Carga: '+F(c)+' mg IV (5 mg/kg; máximo 250 mg).','Mantenimiento: '+F(r*w)+' mg/hora ('+F(r)+' mg/kg/h para '+(a<10?'6 meses–9 años':'10–16 años')+').','Confirmar dilución y velocidad con monitorización. No se emite orden IV automática.']}
};
const M=[
['salbutamol','Salbutamol','salbutamol albuterol ventolin','Nebulizado: 2,5–5 mg en 2–3 mL de SSN cada 4–8 h. IDM 100 µg: 2 inhalaciones cada 4–6 h (máximo 12/día). Oral: 2–4 mg, 3–4 veces al día (máximo 32 mg/día). Crisis asmática: IDM con aerocámara, 2 inhalaciones cada 20 min por 3 dosis; o nebulizado 10 mg/hora, espaciando según respuesta.','Neumologia.pdf p. 570–571, 579'],
['ipratropio','Bromuro de ipratropio','ipratropio atrovent','Nebulizado: 0,25–0,5 mg cada 6 h. IDM 20 µg: 2–3 inhalaciones cada 6 h.','Neumologia.pdf p. 572'],
['prednisona','Prednisona','prednisona corticoide asma','40–60 mg/día. En crisis asmática se suspende al mejorar o a los 7 días, salvo uso crónico previo.','Neumologia.pdf p. 580'],
['hidrocortisona','Hidrocortisona','hidrocortisona corticoide','100–200 mg IV cada 4 h (ampolla 100 mg).','Neumologia.pdf p. 580'],
['metilprednisolona','Metilprednisolona','metilprednisolona corticoide','40–60 mg cada 6 h, VO o sistémica.','Neumologia.pdf p. 580'],
['dexametasona','Dexametasona','dexametasona corticoide','0,5–24 mg (máximo 40 mg) una vez al día; en asma, 1–2 días suelen bastar. Reducción gradual si supera 10 días.','Guías MSF, dexametasona oral'],
['adrenalina','Adrenalina','adrenalina epinefrina anafilaxia','IM (vía preferida): 0,01 mg/kg; habitual 0,3–0,5 mg (0,3–0,5 mL de 1 mg/mL), máximo 0,5 mg por dosis, en el muslo; repetir cada 5–15 min si no mejora.','Ficha técnica AEMPS; guía SEAIC; GALAXIA 2016'],
['teofilina','Teofilina','teofilina xantina','12–16 mg/kg/día en 2 tomas (liberación sostenida), máximo 400 mg/día por 3 días; luego 18–22 mg/kg/día, máximo 800 mg. Reducir a la mitad si es mayor de 60 años, ICC o daño hepático. Nivel ideal 8–15 µg/mL; medir niveles.','Neumologia.pdf p. 574–575'],
['aminofilina','Aminofilina IV','aminofilina xantina','Carga 5–6 mg/kg IV en 20–30 min (velocidad máxima 25 mg/min). Mantenimiento 0,4–0,9 mg/kg/h; reducir en ancianos, cardiópatas o hepatópatas. Nivel ideal de teofilina 8–15 µg/mL.','UNAM; Vademécum; Neumologia.pdf p. 575 (nivel). Verificar contra ficha local']
];
function build(){const h=$('resp');if(!h)return;let s='<div class="card"><h2>Respiratorio · datos pediátricos</h2><label>Peso medido (kg)<input id="rw" type="number" min="0" step="any"></label><label>Edad (años; admite decimales)<input id="ra" type="number" min="0" step="any"></label><small>Aplican a las tarjetas pediátricas de esta sección. Dosis pediátricas según dosis-ped.pdf.</small></div>';
M.forEach(m=>{s+='<div class="card" id="m-'+m[0]+'" data-name="'+m[2]+'"><h2>'+m[1]+'</h2><section class="rp"><div class="out" id="o-'+m[0]+'" role="status" aria-live="polite"></div></section><section class="ra" hidden><p>'+m[3]+'</p><small>Fuente: '+m[4]+'. Requiere validación clínica.</small></section></div>'});h.innerHTML=s;['rw','ra'].forEach(i=>$(i).addEventListener('input',upd));upd()}
function upd(){const w=Number($('rw').value),a=$('ra').value===''?NaN:Number($('ra').value);M.forEach(m=>{const o=$('o-'+m[0]);if(!(w>0)){o.textContent='Ingrese el peso.';return}o.innerHTML=P[m[0]](w,a).map(x=>'<p>'+x+'</p>').join('')})}
const _mode=window.mode,_filt=window.filt;
window.mode=function(p){_mode(p);document.querySelectorAll('#resp .rp').forEach(e=>e.hidden=!p);document.querySelectorAll('#resp .ra').forEach(e=>e.hidden=p);const c=$('rw');if(c&&c.closest('.card'))c.closest('.card').hidden=!p};
window.filt=function(){_filt();const t=$('q').value.toLowerCase().trim();M.forEach(m=>{const e=$('m-'+m[0]);if(e)e.hidden=!!t&&!m[2].includes(t)})};
if(typeof document!=='undefined'&&document.getElementById)build();
if(typeof module!=='undefined')module.exports={P};
})();
