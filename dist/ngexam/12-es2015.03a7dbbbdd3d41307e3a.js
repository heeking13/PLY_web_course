(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"8XG9":function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var o=r("LRne"),n=r("fXoL"),s=r("bB31");let c=(()=>{class t{constructor(t){this.messageService=t,this.createHandleError=(t="")=>(e="operation",r={})=>this.handleError(t,e,r)}handleError(t="",e="operation",r={}){return n=>{console.log(n);const s=n.error instanceof ErrorEvent?n.error.message:`Serve feedback${n.status},feedback information${n.error}`;return this.messageService.err(`${t}:${e}:Content:${s}`),Object(o.a)(r)}}}return t.\u0275fac=function(e){return new(e||t)(n.ec(s.a))},t.\u0275prov=n.Qb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},OqvA:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var o=r("fXoL");let n=(()=>{class t{constructor(){this.url="http://127.0.0.1:8081"}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Qb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},bB31:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var o=r("tk/3"),n=r("fXoL"),s=r("OqvA");let c=(()=>{class t{constructor(t,e){this.http=t,this.config=e,this.token="pass",this.httpOptions={headers:new o.e({"Content-Type":"application/json","x-access-token":this.token})}}add(t){return this.http.post(`${this.config.url}/log/message`,t,this.httpOptions)}err(t){console.log(t)}getOneDataLog(t){return this.http.post(`${this.config.url}/log/getOneDataLog`,t,this.httpOptions)}}return t.\u0275fac=function(e){return new(e||t)(n.ec(o.b),n.ec(s.a))},t.\u0275prov=n.Qb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},phLE:function(t,e,r){"use strict";r.r(e);var o=r("ofXK"),n=r("tyNb"),s=r("fXoL"),c=r("7xZ/");const i=[{path:"",component:(()=>{class t{constructor(t,e){this.scoreService=t,this.router=e}ngOnInit(){this.scoreService.score>=0?this.score=1*this.scoreService.score:this.router.navigate(["exam"])}}return t.\u0275fac=function(e){return new(e||t)(s.Ub(c.a),s.Ub(n.d))},t.\u0275cmp=s.Ob({type:t,selectors:[["app-exam-message"]],decls:2,vars:1,template:function(t,e){1&t&&(s.ac(0,"div"),s.Mc(1),s.Zb()),2&t&&(s.Db(1),s.Oc(" Your mark is ",e.score," . You finish this exam. Please logout.\n"))},styles:[""]}),t})()}];let a=(()=>{class t{}return t.\u0275mod=s.Sb({type:t}),t.\u0275inj=s.Rb({factory:function(e){return new(e||t)},imports:[[n.g.forChild(i)],n.g]}),t})();r.d(e,"ExamMessageModule",(function(){return u}));let u=(()=>{class t{}return t.\u0275mod=s.Sb({type:t}),t.\u0275inj=s.Rb({factory:function(e){return new(e||t)},imports:[[o.c,a]]}),t})()}}]);