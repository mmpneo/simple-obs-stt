import {Injectable}           from '@angular/core';
import {STTStyle, StyleStore} from './style.store';
import {NetworkService}       from "@store/network/network.service";
import {transaction}          from "@datorama/akita";
import {fileOpen}             from "browser-fs-access";
import {HotToastService}      from "@ngneat/hot-toast";
import {migrate_style}        from "@store/style/style.migration";

@Injectable({providedIn: 'root'})
export class StyleService {
  constructor(
    private styleStore: StyleStore,
    private networkService: NetworkService,
    private toast: HotToastService
  ) {
    networkService.messages$.subscribe(m => {
      m.type === 'style' && this.ReceiveFullStyle(m.data);
      m.type === 'style:partial' && this.ReceivePartialStyle(m.data);
    });
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
      const patch = {...json, value: migrate_style(json.value)};
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

  // [section, key, value, valueIndex]
  private SendPartialStyle(data: [string, string, [string, string]]) {
    this.networkService.SendMessage({type: 'style:partial', data})
  }

  private ReceiveFullStyle(styleState: STTStyle) {
    this.styleStore.update(state => {
      state.currentStyle = styleState;
    });
  }

  // [section, key, value, valueIndex]
  private ReceivePartialStyle(data: [keyof STTStyle, keyof STTStyle[keyof STTStyle], [string, string]]) {
    this.styleStore.update(state => {// @ts-ignore
      state.currentStyle[data[0]][data[1]].value = data[2];
    });
  }

  // endregion

  UpdateNormalStyles(styleSectionKey: STTStyleKeys, styleKey: string, styleValue: string, valueIndex: number) {
    this.styleStore.update(state => {
      // @ts-ignore
      if (state.currentStyle[styleSectionKey][styleKey].linked)
      // @ts-ignore
        state.currentStyle[styleSectionKey][styleKey].value = [styleValue, styleValue]
      else
      // @ts-ignore
        state.currentStyle[styleSectionKey][styleKey].value[valueIndex] = styleValue
      // @ts-ignore
      this.SendPartialStyle([styleSectionKey, styleKey, state.currentStyle[styleSectionKey][styleKey].value]);
    });
    this.TryUpdateTemplate();
  }

  UpdateLinkSwitch(section: STTStyleKeys, styleKey: string) {
    this.styleStore.update(state => {
      // @ts-ignore
      state.currentStyle[section][styleKey].linked = !state.currentStyle[section][styleKey].linked;
      // @ts-ignore
      if (!state.currentStyle[section][styleKey].linked)
        return
      // @ts-ignore
        const v = state.currentStyle[section][styleKey].value[0];
      // @ts-ignore
      state.currentStyle[section][styleKey].value = [v,v];
    });
    this.TryUpdateTemplate();
  }
}
type STTStyleKeys = keyof Omit<STTStyle, "version">
