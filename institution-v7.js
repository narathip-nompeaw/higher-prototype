/* Demo of the institution-issued identity contract. This is not real SSO.
 * Production: institutionId and educationLevel must come from a verified
 * server session, never from a learner-controlled form or localStorage.
 */
'use strict';
let linkedInstitutionSession=document.body.dataset?.demoCohort==='university'?{institutionId:'demo-university',institutionName:'มหาวิทยาลัยตัวอย่าง',educationLevel:'university',studyProgram:'คณะเทคโนโลยีสารสนเทศ / ระบบสารสนเทศ',source:'demo'}:{institutionId:'demo-school',institutionName:'โรงเรียนตัวอย่าง',educationLevel:'highschool',studyTrack:'วิทย์–คณิต',source:'demo'};
const learningProfileBeforeBinding=learningProfile;
learningProfile=function(){const p=learningProfileBeforeBinding();p.stage=linkedInstitutionSession.educationLevel;db.profile.institution=linkedInstitutionSession.institutionName;return p};
learningStageSwitch=function(){const p=learningProfile(),level=p.stage==='highschool'?'มัธยมศึกษาตอนปลาย':'มหาวิทยาลัย';return `<div class="institution-bound-context" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:22px 0;color:#786780;font-size:13px"><span class="pill pink">${esc(level)}</span><span>${esc(linkedInstitutionSession.institutionName)}</span><small>ข้อมูลจากบัญชีสถานศึกษา · จำลอง</small></div>`};
const profileBeforeBinding=profile;
profile=function(){learningProfile();return profileBeforeBinding().replace('<input name="institution"','<input readonly aria-readonly="true" title="ข้อมูลนี้มาจากบัญชีสถานศึกษา" name="institution"').replace('สถานศึกษา (ข้อมูลจำลอง)','สถานศึกษาจากบัญชีที่เชื่อมไว้ (จำลอง)')};
learningProfile();
render();
