(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{TG6D:function(e,t,n){"use strict";n.d(t,"a",function(){return m}),n.d(t,"b",function(){return v});var a=n("ofXK"),i=n("zHT3"),l=n("fXoL"),s=n("cLXs"),c=n("hBBj");const r=["avatarElement"],o=["boxElement"],b=["textElement"];function u(e,t){if(1&e&&(l.Pb(0,"span",9),l.xc(1),l.Ob()),2&e){const e=t.$implicit;l.Bb("opacity-70",!e.finalized),l.yb(1),l.zc("",e.value," ")}}function p(e,t){if(1&e&&(l.Nb(0),l.Pb(1,"div",1),l.cc(2,"async"),l.Kb(3,"div",2,3),l.Pb(5,"div",4,5),l.Pb(7,"div",6,7),l.vc(9,u,2,3,"span",8),l.Ob(),l.Ob(),l.Ob(),l.Mb()),2&e){const e=t.ngIf,n=l.bc().ngIf,a=l.bc();l.yb(1),l.Bb("show",l.dc(2,8,a.speechQuery.showBubble$)),l.yb(2),l.Bb("hidden",!n.avatarStyle.backgroundImage.value),l.yb(4),l.Bb("host",2===e.speechServiceState),l.yb(2),l.hc("ngForOf",e.sentences)("ngForTrackBy",a.track)}}function y(e,t){if(1&e&&(l.Nb(0),l.vc(1,p,10,10,"ng-container",0),l.cc(2,"async"),l.Mb()),2&e){const e=l.bc();l.yb(1),l.hc("ngIf",l.dc(2,1,e.speechQuery.state$))}}let m=(()=>{class e{constructor(e,t,n){this.speechQuery=e,this.styleQuery=t,this.detector=n,this.track=(e,t)=>t.id&&t.value}BuildTypedValue(e){switch(e.type){case i.b.pixels:return e.value+"px";case i.b.ms:return e.value+"ms";case i.b.url:return`url(${e.value})`;case i.b.translateX:return`translateX(${e.value}px)`;case i.b.translateY:return`translateY(${e.value}px)`;default:return e.value}}ApplyElementStyleDAta(e,t){for(const n in t)e.style[n]=this.BuildTypedValue(t[n])}ApplyCompositeElementStyleData(e,t){for(const n in t)e.style[n]=Object.values(t[n]).map(e=>this.BuildTypedValue(e)).join(" ")}ApplyStyles(e){this.ApplyElementStyleDAta(this.avatarElement.nativeElement,e.avatarStyle),this.ApplyElementStyleDAta(this.boxElement.nativeElement,e.boxStyle),this.ApplyElementStyleDAta(this.textElement.nativeElement,e.textStyle),this.ApplyCompositeElementStyleData(this.textElement.nativeElement,e.textStyleComposite),this.ApplyCompositeElementStyleData(this.avatarElement.nativeElement,e.avatarStyleComposite)}ngAfterViewInit(){this.styleQuery.current$.subscribe(e=>this.ApplyStyles(e))}ngOnInit(){this.speechQuery.sentences$.subscribe(e=>{this.detector.detectChanges(),setTimeout(()=>{var e,t,n,a;return null===(n=null===(t=null===(e=this.textElement)||void 0===e?void 0:e.nativeElement)||void 0===t?void 0:t.scrollTo)||void 0===n?void 0:n.call(t,{top:null===(a=this.textElement.nativeElement)||void 0===a?void 0:a.scrollHeight,behavior:"smooth"})},50)})}}return e.\u0275fac=function(t){return new(t||e)(l.Jb(s.a),l.Jb(c.a),l.Jb(l.h))},e.\u0275cmp=l.Db({type:e,selectors:[["app-stt-renderer"]],viewQuery:function(e,t){if(1&e&&(l.Ac(r,1),l.Ac(o,1),l.Ac(b,1)),2&e){let e;l.mc(e=l.Yb())&&(t.avatarElement=e.first),l.mc(e=l.Yb())&&(t.boxElement=e.first),l.mc(e=l.Yb())&&(t.textElement=e.first)}},decls:2,vars:3,consts:[[4,"ngIf"],[1,"flex","stt-container","flex","items-end","relative"],[1,"pointer-events-none","z-50","w-36","h-36","bg-contain","bg-center","bg-no-repeat",2,"animation-iteration-count","infinite","animation-timing-function","ease-in-out"],["avatarElement",""],[1,"box-content","relative","stt-box","flex","flex-col","bg-cover","bg-center"],["boxElement",""],[1,"stt-box-text","absolute","overflow-y-scroll","overflow-x-hidden"],["textElement",""],["class","break-words",3,"opacity-70",4,"ngFor","ngForOf","ngForTrackBy"],[1,"break-words"]],template:function(e,t){1&e&&(l.vc(0,y,3,3,"ng-container",0),l.cc(1,"async")),2&e&&l.hc("ngIf",l.dc(1,1,t.styleQuery.current$))},directives:[a.m,a.l],pipes:[a.b],encapsulation:2,changeDetection:0}),e})(),v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Hb({type:e}),e.\u0275inj=l.Gb({imports:[[a.c]]}),e})()}}]);