(self.webpackChunksimple_obs_stt=self.webpackChunksimple_obs_stt||[]).push([[592],{625:(t,e,n)=>{"use strict";n.d(e,{E:()=>h,B:()=>g});var a=n(1116),i=n(3235),l=n(9713),o=n(2926),s=n(4818),r=n(3917);const c=["avatarElement"],u=["boxElement"],p=["textElement"];function m(t,e){if(1&t&&(o.TgZ(0,"div"),o._uU(1),o.qZA()),2&t){const t=e.$implicit;o.xp6(1),o.Oqu(t)}}const y=function(t,e){return{value:t,params:e}};function x(t,e){if(1&t&&(o.TgZ(0,"div",10),o.YNc(1,m,2,1,"div",8),o.qZA()),2&t){const t=e.$implicit,n=o.oxw().$implicit,a=o.oxw(2).ngIf,i=o.oxw();o.ekj("opacity-70",!n.finalized),o.Q6J("@listAnimation",o.WLB(5,y,t.length,i.GetRandomizedParams(a))),o.xp6(1),o.Q6J("ngForOf",t)("ngForTrackBy",i.trackLetter)}}function v(t,e){if(1&t&&(o.ynx(0),o.YNc(1,x,2,8,"div",9),o.BQk()),2&t){const t=e.$implicit,n=o.oxw(3);o.xp6(1),o.Q6J("ngForOf",t.valueNext)("ngForTrackBy",n.trackWord)}}function d(t,e){if(1&t&&(o.ynx(0),o.TgZ(1,"div",1),o.ALo(2,"async"),o._UZ(3,"div",2,3),o.TgZ(5,"div",4,5),o.TgZ(7,"div",6,7),o.YNc(9,v,2,2,"ng-container",8),o.qZA(),o.qZA(),o.qZA(),o.BQk()),2&t){const t=e.ngIf,n=o.oxw().ngIf,a=o.oxw();o.xp6(1),o.ekj("show",o.lcZ(2,8,a.speechQuery.showBubble$)),o.xp6(2),o.ekj("hidden",!n.avatarStyle.backgroundImage.value),o.xp6(4),o.ekj("host",2===t.speechServiceState),o.xp6(2),o.Q6J("ngForOf",t.sentences)("ngForTrackBy",a.track)}}function f(t,e){if(1&t&&(o.ynx(0),o.YNc(1,d,10,10,"ng-container",0),o.ALo(2,"async"),o.BQk()),2&t){const t=o.oxw();o.xp6(1),o.Q6J("ngIf",o.lcZ(2,1,t.speechQuery.state$))}}let h=(()=>{class t{constructor(t,e,n){this.speechQuery=t,this.styleQuery=e,this.detector=n,this.track=(t,e)=>t,this.trackWord=(t,e)=>t,this.trackLetter=(t,e)=>e}BuildTypedValue(t){switch(t.type){case i.RS.pixels:return t.value+"px";case i.RS.ms:return t.value+"ms";case i.RS.url:return`url(${t.value})`;case i.RS.translateX:return`translateX(${t.value}px)`;case i.RS.translateY:return`translateY(${t.value}px)`;case i.RS.number:default:return t.value}}GetRandomRange(t,e){return Math.random()*(e-t)+t}GetRandomizedParams(t){const e=t.textStyle.scaleMin.value,n=t.textStyle.scaleMax.value,a=t.textStyle.rotationMin.value,i=t.textStyle.rotationMax.value,l=t.textStyle.translationXMin.value,o=t.textStyle.translationXMax.value,s=t.textStyle.translationYMin.value,r=t.textStyle.translationYMax.value;return{time:this.GetRandomRange(t.textStyle.durationMin.value,t.textStyle.durationMax.value).toFixed(1),scale:this.GetRandomRange(e,n).toFixed(1),rotation:this.GetRandomRange(a,i).toFixed(1),translateX:this.GetRandomRange(l,o).toFixed(1),translateY:this.GetRandomRange(s,r).toFixed(1)}}ApplyElementStyleDAta(t,e,n,a){var l;for(const o in a){if(a[o].type===i.RS.logic)continue;const s=null===(l=i.nS[e])||void 0===l?void 0:l[o];s?s(t,n.style,this.BuildTypedValue(a[o])):n.style[o]=this.BuildTypedValue(a[o])}}ApplyCompositeElementStyleData(t,e){for(const n in e)t.style[n]=Object.values(e[n]).map(t=>this.BuildTypedValue(t)).join(" ")}ApplyStyles(t){this.ApplyElementStyleDAta(t,"avatarStyle",this.avatarElement.nativeElement,t.avatarStyle),this.ApplyElementStyleDAta(t,"boxStyle",this.boxElement.nativeElement,t.boxStyle),this.ApplyElementStyleDAta(t,"textStyle",this.textElement.nativeElement,t.textStyle),this.ApplyCompositeElementStyleData(this.textElement.nativeElement,t.textStyleComposite),this.ApplyCompositeElementStyleData(this.avatarElement.nativeElement,t.avatarStyleComposite)}ngAfterViewInit(){this.styleQuery.current$.subscribe(t=>this.ApplyStyles(t))}ngOnInit(){this.speechQuery.sentences$.subscribe(t=>{this.detector.detectChanges(),setTimeout(()=>{var t,e,n,a;return null===(n=null===(e=null===(t=this.textElement)||void 0===t?void 0:t.nativeElement)||void 0===e?void 0:e.scrollTo)||void 0===n?void 0:n.call(e,{top:null===(a=this.textElement.nativeElement)||void 0===a?void 0:a.scrollHeight,behavior:"smooth"})},50)})}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(s.v),o.Y36(r.B),o.Y36(o.sBO))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-stt-renderer"]],viewQuery:function(t,e){if(1&t&&(o.Gf(c,5),o.Gf(u,5),o.Gf(p,5)),2&t){let t;o.iGM(t=o.CRH())&&(e.avatarElement=t.first),o.iGM(t=o.CRH())&&(e.boxElement=t.first),o.iGM(t=o.CRH())&&(e.textElement=t.first)}},decls:2,vars:3,consts:[[4,"ngIf"],[1,"flex","stt-container","flex","items-end","relative"],[1,"pointer-events-none","z-50","w-36","h-36","bg-contain","bg-center","bg-no-repeat",2,"animation-iteration-count","infinite","animation-timing-function","ease-in-out"],["avatarElement",""],[1,"box-content","relative","stt-box","flex","flex-col","bg-cover","bg-center"],["boxElement",""],[1,"flex","flex-wrap","break-words","min-h-8","stt-box-text","absolute","overflow-y-scroll","overflow-x-hidden"],["textElement",""],[4,"ngFor","ngForOf","ngForTrackBy"],["class","flex whitespace-pre-wrap",3,"opacity-70",4,"ngFor","ngForOf","ngForTrackBy"],[1,"flex","whitespace-pre-wrap"]],template:function(t,e){1&t&&(o.YNc(0,f,3,3,"ng-container",0),o.ALo(1,"async")),2&t&&o.Q6J("ngIf",o.lcZ(1,1,e.styleQuery.current$))},directives:[a.O5,a.sg],pipes:[a.Ov],encapsulation:2,data:{animation:[(0,l.X$)("listAnimation",[(0,l.eR)("* => *",[(0,l.IO)(":enter",[(0,l.oB)({opacity:0,transform:"rotate({{rotation}}deg) scale({{scale}}) translateX({{translateX}}px) translateY({{translateY}}px)"}),(0,l.EY)(30,[(0,l.jt)("{{time}}s",(0,l.oB)({opacity:1,transform:"rotate(0) scale(1) translateX(0) translateY(0)"}))])],{optional:!0})])])]},changeDetection:0}),t})(),g=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[a.ez]]}),t})()}}]);