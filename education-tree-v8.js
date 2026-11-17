/* Current education comes from the institution session, never career interests.
 * Demo fixture is a high-school science/math pupil. Not a real school login.
 */
'use strict';
function currentEducation(){const stage=learningProfile().stage,highschool=stage==='highschool',raw=highschool?linkedInstitutionSession.studyTrack:linkedInstitutionSession.studyProgram;return {stage,highschool,label:highschool?'แผนการเรียนปัจจุบัน':'คณะ / สาขาที่กำลังเรียน',value:typeof raw==='string'&&raw.trim()?raw.trim():highschool?'รอข้อมูลแผนการเรียนจากสถานศึกษา':'รอข้อมูลคณะ/สาขาจากสถานศึกษา',known:typeof raw==='string'&&!!raw.trim()}}
const statusBeforeEducationTree=studyStatus;
studyStatus=function(id){const status=statusBeforeEducationTree(id);return currentEducation().highschool&&status==='studying'?'interested':status};
const detailBeforeEducationTree=studyDetail;
studyDetail=function(s){let html=detailBeforeEducationTree(s);if(currentEducation().highschool)html=html.replace('<span class="eyebrow">ทางเลือกการเรียน</span>','<span class="eyebrow">ทางเลือกเรียนต่อมหาวิทยาลัย</span>').replace('สถานะที่คุณเลือกเอง','สถานะการสำรวจเรียนต่อ').replace(/<button\b[^>]*data-study-status="studying"[^>]*>[\s\S]*?<\/button>/g,'');return html};
function careerExperienceLabel(c){const ids=jobs().filter(j=>j.careerId===c.id).map(j=>j.id);return completed().some(a=>ids.includes(a.jobId))?'เคยลองงานที่เกี่ยวข้อง':'ยังไม่เคยลอง'}
branchTreeNodes=function(){const edu=currentEducation(),studies=edu.highschool?studiesForFamily():[],careers=careerCatalog.filter(c=>c.family===careerFamily),spread=(i,n)=>n===1?610:130+i*960/(n-1);return [
 {id:'self',kind:'self',title:db.profile.name,sub:'จุดเริ่มต้นของคุณ',x:610,y:710},
 {id:'current-education',kind:'currentstudy',title:edu.value,sub:edu.label,x:610,y:530},
 ...studies.map((s,i)=>({id:s.id,kind:'study',title:s.name,sub:'ทางเลือกเรียนต่อ · '+studyStatusNames[studyStatus(s.id)],x:spread(i,studies.length),y:330})),
 ...careers.map((c,i)=>{const r=careerReadiness(c);return {id:c.id,kind:'career',title:c.title,sub:`${careerExperienceLabel(c)} · ${r.have}/${r.total} ทักษะมีหลักฐาน`,ready:r.ready,x:spread(i,careers.length),y:edu.highschool?125:240}})
]};
branchTreeEdges=function(){const ns=branchTreeNodes(),studies=ns.filter(n=>n.kind==='study'),careers=ns.filter(n=>n.kind==='career');if(!currentEducation().highschool)return [['self','current-education'],...careers.map(c=>['current-education',c.id])];const chosen=unifiedFocus.kind==='study'&&studies.find(s=>s.id===unifiedFocus.id);return [['self','current-education'],...studies.map(s=>['current-education',s.id]),...careers.map((c,i)=>[(chosen||studies[Math.round(i*(studies.length-1)/Math.max(1,careers.length-1))]).id,c.id])]};
const markupBeforeEducationTree=branchTreeMarkup;
branchTreeMarkup=function(){const edu=currentEducation();let html=markupBeforeEducationTree();html=html.replace('คณะ / สาขาที่เชื่อมกัน',edu.highschool?'เรียนต่อได้ทางไหน':'สายงานที่สำรวจได้').replace('อาชีพที่ไปต่อได้',edu.highschool?'อาชีพที่ไปต่อได้':'ทางเลือกอาชีพ รวมงานที่ยังไม่เคยลอง');if(!edu.highschool)html=html.replace('<span class="branch-tier" style="top:237px">สายงานที่สำรวจได้</span>','');return html.replace('class="branch-node currentstudy','class="branch-node currentstudy').replace(/(<button class="branch-node currentstudy[^>]*style=")/, '$1background:#fff0f7;border-color:#e0a7c5;')};
const branchDetailBeforeEducation=branchTreeDetail;
branchTreeDetail=function(){const edu=currentEducation();let html=branchDetailBeforeEducation();if(unifiedFocus.kind==='overview')html=html.replace('<h3>สิ่งที่คุณสนใจ</h3>',`<h3>${esc(edu.label)}</h3><p><b>${esc(edu.value)}</b><br>${esc(linkedInstitutionSession.institutionName)}</p>${edu.highschool?'<p>คณะบนกิ่งด้านบนเป็นทางเลือกเรียนต่อ ไม่ใช่สิ่งที่กำลังเรียนอยู่ และอาชีพหนึ่งเข้าถึงได้หลายทาง</p>':'<p>อาชีพบนกิ่งเป็นตัวอย่างทางเลือก ไม่ได้จำกัดเฉพาะงานที่คุณเคยลง และยังต้องพิจารณาทักษะของแต่ละงาน</p>'}<h3>สิ่งที่คุณสนใจ</h3>`);return html};
const profileBeforeEducation=profile;
profile=function(){const edu=currentEducation();let html=profileBeforeEducation();html=html.replace(/<input name="major"[^>]*>/,`<input readonly aria-readonly="true" name="major" value="${esc(edu.value)}">`).replace('สาขาหรือสิ่งที่กำลังเรียน',edu.label);return html};
const contextBeforeEducation=learningStageSwitch;
learningStageSwitch=function(){const edu=currentEducation();return contextBeforeEducation()+`<p class="journey-muted" style="margin-top:-10px">${esc(edu.label)}: <b>${esc(edu.value)}</b> · ข้อมูลจากสถานศึกษา (จำลอง)</p>`};
document.addEventListener('click',e=>{const t=e.target.closest('button');if(currentEducation().highschool&&t?.dataset.studyStatus==='studying'&&t.dataset.studyId){learningProfile().studies[t.dataset.studyId]='interested';save();render()}});
render();
