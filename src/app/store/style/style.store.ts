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
  logic,// system type for stt-renderer
  number,
}

type ValueType<T> = T extends StyleValueType.number ? number : string;

export type StyleValue<T = StyleValueType, V = ValueType<T>> =
  {
    type: T,
    value: V
  }

export type CustomStyleFn = (state: STTStyle, elementStyle: any, calculatedValue: string | number) => void;

// override style applying with side effects
export const CUSTOM_STYLE_LOGIC: { [sectionKey: string]: { [styleKey: string]: CustomStyleFn } } = {
  boxStyle:  {
    // based on boxStyle.heightMode keep height fixed or minimized with max height
    height: (state, elementStyle, calculatedValue) => {
      if (state.boxStyle.heightMode.value === 'grow') {
        elementStyle.maxHeight = calculatedValue;
        elementStyle.height    = 'auto';
      }
      else {
        elementStyle.maxHeight = 'none';
        elementStyle.height    = calculatedValue;
      }
    }
  },
  textStyle: {
    right: (state, elementStyle, value) => {
      const isFixed         = state.boxStyle.heightMode.value === 'fixed';
      elementStyle.position = isFixed ? 'absolute' : 'relative';
      elementStyle.right    = isFixed ? value : 0;
      elementStyle.left     = isFixed ? elementStyle.left : 0;
      elementStyle.bottom   = isFixed ? elementStyle.bottom : 0;
      elementStyle.top      = isFixed ? elementStyle.top : 0;
    }
  }
}

export interface STTStyle {
  boxStyle: {
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    heightMode: StyleValue<StyleValueType.logic, 'grow' | 'fixed'>;
    backgroundImage: StyleValue<StyleValueType.url>;
    backgroundColor: StyleValue<StyleValueType.string>;
    borderWidth: StyleValue<StyleValueType.pixels>;
    borderColor: StyleValue<StyleValueType.string>;
    borderRadius: StyleValue<StyleValueType.pixels>;
    [key: string]: any
  };
  textStyle: {
    fontFamily: StyleValue<StyleValueType.string>;
    color: StyleValue<StyleValueType.string>;
    fontSize: StyleValue<StyleValueType.pixels>;
    lineHeight: StyleValue<StyleValueType.string>;
    fontWeight: StyleValue<StyleValueType.string>;
    textTransform: StyleValue<StyleValueType.string>;
    justifyContent: StyleValue<StyleValueType.string>;
    alignItems: StyleValue<StyleValueType.string>;
    top: StyleValue<StyleValueType.pixels>
    bottom: StyleValue<StyleValueType.pixels>
    left: StyleValue<StyleValueType.pixels>
    right: StyleValue<StyleValueType.pixels>
    // padding
    paddingTop: StyleValue<StyleValueType.pixels>
    paddingBottom: StyleValue<StyleValueType.pixels>
    paddingLeft: StyleValue<StyleValueType.pixels>
    paddingRight: StyleValue<StyleValueType.pixels>
    // animation
    scaleMin: StyleValue<StyleValueType.number>
    scaleMax: StyleValue<StyleValueType.number>
    durationMin: StyleValue<StyleValueType.number>
    durationMax: StyleValue<StyleValueType.number>
    rotationMin: StyleValue<StyleValueType.number>
    rotationMax: StyleValue<StyleValueType.number>
    translationXMin: StyleValue<StyleValueType.number>
    translationXMax: StyleValue<StyleValueType.number>
    translationYMin: StyleValue<StyleValueType.number>
    translationYMax: StyleValue<StyleValueType.number>

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
  },
  soundStyle: {
    volume: StyleValue<StyleValueType.string>
  },
  globalStyle: {
    hideOnInactivity: StyleValue<StyleValueType.bool>;
    clearOnInactivity: StyleValue<StyleValueType.bool>;
    realtimeTyping: StyleValue<StyleValueType.bool>;
    inactivityTimer: StyleValue<StyleValueType.string>;
  }
}

export interface StyleState {
  currentStyle: STTStyle;
  templates: { name: string, value: STTStyle }[];
  currentTemplate: number | null
}

export const STYLE_TEMPLATE: STTStyle = {
  boxStyle:             {
    backgroundImage: {type: StyleValueType.url, value: ''},
    width:           {type: StyleValueType.pixels, value: '300'},
    height:          {type: StyleValueType.pixels, value: '100'},
    heightMode:      {type: StyleValueType.logic, value: 'fixed'},
    backgroundColor: {type: StyleValueType.string, value: 'transparent'},
    borderRadius:    {type: StyleValueType.pixels, value: '0'},
    borderWidth:     {type: StyleValueType.pixels, value: '0'},
    borderColor:     {type: StyleValueType.string, value: 'transparent'},
  },
  textStyle:            {
    fontFamily:     {type: StyleValueType.string, value: 'Roboto'},
    color:          {type: StyleValueType.string, value: 'white'},
    fontSize:       {type: StyleValueType.pixels, value: '18'},
    lineHeight:     {type: StyleValueType.string, value: '1.2'},
    fontWeight:     {type: StyleValueType.string, value: '500'},
    textTransform:  {type: StyleValueType.string, value: 'none'},
    justifyContent: {type: StyleValueType.string, value: 'flex-start'},
    alignItems:     {type: StyleValueType.string, value: 'flex-start'},
    top:            {type: StyleValueType.pixels, value: '0'},
    bottom:         {type: StyleValueType.pixels, value: '0'},
    left:           {type: StyleValueType.pixels, value: '10'},
    right:          {type: StyleValueType.pixels, value: '10'},
    paddingTop:     {type: StyleValueType.pixels, value: '0'},
    paddingBottom:  {type: StyleValueType.pixels, value: '0'},
    paddingLeft:    {type: StyleValueType.pixels, value: '0'},
    paddingRight:   {type: StyleValueType.pixels, value: '0'},

    scaleMin:        {type: StyleValueType.number, value: 0.5},
    scaleMax:        {type: StyleValueType.number, value: 0.5},
    durationMin:     {type: StyleValueType.number, value: 0.1},
    durationMax:     {type: StyleValueType.number, value: 0.1},
    rotationMin:     {type: StyleValueType.number, value: 0},
    rotationMax:     {type: StyleValueType.number, value: 0},
    translationXMin: {type: StyleValueType.number, value: 0},
    translationXMax: {type: StyleValueType.number, value: 0},
    translationYMin: {type: StyleValueType.number, value: 0},
    translationYMax: {type: StyleValueType.number, value: 0},
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
  soundStyle:           {
    volume: {type: StyleValueType.string, value: '0.5'},
  },
  globalStyle:          {
    hideOnInactivity:  {type: StyleValueType.bool, value: ''},
    clearOnInactivity: {type: StyleValueType.bool, value: ''},
    realtimeTyping:    {type: StyleValueType.bool, value: '1'},
    inactivityTimer:   {type: StyleValueType.string, value: '5000'},
  }
}

export const STATE_TEMPLATE: StyleState = {
  currentStyle:    STYLE_TEMPLATE,
  templates:       [],
  currentTemplate: null
}


export function PatchStyle(style: STTStyle) {
  const currentStyle: any = deepmerge(STYLE_TEMPLATE, style);
  if (currentStyle.avatarStyle.bottom) delete currentStyle.avatarStyle.bottom;
  if (currentStyle.avatarStyle.left) delete currentStyle.avatarStyle.left;
  if (currentStyle.avatarStyle.animationName) delete currentStyle.avatarStyle.animationName;
  if (currentStyle.avatarStyle.animationDuration) delete currentStyle.avatarStyle.animationDuration;
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
        templates:    this.getValue().templates.map(template => ({...template, value: PatchStyle(template.value)}))
      });
    })
  }
}
