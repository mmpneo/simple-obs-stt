import {Injectable}               from '@angular/core';
import {STTStyle, StyleStore}     from './style.store';
import {NetworkService}           from "@store/network/network.service";
import {fileOpen, FileWithHandle} from "browser-fs-access";
import {HotToastService}          from "@ngneat/hot-toast";
import {migrate_style}            from "@store/style/style.migration";

@Injectable({providedIn: 'root'})
export class StyleService {
  constructor(
    private styleStore: StyleStore,
    private networkService: NetworkService,
    private toastService: HotToastService
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
    let resp: FileWithHandle | null = null;
    try {
      resp = await fileOpen({mimeTypes: ['application/json'], extensions: ['.json']});
    } catch (error) {}
    if (resp) try {
      const txt = await resp.text();
      const json: {name: string, value: STTStyle} = JSON.parse(txt);
      if (!json.name || !json.value)
        return;
      const patch = {...json, value: migrate_style(json.value)};
      this.styleStore.update(state => {state.templates.push(patch)});
      this.toastService.success(`Imported: ${patch.name}`, {theme: 'snackbar', position: 'bottom-right'})
    } catch (error) {throw new Error(error);}
  }

  async ImportAudio() {
    let resp: FileWithHandle | null = null;
    try {
      resp = await fileOpen({mimeTypes: ['application/audio'], extensions: ['.wav', '.mp3', '.ogg']});
    } catch (e) {console.log(e)}
    if (resp) try {
      if (resp.size > 20000){
        this.toastService.error('Audio file is too large', {theme: 'snackbar', position: 'bottom-right'})
        return;
      }
      const buffer  = await resp.arrayBuffer();
      const blob    = new Blob([buffer], {type: resp.type});
      var reader = new FileReader()
      reader.onload = v => {
        let str = v.target?.result;
        if (typeof str !== "string")
          return;
        const [meta, data] = str.split("base64,");
        // str = data;
        const arr: [string, string] = [data, 'base64'];
        this.styleStore.update(state => {
          state.currentStyle.soundStyle.typeClip.value = arr;
        });
        this.SendPartialStyle(['soundStyle', 'typeClip', arr]);
        this.toastService.success('Typing audio updated', {theme: 'snackbar', position: 'bottom-right'})
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      throw new Error(error);
    }

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
    this.toastService.success(`Exported: ${template.name}`, {theme: 'snackbar', position: 'bottom-right'})

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
