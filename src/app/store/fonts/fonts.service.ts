import {Injectable}                from '@angular/core';
import {FontsStore, GoogleFont}    from './fonts.store';
import {distinctUntilChanged, map} from "rxjs/operators";
import {StyleQuery}                from "@store/style/style.query";

@Injectable({providedIn: 'root'})
export class FontsService {
  constructor(
    private fontsStore: FontsStore,
    private styleQuery: StyleQuery
  ) {}

  // too big for akita
  public fontsMap: { [letter: string]: GoogleFont[] } = {};

  async LoadFonts() {
    this.fontsMap = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((obj, letter) => ({...obj, [letter]: []}), {});

    try {
      //limited to 10k calls per day, careful
      const resp = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBLnmSeeiFBd2OQrizWjuYHTIFDm8XwL6k');
      const json: {items: GoogleFont[]} = await resp.json();
      if (!json.items?.length)
        return;

      for (let i = 0; i < json.items.length; i++) {
        const letter = json.items[i].family[0]?.toLocaleLowerCase();
        this.fontsMap[letter] && this.fontsMap[letter].push(json.items[i]);
      }

      //Load font on style update
      this.styleQuery.current$.pipe(
        map(current => current?.textStyle.fontFamily?.value[0]),
        distinctUntilChanged()
      ).subscribe(fontFamily => {
        this.SelectFont(fontFamily.toString() || '')
      })
    } catch (error) {
      // block initializer
      throw new Error("Cannot load google fonts");
    }
  }

  public SelectFont(fontFamily: string) {
    if (!fontFamily)
      return;

    console.log('select font', fontFamily);

    // select font data by first letter -> find in array
    const fontData: GoogleFont | null = this.fontsMap[fontFamily[0].toLocaleLowerCase()]?.find(f => f.family === fontFamily) || null;

    if (!fontData)
      return;
    let url             = "https://fonts.googleapis.com/css2?family="
    const hasItalic     = !!fontData.files.italic;
    url += fontData.family.replace(/ /g, "+");
    let filteredWeights = Array.from(new Set(fontData.variants.map(wght => parseInt(wght)).filter(v => !isNaN(v))));
    if (fontData.variants.length > 1 && hasItalic) {
      url += `:ital,wght@`;
      let weights: string[] = [];
      for (let weight of filteredWeights)
        weights.push(`0,${weight}`);
      for (let weight of filteredWeights)
        weights.push(`1,${weight}`);
      url += weights.join(';');
    }
    else if (fontData.variants.length > 1)
      url += `:wght@${filteredWeights.join(';')}`;

    url += `&display=swap`;

    // this will inject font css
    const linkElement = document.createElement('link');
    linkElement.href  = url;
    linkElement.rel   = 'stylesheet';
    linkElement.type  = 'text/css';
    document.body.appendChild(linkElement);
  }

}
