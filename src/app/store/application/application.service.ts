import {Injectable}                   from '@angular/core';
import {ApplicationStore, GoogleFont} from './application.store';
import {NetworkService}               from "@store/network/network.service";
import {SpeechService}                from "@store/speech/speech.service";
import {NetworkMode, NetworkStore}    from "@store/network/network.store";
import {NetworkQuery}                 from "@store/network/network.query";
import {HotToastService}              from "@ngneat/hot-toast";
import {environment}                  from "../../../environments/environment";
import {StyleQuery}                from "@store/style/style.query";
import {distinctUntilChanged, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ApplicationService {
  constructor(
    private applicationStore: ApplicationStore,
    private networkService: NetworkService,
    private networkQuery: NetworkQuery,
    private networkStore: NetworkStore,
    private speechService: SpeechService,
    private styleQuery: StyleQuery
    // private toast: HotToastService
  ) {
  }

  // too big for akita
  public fontsMap: {[letter: string]: GoogleFont[]} = {};

  public CopyLink() {
    const isLocal = this.networkQuery.getValue().networkMode === NetworkMode.localhost;
    let url       = isLocal ? environment.localhostClientPath : environment.remoteClientPath;
    url           = `${url}/client/${this.networkService?.getPeerId()}/${isLocal ? 'local' : ''}`
    navigator.clipboard.writeText(url);
  }

  public async StartHost() {
    try {
      await this.speechService.StartHost();
      try {
        await this.networkService.StartHost();
      } catch (error) {
        this.speechService.Stop();
        throw new Error(error.message);
      }
    } catch (error) {
      // this.toast.error(error.message, {position: "bottom-right"})
      console.log(error);
    }
  }

  public StopHost() {
    this.speechService.Stop()
    this.networkService.Stop()
  }

  public async SelectFont(fontFamily: string) {
    console.log('font', fontFamily);
    if (!fontFamily)
      return;
    const fontData = this.fontsMap[fontFamily[0].toLocaleLowerCase()]?.find(f => f.family === fontFamily) || null;

    if (!fontData)
      return;
    let url             = "https://fonts.googleapis.com/css2?family="
    const hasItalic     = !!fontData.files.italic;
    url += fontData.family.replace(/ /g, "+");
    let filteredWeights = Array.from(new Set(fontData.variants.map(wght => parseInt(wght)).filter(v => !isNaN(v))));
    if (fontData.variants.length > 1 && hasItalic) {
      let firstTuple        = ['ital', 'wght'];
      url += `:${firstTuple.join(',')}@`;
      let weights: string[] = [];
      for (let w of filteredWeights)
        weights.push(`0,${w}`);
      if (hasItalic) for (let w of filteredWeights)
        weights.push(`1,${w}`);
      url += weights.join(';');
    }
    else if (fontData.variants.length > 1)
      url += `:wght@${filteredWeights.join(';')}`

    url += `&display=swap`

    const linkElement = document.createElement('link');
    linkElement.href  = url;
    linkElement.rel   = 'stylesheet';
    linkElement.type  = 'text/css';
    document.body.appendChild(linkElement);
  }

  async LoadFonts() {
    this.fontsMap = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((obj, letter) => ({...obj, [letter]: []}), {});
    try {
      const resp = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBLnmSeeiFBd2OQrizWjuYHTIFDm8XwL6k');
      const json: {items: GoogleFont[]} = await resp.json();
      if (!json.items?.length)
        return;

      for (let i = 0; i < json.items.length; i++) {
        const letter = json.items[i].family[0].toLocaleLowerCase();
        this.fontsMap[letter] && this.fontsMap[letter].push(json.items[i])
      }

      //Load font on style update
      this.styleQuery.current$.pipe(
        map(current => current?.textStyle.fontFamily?.value),
        distinctUntilChanged()
      ).subscribe(fontFamily => {
        this.SelectFont(fontFamily || '')
      })
    } catch (error) {
      throw new Error("Cannot load google fonts");
    }
  }

}
