(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{h9Jz:function(t,e,n){"use strict";n.r(e),n.d(e,"ServerModule",function(){return kt});var s=n("ofXK"),i=n("fXoL"),r=n("w9xF"),o=n("cLXs"),a=n("4ZtF"),l=n("lJxs"),c=n("1Xxu"),h=n("mrSG");let u=(()=>{let t=class extends a.b{constructor(){super({key:""})}};return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=i.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t=Object(h.b)([Object(a.c)({name:"application"})],t),t})(),d=(()=>{class t extends a.a{constructor(t,e,n){super(t),this.store=t,this.networkQuery=e,this.speechQuery=n,this.connectionState$=Object(a.e)([this.networkQuery.state$,this.speechQuery.state$]).pipe(Object(l.a)(([t,e])=>t.peerConnectionState===c.a.Connected&&e.speechServiceState===c.a.Connected?c.a.Connected:t.peerConnectionState===c.a.Disconnected&&e.speechServiceState===c.a.Disconnected?c.a.Disconnected:c.a.Connecting))}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(u),i.Rb(r.a),i.Rb(o.a))},t.\u0275prov=i.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=n("Dvf2"),_=n("3tnd"),g=n("aWJ7");let f=(()=>{class t{constructor(t,e,n,s){this.applicationStore=t,this.networkService=e,this.speechService=n,this.networkStore=s,this.ChangeHostId=t=>this.networkStore.update({hostID:t})}CopyLink(){var t;let e=location.href.split("/").slice(0,-1).join("/");navigator.clipboard.writeText(`${e}/client/${null===(t=this.networkService)||void 0===t?void 0:t.getPeerId()}`)}StartHost(){return Object(h.a)(this,void 0,void 0,function*(){try{yield this.speechService.InitHostSpeech()}catch(t){throw new Error(t)}try{yield this.networkService.InitServer()}catch(t){throw new Error(t)}})}StopHost(){this.speechService.Stop(),this.networkService.Stop()}StartClient(){}}return t.\u0275fac=function(e){return new(e||t)(i.Rb(u),i.Rb(p.a),i.Rb(_.a),i.Rb(g.a))},t.\u0275prov=i.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var b=n("Cfvw"),y=n("HDdC"),m=n("DH7j"),C=n("XoHu");function v(t,e){return new y.a(n=>{const s=t.length;if(0===s)return void n.complete();const i=new Array(s);let r=0,o=0;for(let a=0;a<s;a++){const l=Object(b.a)(t[a]);let c=!1;n.add(l.subscribe({next:t=>{c||(c=!0,o++),i[a]=t},error:t=>n.error(t),complete:()=>{r++,r!==s&&c||(o===s&&n.next(e?e.reduce((t,e,n)=>(t[e]=i[n],t),{}):i),n.complete())}}))}})}class V{}const w=new i.r("NgValueAccessor"),O={provide:w,useExisting:Object(i.T)(()=>A),multi:!0},S=new i.r("CompositionEventMode");let A=(()=>{class t{constructor(t,e,n){this._renderer=t,this._elementRef=e,this._compositionMode=n,this.onChange=t=>{},this.onTouched=()=>{},this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function(){const t=Object(s.s)()?Object(s.s)().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}())}writeValue(t){this._renderer.setProperty(this._elementRef.nativeElement,"value",null==t?"":t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(i.E),i.Ib(i.l),i.Ib(S,8))},t.\u0275dir=i.Db({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(t,e){1&t&&i.Vb("input",function(t){return e._handleInput(t.target.value)})("blur",function(){return e.onTouched()})("compositionstart",function(){return e._compositionStart()})("compositionend",function(t){return e._compositionEnd(t.target.value)})},features:[i.xb([O])]}),t})();const E=new i.r("NgValidators"),k=new i.r("NgAsyncValidators");function M(t){return null!=t}function D(t){const e=Object(i.pb)(t)?Object(b.a)(t):t;return Object(i.ob)(e),e}function j(t){let e={};return t.forEach(t=>{e=null!=t?Object.assign(Object.assign({},e),t):e}),0===Object.keys(e).length?null:e}function x(t,e){return e.map(e=>e(t))}function I(t){return t.map(t=>function(t){return!t.validate}(t)?t:e=>t.validate(e))}function T(t){return null!=t?function(t){if(!t)return null;const e=t.filter(M);return 0==e.length?null:function(t){return j(x(t,e))}}(I(t)):null}function P(t){return null!=t?function(t){if(!t)return null;const e=t.filter(M);return 0==e.length?null:function(t){return function(...t){if(1===t.length){const e=t[0];if(Object(m.a)(e))return v(e,null);if(Object(C.a)(e)&&Object.getPrototypeOf(e)===Object.prototype){const t=Object.keys(e);return v(t.map(t=>e[t]),t)}}if("function"==typeof t[t.length-1]){const e=t.pop();return v(t=1===t.length&&Object(m.a)(t[0])?t[0]:t,null).pipe(Object(l.a)(t=>e(...t)))}return v(t,null)}(x(t,e).map(D)).pipe(Object(l.a)(j))}}(I(t)):null}function N(t,e){return null===t?[e]:Array.isArray(t)?[...t,e]:[t,e]}let F=(()=>{class t{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=T(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=P(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=i.Db({type:t}),t})(),U=(()=>{class t extends F{get formDirective(){return null}get path(){return null}}return t.\u0275fac=function(e){return R(e||t)},t.\u0275dir=i.Db({type:t,features:[i.vb]}),t})();const R=i.Pb(U);class $ extends F{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}let L=(()=>{class t extends class{constructor(t){this._cd=t}is(t){var e,n;return!!(null===(n=null===(e=this._cd)||void 0===e?void 0:e.control)||void 0===n?void 0:n[t])}}{constructor(t){super(t)}}return t.\u0275fac=function(e){return new(e||t)(i.Ib($,2))},t.\u0275dir=i.Db({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,e){2&t&&i.Ab("ng-untouched",e.is("untouched"))("ng-touched",e.is("touched"))("ng-pristine",e.is("pristine"))("ng-dirty",e.is("dirty"))("ng-valid",e.is("valid"))("ng-invalid",e.is("invalid"))("ng-pending",e.is("pending"))},features:[i.vb]}),t})();function H(t,e){t.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function W(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function Z(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const B="VALID",Q="INVALID",J="PENDING",G="DISABLED";function X(t){return(q(t)?t.validators:t)||null}function K(t){return Array.isArray(t)?T(t):t||null}function z(t,e){return(q(e)?e.asyncValidators:t)||null}function Y(t){return Array.isArray(t)?P(t):t||null}function q(t){return null!=t&&!Array.isArray(t)&&"object"==typeof t}class tt{constructor(t,e){this._hasOwnPendingAsyncValidator=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._rawValidators=t,this._rawAsyncValidators=e,this._composedValidatorFn=K(this._rawValidators),this._composedAsyncValidatorFn=Y(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===B}get invalid(){return this.status===Q}get pending(){return this.status==J}get disabled(){return this.status===G}get enabled(){return this.status!==G}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._rawValidators=t,this._composedValidatorFn=K(t)}setAsyncValidators(t){this._rawAsyncValidators=t,this._composedAsyncValidatorFn=Y(t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(t=>{t.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(t=>{t.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=J,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=G,this.errors=null,this._forEachChild(e=>{e.disable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=B,this._forEachChild(e=>{e.enable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),this.status!==B&&this.status!==J||this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?G:B}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=J,this._hasOwnPendingAsyncValidator=!0;const e=D(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(e=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(e,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){return function(t,e,n){if(null==e)return null;if(Array.isArray(e)||(e=e.split(".")),Array.isArray(e)&&0===e.length)return null;let s=t;return e.forEach(t=>{s=s instanceof nt?s.controls.hasOwnProperty(t)?s.controls[t]:null:s instanceof st&&s.at(t)||null}),s}(this,t)}getError(t,e){const n=e?this.get(e):this;return n&&n.errors?n.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new i.n,this.statusChanges=new i.n}_calculateStatus(){return this._allControlsDisabled()?G:this.errors?Q:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(J)?J:this._anyControlsHaveStatus(Q)?Q:B}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_isBoxedValue(t){return"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"value"in t&&"disabled"in t}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){q(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}}class et extends tt{constructor(t=null,e,n){super(X(e),z(n,e)),this._onChange=[],this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(t=>t(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=null,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Z(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Z(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){this._isBoxedValue(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}}class nt extends tt{constructor(t,e,n){super(X(e),z(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e){this.registerControl(t,e),this.updateValueAndValidity(),this._onCollectionChange()}removeControl(t){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity(),this._onCollectionChange()}setControl(t,e){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity(),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){this._checkAllValuesPresent(t),Object.keys(t).forEach(n=>{this._throwIfControlMissing(n),this.controls[n].setValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(Object.keys(t).forEach(n=>{this.controls[n]&&this.controls[n].patchValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e instanceof et?e.value:e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(t,e)=>!!e._syncPendingControls()||t);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!Object.keys(this.controls).length)throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.controls[t])throw new Error(`Cannot find form control with name: ${t}.`)}_forEachChild(t){Object.keys(this.controls).forEach(e=>{const n=this.controls[e];n&&t(n,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(const e of Object.keys(this.controls)){const n=this.controls[e];if(this.contains(e)&&t(n))return!0}return!1}_reduceValue(){return this._reduceChildren({},(t,e,n)=>((e.enabled||this.disabled)&&(t[n]=e.value),t))}_reduceChildren(t,e){let n=t;return this._forEachChild((t,s)=>{n=e(n,t,s)}),n}_allControlsDisabled(){for(const t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control with name: '${n}'.`)})}}class st extends tt{constructor(t,e,n){super(X(e),z(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}at(t){return this.controls[t]}push(t){this.controls.push(t),this._registerControl(t),this.updateValueAndValidity(),this._onCollectionChange()}insert(t,e){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity()}removeAt(t){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),this.updateValueAndValidity()}setControl(t,e){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),e&&(this.controls.splice(t,0,e),this._registerControl(e)),this.updateValueAndValidity(),this._onCollectionChange()}get length(){return this.controls.length}setValue(t,e={}){this._checkAllValuesPresent(t),t.forEach((t,n)=>{this._throwIfControlMissing(n),this.at(n).setValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(t.forEach((t,n)=>{this.at(n)&&this.at(n).patchValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t=[],e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this.controls.map(t=>t instanceof et?t.value:t.getRawValue())}clear(){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity())}_syncPendingControls(){let t=this.controls.reduce((t,e)=>!!e._syncPendingControls()||t,!1);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!this.controls.length)throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.at(t))throw new Error(`Cannot find form control at index ${t}`)}_forEachChild(t){this.controls.forEach((e,n)=>{t(e,n)})}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value)}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t))}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control at index: ${n}.`)})}_allControlsDisabled(){for(const t of this.controls)if(t.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)}}const it={provide:$,useExisting:Object(i.T)(()=>ot)},rt=(()=>Promise.resolve(null))();let ot=(()=>{class t extends ${constructor(t,e,n,s){super(),this.control=new et,this._registered=!1,this.update=new i.n,this._parent=t,this._setValidators(e),this._setAsyncValidators(n),this.valueAccessor=function(t,e){if(!e)return null;let n,s,i;return Array.isArray(e),e.forEach(t=>{t.constructor===A?n=t:Object.getPrototypeOf(t.constructor)===V?s=t:i=t}),i||s||n||null}(0,s)}ngOnChanges(t){this._checkForErrors(),this._registered||this._setUpControl(),"isDisabled"in t&&this._updateDisabled(t),function(t,e){if(!t.hasOwnProperty("model"))return!1;const n=t.model;return!!n.isFirstChange()||!Object.is(e,n.currentValue)}(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._parent?[...this._parent.path,this.name]:[this.name]}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){var t,e;(function(t,e,n){const s=function(t){return t._rawValidators}(t);null!==e.validator?t.setValidators(N(s,e.validator)):"function"==typeof s&&t.setValidators([s]);const i=function(t){return t._rawAsyncValidators}(t);null!==e.asyncValidator?t.setAsyncValidators(N(i,e.asyncValidator)):"function"==typeof i&&t.setAsyncValidators([i]);{const n=()=>t.updateValueAndValidity();H(e._rawValidators,n),H(e._rawAsyncValidators,n)}})(t=this.control,e=this),e.valueAccessor.writeValue(t.value),function(t,e){e.valueAccessor.registerOnChange(n=>{t._pendingValue=n,t._pendingChange=!0,t._pendingDirty=!0,"change"===t.updateOn&&W(t,e)})}(t,e),function(t,e){const n=(t,n)=>{e.valueAccessor.writeValue(t),n&&e.viewToModelUpdate(t)};t.registerOnChange(n),e._registerOnDestroy(()=>{t._unregisterOnChange(n)})}(t,e),function(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,"blur"===t.updateOn&&t._pendingChange&&W(t,e),"submit"!==t.updateOn&&t.markAsTouched()})}(t,e),function(t,e){if(e.valueAccessor.setDisabledState){const n=t=>{e.valueAccessor.setDisabledState(t)};t.registerOnDisabledChange(n),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(n)})}}(t,e),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(t){rt.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1})})}_updateDisabled(t){const e=t.isDisabled.currentValue,n=""===e||e&&"false"!==e;rt.then(()=>{n&&!this.control.disabled?this.control.disable():!n&&this.control.disabled&&this.control.enable()})}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(U,9),i.Ib(E,10),i.Ib(k,10),i.Ib(w,10))},t.\u0275dir=i.Db({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[i.xb([it]),i.vb,i.wb]}),t})(),at=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Gb({type:t}),t.\u0275inj=i.Fb({}),t})();const lt={provide:w,useExisting:Object(i.T)(()=>ht),multi:!0};function ct(t,e){return null==t?`${e}`:(e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let ht=(()=>{class t extends V{constructor(t,e){super(),this._renderer=t,this._elementRef=e,this._optionMap=new Map,this._idCounter=0,this.onChange=t=>{},this.onTouched=()=>{},this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){this.value=t;const e=this._getOptionId(t);null==e&&this._renderer.setProperty(this._elementRef.nativeElement,"selectedIndex",-1);const n=ct(e,t);this._renderer.setProperty(this._elementRef.nativeElement,"value",n)}registerOnChange(t){this.onChange=e=>{this.value=this._getOptionValue(e),t(this.value)}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e),t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e):t}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(i.E),i.Ib(i.l))},t.\u0275dir=i.Db({type:t,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(t,e){1&t&&i.Vb("change",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[i.xb([lt]),i.vb]}),t})(),ut=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption())}set ngValue(t){null!=this._select&&(this._select._optionMap.set(this.id,t),this._setElementValue(ct(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._setElementValue(t),this._select&&this._select.writeValue(this._select.value)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(i.l),i.Ib(i.E),i.Ib(ht,9))},t.\u0275dir=i.Db({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})();const dt={provide:w,useExisting:Object(i.T)(()=>_t),multi:!0};function pt(t,e){return null==t?`${e}`:("string"==typeof e&&(e=`'${e}'`),e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let _t=(()=>{class t extends V{constructor(t,e){super(),this._renderer=t,this._elementRef=e,this._optionMap=new Map,this._idCounter=0,this.onChange=t=>{},this.onTouched=()=>{},this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){let e;if(this.value=t,Array.isArray(t)){const n=t.map(t=>this._getOptionId(t));e=(t,e)=>{t._setSelected(n.indexOf(e.toString())>-1)}}else e=(t,e)=>{t._setSelected(!1)};this._optionMap.forEach(e)}registerOnChange(t){this.onChange=e=>{const n=[];if(void 0!==e.selectedOptions){const t=e.selectedOptions;for(let e=0;e<t.length;e++){const s=t.item(e),i=this._getOptionValue(s.value);n.push(i)}}else{const t=e.options;for(let e=0;e<t.length;e++){const s=t.item(e);if(s.selected){const t=this._getOptionValue(s.value);n.push(t)}}}this.value=n,t(n)}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_registerOption(t){const e=(this._idCounter++).toString();return this._optionMap.set(e,t),e}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e)._value,t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e)._value:t}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(i.E),i.Ib(i.l))},t.\u0275dir=i.Db({type:t,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(t,e){1&t&&i.Vb("change",function(t){return e.onChange(t.target)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[i.xb([dt]),i.vb]}),t})(),gt=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){null!=this._select&&(this._value=t,this._setElementValue(pt(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(pt(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(i.l),i.Ib(i.E),i.Ib(_t,9))},t.\u0275dir=i.Db({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})(),ft=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Gb({type:t}),t.\u0275inj=i.Fb({imports:[[at]]}),t})(),bt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Gb({type:t}),t.\u0275inj=i.Fb({imports:[ft]}),t})();function yt(t,e){if(1&t&&(i.Nb(0,"option",14),i.jc(1),i.Mb()),2&t){const t=e.$implicit;i.dc("value",e.index),i.yb(1),i.kc(t[0])}}function mt(t,e){if(1&t&&(i.Nb(0,"option",14),i.jc(1),i.Mb()),2&t){const t=e.$implicit;i.dc("value",e.index),i.yb(1),i.kc(t[1])}}function Ct(t,e){if(1&t){const t=i.Ob();i.Nb(0,"select",7),i.Vb("ngModelChange",function(e){return i.fc(t),i.Zb(3).speechService.SelectDialect(e)}),i.Nb(1,"option",8),i.jc(2,"Choose your Dialect"),i.Mb(),i.ic(3,mt,2,2,"option",9),i.ac(4,"slice"),i.Mb()}if(2&t){const t=i.Zb(2).ngIf;i.dc("ngModel",t.selectedLanguage[1]),i.yb(1),i.dc("disabled",!0),i.yb(2),i.dc("ngForOf",i.cc(4,3,t.languages[t.selectedLanguage[0]],1))}}function vt(t,e){if(1&t){const t=i.Ob();i.Nb(0,"div",15),i.Nb(1,"input",16),i.Vb("ngModelChange",function(e){return i.fc(t),i.Zb(3).applicationService.ChangeHostId(e)}),i.Mb(),i.Nb(2,"button",17),i.Vb("click",function(){return i.fc(t),i.Zb(3).applicationService.StartHost()}),i.jc(3,"Start"),i.Mb(),i.Mb()}if(2&t){const t=e.ngIf;i.yb(1),i.dc("ngModel",t.hostID)}}function Vt(t,e){if(1&t){const t=i.Ob();i.Lb(0),i.Nb(1,"select",7),i.Vb("ngModelChange",function(e){return i.fc(t),i.Zb(2).speechService.SelectLanguage(e)}),i.Nb(2,"option",8),i.jc(3,"Choose your language"),i.Mb(),i.ic(4,yt,2,2,"option",9),i.Mb(),i.ic(5,Ct,5,6,"select",10),i.ic(6,vt,4,1,"div",11),i.ac(7,"async"),i.Nb(8,"small",12),i.jc(9,"* Use this field if you don't want to change OBS browser source URL everytime. "),i.Jb(10,"br"),i.jc(11,' Please, for your own security, do not use stupid shit like "mystream-123". '),i.Nb(12,"a",13),i.jc(13,"Use Generators"),i.Mb(),i.jc(14,". "),i.Jb(15,"br"),i.jc(16," Leave field empty for one-time session. "),i.Mb(),i.Kb()}if(2&t){const t=i.Zb().ngIf,e=i.Zb();i.yb(1),i.dc("ngModel",t.selectedLanguage[0]),i.yb(1),i.dc("disabled",!0),i.yb(2),i.dc("ngForOf",t.languages),i.yb(1),i.dc("ngIf",t.languages[t.selectedLanguage[0]].length>2),i.yb(1),i.dc("ngIf",i.bc(7,5,e.networkQuery.state$))}}function wt(t,e){1&t&&(i.Lb(0),i.jc(1," Connecting "),i.Kb())}function Ot(t,e){if(1&t){const t=i.Ob();i.Nb(0,"div",18),i.Yb(),i.Nb(1,"svg",19),i.Jb(2,"path",20),i.Mb(),i.Xb(),i.Nb(3,"div",21),i.jc(4),i.Mb(),i.Nb(5,"button",22),i.Vb("click",function(){return i.fc(t),i.Zb(2).applicationService.StopHost()}),i.jc(6,"Stop server"),i.Mb(),i.Nb(7,"button",23),i.Vb("click",function(){return i.fc(t),i.Zb(2).applicationService.CopyLink()}),i.jc(8,"Copy link"),i.Mb(),i.Mb()}if(2&t){const t=i.Zb().ngIf;i.yb(4),i.kc(t.speechValue)}}function St(t,e){if(1&t&&(i.Nb(0,"div",1),i.Nb(1,"div",2),i.Nb(2,"h1",3),i.jc(3,"OBS STT"),i.Mb(),i.Lb(4,4),i.ac(5,"async"),i.ic(6,Vt,17,7,"ng-container",5),i.ic(7,wt,2,0,"ng-container",5),i.ic(8,Ot,9,1,"div",6),i.Kb(),i.Mb(),i.Mb()),2&t){const t=i.Zb();i.yb(4),i.dc("ngSwitch",i.bc(5,4,t.applicationQuery.connectionState$)),i.yb(2),i.dc("ngSwitchCase",0),i.yb(1),i.dc("ngSwitchCase",1),i.yb(1),i.dc("ngSwitchCase",2)}}let At=(()=>{class t{constructor(t,e,n,s,i){this.networkQuery=t,this.speechQuery=e,this.applicationQuery=n,this.applicationService=s,this.speechService=i}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)(i.Ib(r.a),i.Ib(o.a),i.Ib(d),i.Ib(f),i.Ib(_.a))},t.\u0275cmp=i.Cb({type:t,selectors:[["app-server"]],decls:2,vars:3,consts:[["class","w-screen bg-base-100 mx-auto px-4 flex flex-col flex-1 text-base-content justify-center items-center",4,"ngIf"],[1,"w-screen","bg-base-100","mx-auto","px-4","flex","flex-col","flex-1","text-base-content","justify-center","items-center"],[1,"flex","flex-col","w-72"],[1,"font-bold","text-5xl","mb-8"],[3,"ngSwitch"],[4,"ngSwitchCase"],["class","flex flex-col justify-center",4,"ngSwitchCase"],[1,"select","select-bordered","w-full","max-w-xs","mb-2",3,"ngModel","ngModelChange"],[3,"disabled"],[3,"value",4,"ngFor","ngForOf"],["class","select select-bordered w-full max-w-xs mb-2",3,"ngModel","ngModelChange",4,"ngIf"],["class","flex space-x-2 my-2",4,"ngIf"],[1,"text-base-content"],["href","https://www.uuidgenerator.net/version4/","target","_blank",1,"underline"],[3,"value"],[1,"flex","space-x-2","my-2"],["type","password","autocomplete","off","placeholder","* OBS browser source",1,"w-full","input","input-bordered",3,"ngModel","ngModelChange"],[1,"btn","btn-primary",3,"click"],[1,"flex","flex-col","justify-center"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24","stroke","currentColor",1,"text-error","self-center","h-24","w-24","mb-8"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"],["id","stt-value",1,"h-48","self-center","w-96","bg-base-200","mb-8","p-4","rounded-md","border-2","border-base-300"],[1,"btn","mb-4",3,"click"],[1,"btn","btn-outline",3,"click"]],template:function(t,e){1&t&&(i.ic(0,St,9,6,"div",0),i.ac(1,"async")),2&t&&i.dc("ngIf",i.bc(1,1,e.speechQuery.state$))},directives:[s.j,s.k,s.l,ht,L,ot,ut,gt,s.i,A],pipes:[s.b,s.o],encapsulation:2,changeDetection:0}),t})();var Et=n("tyNb");let kt=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i.Gb({type:t}),t.\u0275inj=i.Fb({imports:[[s.c,Et.b.forChild([{path:"",component:At}]),bt]]}),t})()}}]);