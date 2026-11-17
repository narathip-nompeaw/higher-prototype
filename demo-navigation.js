/* Preview navigation only. Institution identity within each demo stays fixed. */
'use strict';
const contextBeforeDemoNavigation=learningStageSwitch;
learningStageSwitch=function(){const university=linkedInstitutionSession.educationLevel==='university';return `<div style="display:flex;justify-content:flex-end;align-items:center;gap:10px;margin:10px 0 14px;flex-wrap:wrap"><span style="font-size:11px;color:#8b7c91">สลับหน้าตัวอย่าง</span><a class="btn soft small" href="${university?'index.html':'university.html'}#roadmap" style="text-decoration:none">${university?'ดูต้นแบบ ม.ปลาย':'ดูต้นแบบมหาวิทยาลัย'} →</a></div>`+contextBeforeDemoNavigation()};
render();
