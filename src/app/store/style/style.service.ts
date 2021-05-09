import {Injectable}                       from '@angular/core';
import {PatchStyle, STTStyle, StyleStore} from './style.store';
import {NetworkService}                   from "@store/network/network.service";
import {transaction}                      from "@datorama/akita";
import {fileOpen, fileSave}               from "browser-fs-access";
import {HotToastService}                  from "@ngneat/hot-toast";

type StyleSectionObject<T extends keyof STTStyle> = Partial<STTStyle[T]>

@Injectable({providedIn: 'root'})
export class StyleService {
  constructor(
    private styleStore: StyleStore,
    private networkService: NetworkService,
    private toast: HotToastService
  ) {
    networkService.messages$.subscribe(m => m.type === 'style' && this.ReceiveFullStyle(m.data))
    networkService.messages$.subscribe(m => m.type === 'style:partial' && this.ReceivePartialStyle(m.data))
    networkService.messages$.subscribe(m => m.type === 'style:com_partial' && this.ReceivePartialCompositeStyle(m.data))
    networkService.onClientConnected$.subscribe(_ => this.SendFullStyle());
  }


  // region templates
  CreateTemplate(name: string) {
    this.styleStore.update(state => {
      state.templates.push({name, value: state.currentStyle});
      state.currentTemplate = state.templates.length - 1;
    })
  }
  SelectTemplate(index: number) {
    this.styleStore.update(state => {
      if (!state.templates[index])
        return;
      state.currentTemplate = index;
      state.currentStyle = {...state.templates[index].value}
    })
    this.SendFullStyle();
  }
  TryUpdateTemplate() {
    this.styleStore.update(state => {
      if (state.currentTemplate === null)
        return;
      state.templates[state.currentTemplate].value = state.currentStyle;
    })
  }

  DeleteTemplate() {
    if (!window.confirm("Remove current template"))
      return;
    this.styleStore.update(state => {
      if (state.currentTemplate === null)
        return;
      state.templates.splice(state.currentTemplate, 1);
      state.currentTemplate = null;
    })
  }

  async ImportTemplate() {
    try {
      const resp = await fileOpen({mimeTypes: ['application/json'], extensions: ['.json']});
      const txt = await resp.text();
      const json: {name: string, value: STTStyle} = JSON.parse(txt);
      if (!json.name || !json.value)
        return;
      const patch = {...json, value: PatchStyle(json.value)};
      this.styleStore.update(state => {state.templates.push(patch)});
      this.toast.success(`Template "${patch.name}" has been imported`)
      // this.SelectTemplate(this.styleStore.getValue().templates.length -1);
    } catch (error) {throw new Error(error);}
  }

  ExportTemplate() {
    const state = this.styleStore.getValue();
    if (state.currentTemplate === null)
      return;
    const template = state.templates[state.currentTemplate];
    const blob = new Blob([JSON.stringify(template)]);
    const blobUrl = URL.createObjectURL(blob);
    // fileSave(blob, {fileName: `${template.name}.json`});
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${template.name}.json`
    a.click();
    URL.revokeObjectURL(blobUrl);
  }
  // endregion

  // region network
  private SendFullStyle() {
    this.networkService.SendMessage({type: 'style', data: this.styleStore.getValue().currentStyle})
  }

  // [section, key, value]
  private SendPartialStyle(data: [string, string, string]) {
    this.networkService.SendMessage({type: 'style:partial', data})
  }

  // [section, key, key, value]
  private SendPartialCompositeStyle(data: [string, string, string, string]) {
    this.networkService.SendMessage({type: 'style:com_partial', data})
  }

  private ReceiveFullStyle(styleState: STTStyle) {
    this.styleStore.update(state => {
      state.currentStyle = styleState;
    });
  }

  // [section, key, value]
  private ReceivePartialStyle(data: [keyof STTStyle, keyof STTStyle[keyof STTStyle], string]) {
    this.styleStore.update(state => {// @ts-ignore
      state.currentStyle[data[0]][data[1]].value = data[2];
    });
  }

  // [section, key, key, value]
  private ReceivePartialCompositeStyle(data: [keyof STTStyle, keyof STTStyle[keyof STTStyle], string, string]) {
    this.styleStore.update(state => { // @ts-ignore
      state.currentStyle[data[0]][data[1]][data[2]].value = data[3];
    });
  }

  // endregion

  @transaction()
  private UpdateNormalStyles(styleSectionKey: string, style: any) {
    this.styleStore.update(state => {
      for (let styleKey in style) { // @ts-ignore
        state.currentStyle[styleSectionKey][styleKey].value = style[styleKey]
        this.SendPartialStyle([styleSectionKey, styleKey, style[styleKey]]);
      }
    });
    this.TryUpdateTemplate();
  }

  @transaction()
  private UpdateCompositeStyles(sectionKey: string, compositeKey: string, value: any) {
    this.styleStore.update(state => {
      for (let styleKey in value) { // @ts-ignore
        state.currentStyle[sectionKey][compositeKey][styleKey].value = value[styleKey];
        this.SendPartialCompositeStyle([sectionKey, compositeKey, styleKey, value[styleKey]]);
      }
    });
    this.TryUpdateTemplate();
  }

  UpdateTextStyle   = (style: Partial<StyleSectionObject<"textStyle">>) => this.UpdateNormalStyles("textStyle", style);
  UpdateBoxStyle    = (style: Partial<StyleSectionObject<"boxStyle">>) => this.UpdateNormalStyles("boxStyle", style);
  UpdateAvatarStyle = (style: Partial<StyleSectionObject<"avatarStyle">>) => this.UpdateNormalStyles("avatarStyle", style);
  UpdateSoundStyle = (style: Partial<StyleSectionObject<"soundStyle">>) => this.UpdateNormalStyles("soundStyle", style);
  UpdateGlobalStyle = (style: Partial<StyleSectionObject<"globalStyle">>) => this.UpdateNormalStyles("globalStyle", style);

  UpdateTextComposite   = (compositeKey: keyof STTStyle["textStyleComposite"], value: any) => this.UpdateCompositeStyles('textStyleComposite', compositeKey, value);
  UpdateAvatarComposite = (compositeKey: keyof STTStyle["avatarStyleComposite"], value: any) => this.UpdateCompositeStyles('avatarStyleComposite', compositeKey, value);
}
