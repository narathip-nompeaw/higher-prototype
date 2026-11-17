/* Higher career exploration catalogue. Editorial prototype, researched 2026-11-16.
 * Requirements below are our starter-work rubrics, not universal hiring rules.
 * Occupational sources describe work; they do not validate our thresholds.
 */
'use strict';
const careerSources={
 ba:['IIBA — Business Analysis Tasks','https://www.iiba.org/knowledgehub/business-analysis-standard/4-tasks-and-knowledge-areas/introducing-business-analysis-tasks/'],
 business:['O*NET — Management Analysts','https://www.onetonline.org/link/summary/13-1111.00'],
 bi:['O*NET — Business Intelligence Analysts','https://www.onetonline.org/link/summary/15-2051.01'],
 powerbi:['Microsoft Learn — Power BI Data Analyst','https://learn.microsoft.com/en-us/certifications/resources/study-guides/PL-300'],
 accounting:['O*NET — Bookkeeping, Accounting, and Auditing Clerks','https://www.onetonline.org/link/summary/43-3031.00'],
 purchasing:['O*NET — Procurement Clerks','https://www.onetonline.org/link/summary/43-3061.00'],
 warehouse:['O*NET — Shipping, Receiving, and Inventory Clerks','https://www.onetonline.org/link/summary/43-5071.00'],
 stock:['O*NET — Stockers and Order Fillers','https://www.onetonline.org/link/summary/53-7065.00'],
 marketing:['O*NET — Market Research Analysts and Marketing Specialists','https://www.onetonline.org/link/summary/13-1161.00'],
 design:['O*NET — Graphic Designers','https://www.onetonline.org/link/summary/27-1024.00'],
 writing:['O*NET — Writers and Authors','https://www.onetonline.org/link/summary/27-3043.00'],
 web:['O*NET — Web Developers','https://www.onetonline.org/link/summary/15-1254.00'],
 testing:['O*NET — Software Quality Assurance Analysts and Testers','https://www.onetonline.org/link/summary/15-1253.00'],
 service:['O*NET — Customer Service Representatives','https://www.onetonline.org/link/summary/43-4051.00'],
 hr:['O*NET — Human Resources Assistants','https://www.onetonline.org/link/summary/43-4161.00']
};
const careerFamilies=[
 {id:'business',name:'วิเคราะห์ธุรกิจ',icon:'chart',branch:'business'},
 {id:'data',name:'ข้อมูลและ BI',icon:'chart',branch:'tech'},
 {id:'accounting',name:'บัญชีและการเงิน',icon:'money',branch:'business'},
 {id:'purchasing',name:'จัดซื้อและเอกสาร',icon:'clipboard',branch:'business'},
 {id:'warehouse',name:'คลังสินค้า',icon:'briefcase',branch:'business'},
 {id:'marketing',name:'ตลาดและวิจัย',icon:'search',branch:'business'},
 {id:'creative',name:'คอนเทนต์และออกแบบ',icon:'pen',branch:'creative'},
 {id:'technology',name:'เว็บไซต์และทดสอบ',icon:'code',branch:'tech'},
 {id:'service',name:'บริการลูกค้า',icon:'people',branch:'business'},
 {id:'people',name:'บุคคลและประสานงาน',icon:'people',branch:'business'}
];
// A passing observation means the submitted sample meets THIS task's rubric.
// It is never inferred from interests, course enrolment, or generic digital scores.
const careerSkillRows=[
 ['excel','Excel / Sheets พื้นฐาน','จัดตาราง ใช้สูตร SUM / IF คัดกรอง และตรวจข้อมูลผิด','ส่งตารางข้อมูลตัวอย่าง พร้อมสูตรและคำอธิบายการตรวจข้อผิดพลาด'],
 ['pivot','Excel วิเคราะห์ข้อมูล','ทำ PivotTable / lookup และอธิบายผลที่สรุปได้','ส่งตารางสรุปยอดตามหมวด พร้อมตรวจผลกับข้อมูลตั้งต้น'],
 ['requirements','เก็บความต้องการ','ถามให้เข้าใจปัญหา แยกสิ่งที่ต้องการ และยืนยันกับผู้เกี่ยวข้อง','ส่งสรุปการสัมภาษณ์จำลอง พร้อม requirement และเกณฑ์ยอมรับ'],
 ['process','วิเคราะห์ขั้นตอนงาน','วาดขั้นตอนปัจจุบัน ระบุจุดติดขัด และเสนอขั้นตอนใหม่','ส่งผัง As-is / To-be พร้อมเหตุผลและขอบเขต'],
 ['report','เขียนรายงานและนำเสนอ','แยกข้อเท็จจริง ข้อสังเกต และข้อเสนอ พร้อมอ้างข้อมูล','ส่งรายงาน 1–2 หน้า พร้อมข้อมูลที่ใช้และข้อจำกัด'],
 ['metrics','อ่านตัวชี้วัดธุรกิจ','คำนวณยอดขาย ต้นทุน อัตราแปลง และเลือกตัวชี้วัดตรงคำถาม','ส่งโจทย์คำนวณ KPI พร้อมอธิบายว่าใช้ตัดสินใจเรื่องอะไร'],
 ['clean','จัดระเบียบข้อมูล','ตรวจค่าหาย ข้อมูลซ้ำ รูปแบบวันที่ และบันทึกวิธีแก้','ส่งชุดข้อมูลก่อน–หลัง พร้อมรายการการเปลี่ยนแปลง'],
 ['sql','SQL พื้นฐาน','ใช้ SELECT / WHERE / GROUP BY / JOIN และตรวจผล','ส่งคำสั่งค้นข้อมูลและผลลัพธ์จากฐานข้อมูลตัวอย่าง'],
 ['powerbi','Power BI','เตรียมและเชื่อมตาราง สร้าง measure และกราฟที่ตอบโจทย์','ส่งแดชบอร์ดตัวอย่าง พร้อมอธิบาย Power Query ความสัมพันธ์ และ DAX ที่ใช้'],
 ['privacy','ดูแลข้อมูลส่วนบุคคล','ใช้ข้อมูลเท่าที่จำเป็น ปกปิดข้อมูล และกำหนดผู้เข้าถึง','ส่งตัวอย่างเอกสารที่ปกปิดข้อมูล พร้อมอธิบายสิทธิ์การเข้าถึง'],
 ['bookkeeping','บัญชีเบื้องต้น','แยกรายรับ รายจ่าย และประเภทเอกสารตามโจทย์','ส่งตารางรายการบัญชีจำลอง พร้อมเหตุผลการจัดหมวด'],
 ['invoice','ตรวจใบแจ้งหนี้และใบเสร็จ','ตรวจเลขที่ วันที่ รายการ ยอดเงิน และเอกสารที่เกี่ยวข้อง','ส่ง checklist ตรวจเอกสารจำลองและระบุความคลาดเคลื่อน'],
 ['reconcile','กระทบยอด','เทียบรายการระหว่างสองแหล่ง ระบุส่วนต่างและสิ่งที่ต้องสอบถาม','ส่งตารางกระทบยอด พร้อมรายการค้างตรวจ'],
 ['filing','จัดหมวดเอกสาร','ตั้งชื่อไฟล์ แยกประเภท ทำดัชนี และค้นกลับได้','ส่งผังแฟ้มและทะเบียนเอกสารตัวอย่างที่ค้นกลับได้'],
 ['po','เอกสารจัดซื้อ PO','อ่านใบสั่งซื้อ เทียบรายการ จำนวน ราคา และวันส่ง','ส่งตารางตรวจ PO กับใบเสนอราคา โดยไม่อนุมัติแทนผู้มีสิทธิ์'],
 ['quotes','เปรียบเทียบใบเสนอราคา','เทียบราคา คุณสมบัติ ระยะส่ง และเงื่อนไขบนฐานเดียวกัน','ส่งตารางเปรียบเทียบผู้ขาย 3 ราย พร้อมข้อควรถาม'],
 ['coordination','ประสานงานและติดตาม','บันทึกผู้รับผิดชอบ กำหนดส่ง และอัปเดตสถานะอย่างชัดเจน','ส่งตารางติดตามงานและตัวอย่างข้อความติดตาม'],
 ['stockdocs','เอกสารรับเข้า–จ่ายออก','เทียบรหัสสินค้า จำนวน และเอกสารรับส่งก่อนบันทึก','ส่งทะเบียนรับ–จ่าย พร้อมรายการที่ข้อมูลไม่ตรง'],
 ['count','นับและตรวจสต็อก','นับตามรหัส แยกหน่วยนับ และบันทึกส่วนต่าง','ส่งใบนับจำลองเทียบทะเบียน พร้อมบันทึกความต่าง'],
 ['packing','หยิบ แพ็ก และติดฉลาก','หยิบตรงออเดอร์ ตรวจจำนวน แพ็กตามคู่มือ และตรวจฉลาก','ส่งภาพหรือบันทึกตัวอย่างการแพ็กตาม checklist'],
 ['safety','ความปลอดภัยหน้างาน','รู้ข้อห้าม อุปกรณ์ที่ใช้ได้ และหยุดแจ้งเมื่อพบความเสี่ยง','ส่งการตอบสถานการณ์ความเสี่ยงและ checklist ก่อนเริ่มงาน'],
 ['interview','สัมภาษณ์เก็บข้อมูล','ถามตามแนวคำถาม ไม่ชี้นำ ขอความยินยอมและบันทึกตรงคำตอบ','ส่งแนวคำถามและบันทึกสัมภาษณ์จำลองที่ไม่ระบุตัวบุคคล'],
 ['survey','ออกแบบแบบสำรวจ','ตั้งคำถามตรงเป้าหมาย ไม่ชี้นำ และเลือกคำตอบครอบคลุม','ส่งแบบสำรวจสั้น พร้อมเหตุผลและผลทดลองอ่าน'],
 ['statistics','สถิติพื้นฐาน','คำนวณจำนวน สัดส่วน ค่าเฉลี่ย และบอกข้อจำกัดของตัวอย่าง','ส่งตารางสรุปแบบสำรวจ พร้อมข้อจำกัดการตีความ'],
 ['market','วิเคราะห์ตลาดและคู่แข่ง','เทียบสินค้า ราคา กลุ่มลูกค้า และอ้างแหล่งข้อมูล','ส่งตารางคู่แข่งและข้อสังเกตโดยแยกข้อเท็จจริงจากความเห็น'],
 ['campaign','วางแผนสื่อสารการตลาด','ระบุกลุ่มเป้าหมาย สาร ช่องทาง และตัวชี้วัด','ส่งแผนคอนเทนต์หรือแคมเปญขนาดเล็กพร้อมเกณฑ์วัด'],
 ['writing','เขียนคอนเทนต์','เขียนตรงกลุ่มเป้าหมาย ตรวจข้อมูล และระบุคำชวนทำ','ส่งข้อความ 2 รูปแบบตาม brief พร้อมแหล่งข้อเท็จจริง'],
 ['design','ออกแบบภาพ','จัดลำดับข้อมูล ใช้ตัวอักษร สี และขนาดส่งออกตรงโจทย์','ส่งภาพตาม brief พร้อมไฟล์แก้ไขและเหตุผลการจัดวาง'],
 ['copyright','สิทธิ์ในการใช้สื่อ','ตรวจที่มารูป ฟอนต์ เพลง และสิทธิ์เผยแพร่','ส่งรายการสื่อที่ใช้พร้อมหลักฐานสิทธิ์หรือแหล่งอนุญาต'],
 ['htmlcss','HTML / CSS','ทำหน้าเว็บที่มีโครงสร้าง อ่านได้บนมือถือ และใช้ปุ่มได้','ส่งหน้าเว็บตัวอย่างพร้อมไฟล์และผลตรวจหลายขนาดจอ'],
 ['javascript','JavaScript','จัดการเหตุการณ์ ตรวจข้อมูลฟอร์ม และแก้ข้อผิดพลาดพื้นฐาน','ส่งฟีเจอร์โต้ตอบพร้อมวิธีทดสอบและกรณีผิดพลาด'],
 ['git','Git และการส่งต่องาน','บันทึกการแก้ไข อธิบาย commit และเขียนวิธีเปิดงาน','ส่ง repository ตัวอย่างที่ไม่ใส่รหัสลับ พร้อม README'],
 ['testing','ทดสอบและเขียน bug report','ทำตาม test case ระบุขั้นตอน ผลคาดหวัง และผลจริง','ส่ง test cases และรายงานบั๊กที่ทำซ้ำได้'],
 ['ux','เข้าใจการใช้งาน','สังเกตผู้ใช้ ระบุจุดติดขัด และเสนอปรับหน้าจอ','ส่งบันทึกทดสอบใช้งานจำลองและภาพข้อเสนอ'],
 ['service','บริการและตอบคำถาม','ฟังปัญหา ให้ข้อมูลถูกต้อง และส่งต่อกรณีเกินสิทธิ์','ส่งบทสนทนาจำลองตามคู่มือพร้อมจุดที่ต้องส่งต่อ'],
 ['order','ดูแลรายการสั่งซื้อ','ตรวจสินค้า จำนวน ที่อยู่แบบปกปิดข้อมูล และสถานะ','ส่งทะเบียนคำสั่งซื้อจำลองและวิธีแก้ข้อมูลไม่ตรง'],
 ['crm','บันทึกเคสลูกค้า','บันทึกคำถาม การแก้ไข ผู้รับผิดชอบ และสถานะต่อเนื่อง','ส่งทะเบียนเคสจำลองที่ติดตามเรื่องย้อนหลังได้'],
 ['hrdocs','เอกสารบุคลากร','ตรวจความครบถ้วนและจัดแฟ้มตามสิทธิ์เข้าถึง','ส่ง checklist และผังเอกสารบุคลากรจำลอง'],
 ['screening','ประสานงานสรรหา','เทียบข้อมูลกับเกณฑ์ที่ตกลงและจัดตารางนัดอย่างเป็นธรรม','ส่งตารางเทียบเกณฑ์จำลองและข้อความนัดหมาย'],
 ['scheduling','จัดตารางและลงทะเบียน','ตรวจเวลา ผู้เข้าร่วม และข้อขัดแย้งก่อนยืนยัน','ส่งตารางกิจกรรมและทะเบียนจำลองที่ไม่ชนกัน']
];
const careerSkills=Object.fromEntries(careerSkillRows.map(([id,label,criterion,sample])=>[id,{id,label,criterion,sample}]));
const careerRows=[
 ['ba','business','Business Analyst (BA)','เข้าใจปัญหาธุรกิจและแปลงเป็นสิ่งที่ทีมลงมือทำได้',['excel','requirements','process','report'],['powerbi','sql'],['ba','business']],
 ['process-analyst','business','นักวิเคราะห์กระบวนการ','หาจุดติดขัดและปรับขั้นตอนการทำงาน',['process','excel','metrics','report'],['requirements'],['business']],
 ['business-coordinator','business','ผู้ประสานงานโครงการธุรกิจ','ติดตามขอบเขตงาน เวลา และข้อมูลระหว่างทีม',['coordination','excel','report'],['requirements','process'],['ba','business']],
 ['data-analyst','data','Data Analyst','จัดข้อมูล วิเคราะห์ และอธิบายสิ่งที่พบ',['excel','clean','sql','statistics','report'],['powerbi','pivot'],['bi']],
 ['bi-analyst','data','BI / Power BI Analyst','ทำรายงานและแดชบอร์ดช่วยตัดสินใจ',['excel','clean','sql','powerbi','metrics'],['report'],['bi','powerbi']],
 ['data-assistant','data','ผู้ช่วยจัดการข้อมูล','ตรวจและจัดข้อมูลให้พร้อมใช้งาน',['excel','clean','privacy'],['pivot','sql'],['bi']],
 ['accounting-assistant','accounting','ผู้ช่วยบัญชี','จัดและตรวจเอกสารให้ผู้รับผิดชอบบัญชี',['bookkeeping','invoice','excel','filing','privacy'],['reconcile'],['accounting']],
 ['ap-assistant','accounting','ผู้ช่วยบัญชีเจ้าหนี้ (AP)','ตรวจเอกสารซื้อและรายการรอจ่ายภายใต้การกำกับ',['bookkeeping','invoice','po','reconcile','excel'],['filing'],['accounting','purchasing']],
 ['ar-assistant','accounting','ผู้ช่วยบัญชีลูกหนี้ (AR)','ติดตามเอกสารขาย รับเงิน และรายการค้าง',['bookkeeping','invoice','reconcile','excel','coordination'],['privacy'],['accounting']],
 ['purchase-assistant','purchasing','ผู้ช่วยจัดซื้อ','เตรียม PO และติดตามเอกสารกับผู้ขาย',['po','quotes','excel','coordination'],['invoice'],['purchasing']],
 ['purchase-coordinator','purchasing','เจ้าหน้าที่ประสานงานจัดซื้อ','เทียบข้อเสนอและติดตามการส่งมอบ',['po','quotes','coordination','report'],['metrics'],['purchasing']],
 ['document-controller','purchasing','เจ้าหน้าที่ควบคุมเอกสาร','จัดทะเบียน รุ่นเอกสาร และสิทธิ์เข้าถึง',['filing','excel','privacy','coordination'],['po'],['purchasing','hr']],
 ['warehouse-assistant','warehouse','ผู้ช่วยคลังสินค้า','หยิบ แพ็ก ตรวจจำนวน และทำตามคู่มือ',['packing','count','safety'],['stockdocs'],['stock','warehouse']],
 ['inventory-clerk','warehouse','เจ้าหน้าที่ทะเบียนคลังสินค้า','ตรวจเอกสารรับจ่ายและยอดคงเหลือ',['stockdocs','count','excel','safety'],['reconcile'],['warehouse','stock']],
 ['logistics-coordinator','warehouse','ผู้ประสานงานรับ–ส่งสินค้า','ติดตามรายการขนส่งและข้อมูลคลาดเคลื่อน',['stockdocs','coordination','excel','report'],['metrics'],['warehouse']],
 ['research-assistant','marketing','ผู้ช่วยวิจัยตลาด','รวบรวมข้อมูลลูกค้าและคู่แข่งตามแผน',['interview','excel','privacy'],['survey','market'],['marketing']],
 ['market-analyst','marketing','นักวิเคราะห์ตลาด','แปลข้อมูลตลาดเป็นข้อสังเกตและทางเลือก',['market','survey','statistics','excel','report'],['powerbi'],['marketing']],
 ['marketing-coordinator','marketing','ผู้ประสานงานการตลาด','ช่วยวางแผนสื่อและติดตามผลกิจกรรม',['campaign','coordination','writing','metrics'],['design'],['marketing','writing']],
 ['content-creator','creative','Content Creator / Copywriter','เล่าเรื่องให้ตรง brief และกลุ่มเป้าหมาย',['writing','campaign','copyright'],['design'],['writing','marketing']],
 ['graphic-designer','creative','Graphic Designer','ออกแบบสื่อที่สื่อสารชัดและส่งไฟล์ใช้งานได้',['design','copyright','coordination'],['writing','ux'],['design']],
 ['content-planner','creative','ผู้วางแผนคอนเทนต์','เชื่อมเป้าหมาย กลุ่มคน เนื้อหา และผลลัพธ์',['writing','campaign','metrics','report'],['market'],['writing','marketing']],
 ['frontend-developer','technology','Frontend Developer','สร้างหน้าเว็บที่ใช้งานได้บนหลายหน้าจอ',['htmlcss','javascript','git','testing'],['ux'],['web']],
 ['qa-tester','technology','QA / Software Tester','ตรวจระบบและรายงานปัญหาที่ทำซ้ำได้',['testing','report','coordination'],['javascript','sql'],['testing']],
 ['web-assistant','technology','ผู้ช่วยดูแลเว็บไซต์','ปรับเนื้อหา ตรวจหน้าเว็บ และติดตามปัญหา',['htmlcss','testing','copyright'],['javascript','git'],['web','testing']],
 ['customer-support','service','เจ้าหน้าที่บริการลูกค้า','ตอบคำถามและติดตามเคสตามคู่มือ',['service','crm','privacy'],['coordination'],['service']],
 ['order-admin','service','แอดมินคำสั่งซื้อ','ตรวจรายการซื้อและประสานการจัดส่ง',['order','excel','service','privacy'],['stockdocs'],['service','warehouse']],
 ['service-coordinator','service','ผู้ประสานงานบริการ','เชื่อมลูกค้ากับทีมที่แก้ปัญหาได้',['service','coordination','crm','report'],['metrics'],['service']],
 ['hr-assistant','people','ผู้ช่วยฝ่ายบุคคล','ดูแลเอกสารบุคลากรและนัดหมาย',['hrdocs','privacy','excel','coordination'],['screening'],['hr']],
 ['recruitment-assistant','people','ผู้ช่วยประสานงานสรรหา','จัดข้อมูลผู้สมัครและติดตามนัดหมาย',['screening','privacy','scheduling','coordination'],['excel'],['hr']],
 ['office-coordinator','people','ผู้ประสานงานสำนักงาน','จัดตาราง เอกสาร และติดตามงานประจำวัน',['scheduling','filing','coordination','excel'],['report'],['hr','business']]
];
const careerCatalog=careerRows.map(([id,family,title,summary,required,recommended,sources])=>({id,family,title,summary,required,recommended,sources}));
// Conceptual alternatives; edges do not assert promotion, licensing, or guaranteed employment.
const careerConnections=[['business-coordinator','ba'],['business-coordinator','process-analyst'],['data-assistant','data-analyst'],['data-assistant','bi-analyst'],['accounting-assistant','ap-assistant'],['accounting-assistant','ar-assistant'],['document-controller','purchase-assistant'],['purchase-assistant','purchase-coordinator'],['warehouse-assistant','inventory-clerk'],['inventory-clerk','logistics-coordinator'],['research-assistant','market-analyst'],['research-assistant','marketing-coordinator'],['graphic-designer','content-planner'],['content-creator','content-planner'],['web-assistant','frontend-developer'],['web-assistant','qa-tester'],['customer-support','service-coordinator'],['order-admin','service-coordinator'],['hr-assistant','recruitment-assistant'],['office-coordinator','recruitment-assistant']];
// Pay, employer, schedule, and openings are all authored examples, not market quotes.
const extraJobRows=[
 ['market-field','เก็บข้อมูลวิจัยตลาด','marketing','รายครั้ง',500,'ครั้ง',4,'หน้างาน','หนึ่งรอบ 4 ชม. นัดวันกับพี่เลี้ยง','research-assistant',['interview','privacy'],'สัมภาษณ์จำลองตามแนวคำถาม 5 ชุด และส่งบันทึกไม่ระบุตัวตน'],
 ['market-desk','สำรวจคู่แข่งและสรุปตลาด','marketing','โปรเจกต์',1200,'โปรเจกต์',6,'ออนไลน์','โปรเจกต์ 1 สัปดาห์ รวมประมาณ 6 ชม.','market-analyst',['market','report'],'เทียบคู่แข่ง 5 รายและส่งรายงาน 2 หน้า พร้อมลิงก์ที่มา'],
 ['survey-clean','จัดตารางคำตอบแบบสำรวจ','data','รายชิ้นงาน',700,'ชุดข้อมูล',4,'ออนไลน์','หนึ่งชุดข้อมูล ประมาณ 4 ชม.','data-assistant',['excel','clean'],'จัดคำตอบตัวอย่าง 100 แถว ตรวจค่าซ้ำ และส่งบันทึกวิธีแก้'],
 ['account-file','ผู้ช่วยบัญชีจัดแฟ้มเอกสาร','accounting','พาร์ตไทม์',80,'ชั่วโมง',6,'หน้างาน','3 ชม. × 2 วัน/สัปดาห์ ระยะตัวอย่าง 2 สัปดาห์','accounting-assistant',['filing','invoice','privacy'],'จัดเอกสารจำลองตามเดือนและประเภท พร้อมทะเบียนเอกสาร ภายใต้พี่เลี้ยง'],
 ['account-po','ตรวจเอกสาร PO และใบแจ้งหนี้','accounting','รายชิ้นงาน',650,'ชุดเอกสาร',4,'ออนไลน์','ชุดเอกสารจำลอง 20 รายการ ประมาณ 4 ชม.','ap-assistant',['po','invoice','excel'],'เทียบ PO กับใบแจ้งหนี้และจำนวนรับ ระบุรายการไม่ตรง ไม่อนุมัติจ่ายเงิน'],
 ['account-reconcile','ช่วยกระทบยอดรายการรับเงิน','accounting','โปรเจกต์',900,'โปรเจกต์',5,'ออนไลน์','โปรเจกต์ 3 วัน รวมประมาณ 5 ชม.','ar-assistant',['reconcile','excel'],'เทียบทะเบียนรับเงินกับรายการจำลองและส่งตารางส่วนต่างให้ผู้ดูแล'],
 ['purchase-quote','ผู้ช่วยเทียบใบเสนอราคา','purchasing','รายครั้ง',500,'ครั้ง',3,'ออนไลน์','ครั้งละ 3 ชม. ส่งภายในวันที่ตกลง','purchase-assistant',['quotes','excel'],'เทียบข้อเสนอ 3 ผู้ขายตามแบบฟอร์ม ไม่ตัดสินใจซื้อหรืออนุมัติแทน'],
 ['purchase-track','ติดตามสถานะเอกสารจัดซื้อ','purchasing','พาร์ตไทม์',85,'ชั่วโมง',6,'ออนไลน์','2 ชม. × 3 วัน/สัปดาห์ ระยะตัวอย่าง 2 สัปดาห์','purchase-coordinator',['po','coordination'],'อัปเดตสถานะ PO จำลองและรายการต้องสอบถามผู้รับผิดชอบ'],
 ['warehouse-pack','หยิบและแพ็กสินค้าตามออเดอร์','warehouse','รายวัน',450,'วัน',6,'หน้างาน','กะกลางวัน 6 ชม. เลือกวันที่ตกลง','warehouse-assistant',['packing','count','safety'],'ตรวจรหัสและจำนวน แพ็กตามคู่มือ มีพี่เลี้ยง ไม่ใช้เครื่องจักร'],
 ['warehouse-doc','แยกเอกสารรับ–จ่ายคลังสินค้า','warehouse','พาร์ตไทม์',80,'ชั่วโมง',6,'หน้างาน','3 ชม. × 2 วัน/สัปดาห์ ระยะตัวอย่าง 2 สัปดาห์','inventory-clerk',['stockdocs','filing','excel'],'แยกใบรับเข้าและใบจ่ายออก พร้อมทะเบียนเอกสารและรายการข้อมูลไม่ตรง'],
 ['warehouse-count','ผู้ช่วยนับสต็อกหนึ่งรอบ','warehouse','รายครั้ง',500,'ครั้ง',4,'หน้างาน','หนึ่งรอบกลางวัน 4 ชม. ตามวันนัด','inventory-clerk',['count','safety'],'นับสินค้าตามใบนับคู่กับพี่เลี้ยงและบันทึกส่วนต่าง ไม่ยกของหนัก'],
 ['ba-report','วิเคราะห์ขั้นตอนร้านค้าและส่งรายงาน','business','โปรเจกต์',1500,'โปรเจกต์',8,'ออนไลน์','โปรเจกต์ 2 สัปดาห์ รวมประมาณ 8 ชม.','ba',['requirements','process','report'],'อ่าน brief สัมภาษณ์จำลอง วาดขั้นตอนปัจจุบันและเสนอปรับหนึ่งจุด'],
 ['bi-dashboard','ทำแดชบอร์ดยอดขายด้วย Power BI','data','โปรเจกต์',1800,'โปรเจกต์',8,'ออนไลน์','โปรเจกต์ 2 สัปดาห์ รวมประมาณ 8 ชม.','bi-analyst',['excel','clean','powerbi'],'ใช้ยอดขายจำลอง สร้างแดชบอร์ด 1 หน้าและอธิบายตัวชี้วัด'],
 ['content-piece','เขียนข้อความแนะนำสินค้าตาม brief','creative','รายชิ้นงาน',400,'ชิ้นงาน',3,'ออนไลน์','ข้อความ 2 แบบ ใช้ประมาณ 3 ชม.','content-creator',['writing','copyright'],'ส่งข้อความสองแบบพร้อมตรวจข้อเท็จจริงตามข้อมูลที่ให้'],
 ['web-test-round','ทดสอบเว็บไซต์หนึ่งรอบ','technology','รายครั้ง',600,'รอบ',4,'ออนไลน์','หนึ่งรอบทดสอบ ประมาณ 4 ชม.','qa-tester',['testing','report'],'ทำ test case 10 ข้อและส่ง bug report พร้อมวิธีทำซ้ำ'],
 ['order-support','ผู้ช่วยแอดมินออเดอร์ช่วงกลางวัน','service','พาร์ตไทม์',80,'ชั่วโมง',6,'ออนไลน์','2 ชม. × 3 วัน/สัปดาห์ มีผู้ดูแลประจำกะ','order-admin',['order','privacy','service'],'ตรวจรายการตัวอย่างและตอบตามคู่มือ ส่งต่อเมื่อเกินสิทธิ์'],
 ['hr-files','จัดทะเบียนเอกสารฝ่ายบุคคล','people','รายชิ้นงาน',650,'ชุดเอกสาร',4,'ออนไลน์','ชุดเอกสารจำลอง 20 แฟ้ม ประมาณ 4 ชม.','hr-assistant',['hrdocs','filing','privacy'],'ตรวจ checklist และส่งทะเบียนโดยใช้ชื่อสมมติทั้งหมด'],
 ['schedule-assistant','ผู้ช่วยลงทะเบียนกิจกรรม','people','รายวัน',500,'วัน',6,'ในสถานศึกษา','กะกิจกรรมกลางวัน 6 ชม. หนึ่งวัน','office-coordinator',['scheduling','coordination','privacy'],'จัดรายชื่อสมมติ ตรวจเวลาและสรุปจำนวนผู้เข้าร่วม']
];
const extraJobs=extraJobRows.map(([id,title,family,employmentType,pay,unit,hours,place,schedule,careerId,skillIds,deliverable])=>({id,title,family,employmentType,pay,unit,hours,place,schedule,careerId,skillIds,deliverable,duration:schedule,company:'Higher Partner · จำลอง',initial:'H',category:careerFamilies.find(f=>f.id===family).branch,skills:skillIds.map(id=>careerSkills[id].label),subjects:family==='warehouse'?'คณิตศาสตร์ การจัดการ และการอ่านเอกสาร':family==='accounting'?'การบัญชี คณิตศาสตร์ และการใช้ตารางข้อมูล':'การสื่อสาร คอมพิวเตอร์ และการคิดวิเคราะห์',description:deliverable,tasks:[deliverable,'ทำตามคู่มือและสอบถามพี่เลี้ยงก่อนดำเนินการนอกขอบเขต','ส่งผลงาน รับคำแนะนำ และสะท้อนสิ่งที่ได้ลอง'],scores:{},node:null}));
const originalJobMeta={
 content:{employmentType:'รายชิ้นงาน',careerId:'content-creator',skillIds:['writing','copyright']},
 design:{employmentType:'รายชิ้นงาน',careerId:'graphic-designer',skillIds:['design','copyright']},
 event:{employmentType:'รายวัน',careerId:'office-coordinator',skillIds:['scheduling','coordination']},
 research:{employmentType:'รายชิ้นงาน',careerId:'research-assistant',skillIds:['interview','excel','privacy']},
 data:{employmentType:'รายชิ้นงาน',careerId:'data-assistant',skillIds:['excel','clean']},
 web:{employmentType:'รายครั้ง',careerId:'qa-tester',skillIds:['testing','report']}
};
