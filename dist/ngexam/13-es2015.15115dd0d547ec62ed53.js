(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"8XG9":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("LRne"),i=n("fXoL"),s=n("bB31");let c=(()=>{class e{constructor(e){this.messageService=e,this.createHandleError=(e="")=>(t="operation",n={})=>this.handleError(e,t,n)}handleError(e="",t="operation",n={}){return i=>{console.log(i);const s=i.error instanceof ErrorEvent?i.error.message:`Serve feedback${i.status},feedback information${i.error}`;return this.messageService.err(`${e}:${t}:Content:${s}`),Object(o.a)(n)}}}return e.\u0275fac=function(t){return new(t||e)(i.ec(s.a))},e.\u0275prov=i.Qb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},OqvA:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n("fXoL");let i=(()=>{class e{constructor(){this.url="http://127.0.0.1:8081"}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Qb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},Xoj1:function(e,t,n){"use strict";n.r(t);var o=n("ofXK"),i=n("0nng"),s=n("tyNb"),c=n("nYmY");class r{constructor(e={}){this.questions=[],this.id=e.id||"",this.questionName=e.questionName||""}}class a extends r{constructor(e){super(e),this.options=e,this.controlType=0,this.questions=e.questions||[]}}class u extends r{constructor(e){super(e),this.options=e,this.controlType=1,this.questions=e.questions||[]}}var l=n("fXoL"),m=n("94Cw"),p=n("fFZa"),h=n("B+r4"),b=n("q0Us"),f=n("3Pt+");let g=(()=>{class e{constructor(){}toFormGroup(e){const t={};return e.forEach(e=>{t[e.id]=new f.d(0)}),new f.g(t)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=l.Qb({token:e,factory:e.\u0275fac}),e})();var d=n("+Mbm"),v=n("7xZ/"),q=n("PScX"),x=n("OzZK");function k(e,t){if(1&e&&(l.ac(0,"li",4),l.ac(1,"label",5),l.Vb(2,"input",6),l.Mc(3),l.Zb(),l.Zb()),2&e){const e=t.$implicit,n=l.lc(2);l.Db(2),l.tc("formControlName",n.question.id)("value",e.value),l.Db(1),l.Oc(" ",e.key," ")}}function O(e,t){if(1&e&&(l.ac(0,"div"),l.ac(1,"ul"),l.Kc(2,k,4,3,"li",3),l.Zb(),l.Zb()),2&e){const e=l.lc();l.Db(2),l.tc("ngForOf",e.question.questions)}}function y(e,t){if(1&e){const e=l.bc();l.ac(0,"label",9),l.Mc(1),l.ac(2,"input",10,11),l.ic("click",(function(){l.Cc(e);const t=l.Bc(3),n=l.lc(2);return n.setCheckBoxValue(t,n.question.id)})),l.Zb(),l.Zb()}if(2&e){const e=t.$implicit;l.Db(1),l.Oc(" ",e.key," "),l.Db(1),l.tc("value",e.value)}}function C(e,t){if(1&e&&(l.ac(0,"div"),l.Vb(1,"input",7),l.Kc(2,y,4,2,"label",8),l.Zb()),2&e){const e=l.lc();l.Db(1),l.tc("formControlName",e.question.id)("hidden",!0),l.Db(1),l.tc("ngForOf",e.question.questions)}}let w=(()=>{class e{constructor(){this.checkboxArr=[]}ngOnInit(){}setCheckBoxValue(e,t){this.checkboxArr.includes(+e.value)?this.checkboxArr.splice(this.checkboxArr.findIndex(t=>+t==+e.value),1):this.checkboxArr.push(+e.value),this.form.patchValue({[t]:this.checkboxArr})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l.Ob({type:e,selectors:[["app-exam-form-question"]],inputs:{question:"question",form:"form"},decls:6,vars:5,consts:[[2,"margin-top","20px",3,"formGroup"],[3,"ngSwitch"],[4,"ngSwitchCase"],["class","li-radio",4,"ngFor","ngForOf"],[1,"li-radio"],[1,"question-radio"],["nzRequired","","type","radio",3,"formControlName","value"],["type","text",3,"formControlName","hidden"],["class","radio-inline question-checkbox",4,"ngFor","ngForOf"],[1,"radio-inline","question-checkbox"],["type","checkbox",3,"value","click"],["oneCheckBox",""]],template:function(e,t){1&e&&(l.ac(0,"div",0),l.ac(1,"label"),l.Mc(2),l.Zb(),l.ac(3,"div",1),l.Kc(4,O,3,1,"div",2),l.Kc(5,C,3,3,"div",2),l.Zb(),l.Zb()),2&e&&(l.tc("formGroup",t.form),l.Db(2),l.Nc(t.question.questionName),l.Db(1),l.tc("ngSwitch",t.question.controlType),l.Db(1),l.tc("ngSwitchCase",0),l.Db(1),l.tc("ngSwitchCase",1))},directives:[f.m,f.h,o.n,o.o,o.k,f.o,f.b,f.l,f.f],styles:["ul[_ngcontent-%COMP%]{margin:0;padding:0}label.question-checkbox[_ngcontent-%COMP%], label.question-radio[_ngcontent-%COMP%]{cursor:pointer;padding:10px}label.question-checkbox[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], label.question-radio[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{margin-top:10px;margin-left:10px}.li-radio[_ngcontent-%COMP%]{list-style:none;margin:10px 0;display:inline-block}"]}),e})();function S(e,t){if(1&e&&(l.ac(0,"div"),l.Vb(1,"app-exam-form-question",4),l.Zb()),2&e){const e=t.$implicit,n=l.lc(2);l.Db(1),l.tc("question",e)("form",n.form)}}function N(e,t){if(1&e){const e=l.bc();l.ac(0,"form",1),l.ic("ngSubmit",(function(){return l.Cc(e),l.lc().onSubmit()})),l.Kc(1,S,2,2,"div",2),l.ac(2,"div"),l.ac(3,"button",3),l.Mc(4,"Submit"),l.Zb(),l.Zb(),l.Zb()}if(2&e){const e=l.lc();l.tc("formGroup",e.form),l.Db(1),l.tc("ngForOf",e.questionList)}}let L=(()=>{class e{constructor(e,t,n,o,i){this.router=e,this.qcs=t,this.usc=n,this.scoreService=o,this.nzmsg=i}ngOnInit(){}ngOnChanges(e){console.log(this.questionList),this.questionList&&(this.form=this.qcs.toFormGroup(this.questionList),console.log(this.form))}onSubmit(){console.log(this.form.value),Object.values(this.form.value).every(e=>0!==e)?this.score():this.nzmsg.warning("You have quesstion that do not answer!")}score(){this.questionData=this.getQuestionData(),this.scoreService.mark(this.questionData).subscribe(e=>{console.log(e),0===e.code?(this.scoreService.score=e.score,this.router.navigate(["examMessage"])):this.nzmsg.error("something wrong, please try again\uff01")})}getQuestionData(){return{examName:this.examName,userName:this.usc.user?this.usc.user.username:"tourist",questions:this.form.value,date:(new Date).getTime()}}}return e.\u0275fac=function(t){return new(t||e)(l.Ub(s.d),l.Ub(g),l.Ub(d.a),l.Ub(v.a),l.Ub(q.e))},e.\u0275cmp=l.Ob({type:e,selectors:[["app-exam-form"]],inputs:{questionList:"questionList",examName:"examName"},features:[l.Cb([g]),l.Bb],decls:1,vars:1,consts:[[3,"formGroup","ngSubmit",4,"ngIf"],[3,"formGroup","ngSubmit"],[4,"ngFor","ngForOf"],["tyep","submit","nz-button","","nzType","primary",2,"margin-top","20px"],[3,"question","form"]],template:function(e,t){1&e&&l.Kc(0,N,5,2,"form",0),2&e&&l.tc("ngIf",t.form)},directives:[o.l,f.r,f.m,f.h,o.k,x.a,w],styles:[""]}),e})();const M=[{path:"",component:(()=>{class e{constructor(e,t,n){this.courseService=e,this.examService=t,this.questionService=n,this.nzOptions=null,this.values=null,this.examTitle="Online Exam"}ngOnInit(){this.getcourseList()}getcourseList(){this.courseService.getcourseList().subscribe(e=>{console.log(e.userInfo),this.nzOptions=e.userInfo.map(e=>e.populateExam.length>0?{value:e._id,label:e.courseName,children:e.populateExam.map(e=>({value:e._id,label:e.examName,isLeaf:!0}))}:{value:e._id,label:e.courseName,disabled:!0})})}getOneExam(e){this.examService.getOneExam(e).subscribe(e=>{this.examTitle=e.examName,this.selectExam=e,this.getQuestionList(this.selectExam._id)})}onChanges(e){this.getOneExam(e[1])}getQuestionList(e){console.log(e),this.questionService.getQuestionList(e).subscribe(e=>{console.log(e),this.questionList=e.userInfo.map(e=>0===e.type?new a({id:e._id,questionName:e.questionName,questions:[{key:e.question0,value:3},{key:e.question1,value:5},{key:e.question2,value:11},{key:e.question3,value:21}].filter(e=>e.key)}):new u({id:e._id,questionName:e.questionName,questions:[{key:e.question0,value:3},{key:e.question1,value:5},{key:e.question2,value:11},{key:e.question3,value:21}].filter(e=>e.key)}))})}}return e.\u0275fac=function(t){return new(t||e)(l.Ub(c.a),l.Ub(m.a),l.Ub(p.a))},e.\u0275cmp=l.Ob({type:e,selectors:[["app-exam"]],features:[l.Cb([c.a])],decls:9,vars:5,consts:[[1,"main"],["nz-row",""],["nz-col","","nzSpan","6"],["nzPlaceHolder","Please select",3,"nzOptions","ngModel","ngModelChange"],["nz-col","","nzSpan","16"],[1,"examTitle"],[3,"questionList","examName"],["nz-col","","nzSpan","2"]],template:function(e,t){1&e&&(l.ac(0,"div",0),l.ac(1,"div",1),l.ac(2,"div",2),l.ac(3,"nz-cascader",3),l.ic("ngModelChange",(function(e){return t.values=e}))("ngModelChange",(function(e){return t.onChanges(e)})),l.Zb(),l.Zb(),l.ac(4,"div",4),l.ac(5,"h1",5),l.Mc(6),l.Zb(),l.Vb(7,"app-exam-form",6),l.Zb(),l.Vb(8,"div",7),l.Zb(),l.Zb()),2&e&&(l.Db(3),l.tc("nzOptions",t.nzOptions)("ngModel",t.values),l.Db(3),l.Nc(t.examTitle),l.Db(1),l.tc("questionList",t.questionList)("examName",t.examTitle))},directives:[h.c,h.a,b.a,f.l,f.n,L],styles:[".main[_ngcontent-%COMP%]{background:#fff;padding:50px;box-shadow:0 1px 2px #bbb}.examTitle[_ngcontent-%COMP%]{padding-left:30px;letter-spacing:2px}.change-options[_ngcontent-%COMP%]{display:inline-block;font-size:12px;margin-top:8px}"]}),e})()}];let D=(()=>{class e{}return e.\u0275mod=l.Sb({type:e}),e.\u0275inj=l.Rb({factory:function(t){return new(t||e)},imports:[[s.g.forChild(M)],s.g]}),e})();n.d(t,"ExamModule",(function(){return Z}));let Z=(()=>{class e{}return e.\u0275mod=l.Sb({type:e}),e.\u0275inj=l.Rb({factory:function(t){return new(t||e)},imports:[[o.c,D,i.a,f.i,f.p]]}),e})()},bB31:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("tk/3"),i=n("fXoL"),s=n("OqvA");let c=(()=>{class e{constructor(e,t){this.http=e,this.config=t,this.token="pass",this.httpOptions={headers:new o.e({"Content-Type":"application/json","x-access-token":this.token})}}add(e){return this.http.post(`${this.config.url}/log/message`,e,this.httpOptions)}err(e){console.log(e)}getOneDataLog(e){return this.http.post(`${this.config.url}/log/getOneDataLog`,e,this.httpOptions)}}return e.\u0275fac=function(t){return new(t||e)(i.ec(o.b),i.ec(s.a))},e.\u0275prov=i.Qb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);