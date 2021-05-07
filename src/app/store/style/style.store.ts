import {Injectable}                                 from '@angular/core';
import {selectPersistStateInit, Store, StoreConfig} from '@datorama/akita';
import produce                                      from "immer";
import deepmerge                                    from "deepmerge";

export enum StyleValueType {
  string,
  pixels,
  ms,
  url,
  bool,
  translateX,
  translateY,
  scale,
}

export type StyleValue<T = StyleValueType> = {
  type: T
  value: string
}


export interface STTStyle {
  boxStyle: {
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    backgroundImage: StyleValue<StyleValueType.url>;
    backgroundColor: StyleValue<StyleValueType.string>;
    borderWidth: StyleValue<StyleValueType.pixels>;
    borderColor: StyleValue<StyleValueType.string>;
    borderRadius: StyleValue<StyleValueType.pixels>;
    [key: string]: any
  };
  textStyle: {
    color: StyleValue<StyleValueType.string>;
    fontSize: StyleValue<StyleValueType.pixels>;
    lineHeight: StyleValue<StyleValueType.string>;
    fontWeight: StyleValue<StyleValueType.string>;
    textTransform: StyleValue<StyleValueType.string>;
    top: StyleValue<StyleValueType.pixels>
    bottom: StyleValue<StyleValueType.pixels>
    left: StyleValue<StyleValueType.pixels>
    right: StyleValue<StyleValueType.pixels>
    paddingTop: StyleValue<StyleValueType.pixels>
    paddingBottom: StyleValue<StyleValueType.pixels>
  };
  textStyleComposite: {
    textShadow: {
      x: StyleValue<StyleValueType.pixels>;
      y: StyleValue<StyleValueType.pixels>;
      b: StyleValue<StyleValueType.pixels>;
      color: StyleValue<StyleValueType.string>;
    }
  };
  avatarStyle: {
    order: StyleValue<StyleValueType.string>;
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    backgroundImage: StyleValue<StyleValueType.url>;
    animationName: StyleValue<StyleValueType.string>;
    animationDuration: StyleValue<StyleValueType.ms>;
  },
  avatarStyleComposite: {
    transform: {
      x: StyleValue<StyleValueType.translateX>;
      y: StyleValue<StyleValueType.translateY>;
    }
  }
  globalStyle: {
    hideOnInactivity: StyleValue<StyleValueType.bool>;
    clearOnInactivity: StyleValue<StyleValueType.bool>;
    realtimeTyping: StyleValue<StyleValueType.bool>;
    inactivityTimer: StyleValue<StyleValueType.string>;
  }
}

export interface StyleState {
  currentStyle: STTStyle;
  templates: STTStyle[];
}

export const STYLE_TEMPLATE: STTStyle = {
  boxStyle:             {
    backgroundImage: {type: StyleValueType.url, value: ''},
    width:           {type: StyleValueType.pixels, value: '300'},
    height:          {type: StyleValueType.pixels, value: '100'},
    backgroundColor: {type: StyleValueType.string, value: 'transparent'},
    borderRadius:    {type: StyleValueType.pixels, value: '0'},
    borderWidth:     {type: StyleValueType.pixels, value: '0'},
    borderColor:     {type: StyleValueType.string, value: 'transparent'},
  },
  textStyle:            {
    color:         {type: StyleValueType.string, value: 'white'},
    fontSize:      {type: StyleValueType.pixels, value: '18'},
    lineHeight:    {type: StyleValueType.string, value: '1.2'},
    fontWeight:    {type: StyleValueType.string, value: 'normal'},
    textTransform: {type: StyleValueType.string, value: 'none'},
    top:           {type: StyleValueType.pixels, value: '0'},
    bottom:        {type: StyleValueType.pixels, value: '0'},
    left:          {type: StyleValueType.pixels, value: '10'},
    right:         {type: StyleValueType.pixels, value: '10'},
    paddingTop:    {type: StyleValueType.pixels, value: '0'},
    paddingBottom: {type: StyleValueType.pixels, value: '0'},
  },
  textStyleComposite:   {
    textShadow: {
      x:     {type: StyleValueType.pixels, value: '0'},
      y:     {type: StyleValueType.pixels, value: '0'},
      b:     {type: StyleValueType.pixels, value: '2'},
      color: {type: StyleValueType.string, value: 'black'}
    }
  },
  avatarStyle:          {
    order:             {type: StyleValueType.string, value: '0'},
    width:             {type: StyleValueType.pixels, value: '120'},
    height:            {type: StyleValueType.pixels, value: '120'},
    backgroundImage:   {type: StyleValueType.url, value: ''},
    animationName:     {type: StyleValueType.string, value: 'none'},
    animationDuration: {type: StyleValueType.ms, value: '2000'},
  },
  avatarStyleComposite: {
    transform: {
      x: {type: StyleValueType.translateX, value: '0'},
      y: {type: StyleValueType.translateY, value: '0'}
    }
  },
  globalStyle:          {
    hideOnInactivity:  {type: StyleValueType.bool, value: ''},
    clearOnInactivity: {type: StyleValueType.bool, value: ''},
    realtimeTyping:    {type: StyleValueType.bool, value: '1'},
    inactivityTimer:   {type: StyleValueType.string, value: '5000'},
  }
}

export const STATE_TEMPLATE: StyleState = {
  currentStyle: STYLE_TEMPLATE,
  templates:    []
}


function PatchStyle(style: STTStyle) {
  const currentStyle: any = deepmerge(STYLE_TEMPLATE, style);
  if (currentStyle.avatarStyle.bottom) delete currentStyle.avatarStyle.bottom;
  if (currentStyle.avatarStyle.left) delete currentStyle.avatarStyle.left;
  if (currentStyle.globalStyle.clearOnHide) delete currentStyle.globalStyle.clearOnHide;
  if (currentStyle.globalStyle.alwaysShow) delete currentStyle.globalStyle.alwaysShow;
  if (currentStyle.globalStyle.hideAfter) delete currentStyle.globalStyle.hideAfter;
  return currentStyle;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'style', producerFn: produce})
export class StyleStore extends Store<StyleState> {
  constructor() {
    super(STATE_TEMPLATE);
    selectPersistStateInit().subscribe(value => {
      this.update({
        currentStyle: PatchStyle(this.getValue().currentStyle),
        templates:    this.getValue().templates.map(template => PatchStyle(template))
      });
    })
  }
}
