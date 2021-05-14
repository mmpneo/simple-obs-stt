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
export const CUSTOM_STYLE_LOGIC: { [k in keyof STTStyle]: { [styleKey: string]: CustomStyleFn } } = {
  textStyle:            {
    marginRight: (state, elementStyle, value) => {
      elementStyle.position = state.boxStyle.heightMode.value === 'fixed' ? 'absolute' : 'relative';
      elementStyle.marginRight    = value;
    }
  },
  boxStyle:             {
    // based on boxStyle.heightMode keep height fixed or minimized with max height
    height:  (state, elementStyle, calculatedValue) => {
      if (state.boxStyle.heightMode.value === 'grow') {
        elementStyle.maxHeight = calculatedValue;
        elementStyle.height    = 'auto';
      }
      else {
        elementStyle.maxHeight = 'none';
        elementStyle.height    = calculatedValue;
      }
    },
    bgStyle: (state, elementStyle, calculatedValue) => {
      //  normal | sliced

      elementStyle.borderImage = null;
      elementStyle.backgroundImage = null;
      if (calculatedValue === 'normal')
        elementStyle.backgroundImage = `url(${state.boxStyle.backgroundImage.value})`;
      else {
        // ignore border rules
        elementStyle.border = '0px solid transparent';
        elementStyle.borderImage = `url(${state.boxStyle.backgroundImage.value})`;
        elementStyle.borderImageSlice = `${state.boxStyle.borderWidthTop.value} ${state.boxStyle.borderWidthRight.value} ${state.boxStyle.borderWidthBottom.value} ${state.boxStyle.borderWidthLeft.value} fill`;
        elementStyle.borderImageWidth = `${state.boxStyle.borderWidthTop.value}px ${state.boxStyle.borderWidthRight.value}px ${state.boxStyle.borderWidthBottom.value}px ${state.boxStyle.borderWidthLeft.value}px`;
        // border-image-slice x-x-x-x fill
        // border-image-width x-x-x-x
      }
    }
  },
  avatarStyle:          {},
  avatarStyleComposite: {},
  globalStyle:          {},
  soundStyle:           {},
  textStyleComposite:   {},
}

export interface STTStyle {
  boxStyle: {
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    heightMode: StyleValue<StyleValueType.logic, 'grow' | 'fixed'>;
    backgroundImage: StyleValue<StyleValueType.logic>; // apply it later in [bgStyle]
    backgroundColor: StyleValue<StyleValueType.string>;

    borderWidth: StyleValue<StyleValueType.pixels>;
    borderColor: StyleValue<StyleValueType.string>;
    borderRadius: StyleValue<StyleValueType.pixels>;

    borderWidthTop: StyleValue<StyleValueType.logic>
    borderWidthRight: StyleValue<StyleValueType.logic>
    borderWidthBottom: StyleValue<StyleValueType.logic>
    borderWidthLeft: StyleValue<StyleValueType.logic>

    bgStyle: StyleValue<StyleValueType.logic>;

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
    alignContent: StyleValue<StyleValueType.string>;
    marginTop: StyleValue<StyleValueType.pixels>
    marginBottom: StyleValue<StyleValueType.pixels>
    marginLeft: StyleValue<StyleValueType.pixels>
    marginRight: StyleValue<StyleValueType.pixels>
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
    keepSingleSentence: StyleValue<StyleValueType.bool>;
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
    width:           {type: StyleValueType.pixels, value: '300'},
    height:          {type: StyleValueType.pixels, value: '100'},
    heightMode:      {type: StyleValueType.logic, value: 'fixed'},
    backgroundImage: {type: StyleValueType.logic, value: ''},
    backgroundColor: {type: StyleValueType.string, value: 'transparent'},
    borderRadius:    {type: StyleValueType.pixels, value: '0'},
    borderWidth:     {type: StyleValueType.pixels, value: '0'},
    borderColor:     {type: StyleValueType.string, value: 'transparent'},

    borderWidthTop:    {type: StyleValueType.logic, value: '0'},
    borderWidthRight:  {type: StyleValueType.logic, value: '0'},
    borderWidthBottom: {type: StyleValueType.logic, value: '0'},
    borderWidthLeft:   {type: StyleValueType.logic, value: '0'},
    bgStyle:           {type: StyleValueType.logic, value: 'normal'},
  },
  textStyle:            {
    fontFamily:     {type: StyleValueType.string, value: 'Roboto'},
    color:          {type: StyleValueType.string, value: 'white'},
    fontSize:       {type: StyleValueType.pixels, value: '18'},
    lineHeight:     {type: StyleValueType.string, value: '1.2'},
    fontWeight:     {type: StyleValueType.string, value: '500'},
    textTransform:  {type: StyleValueType.string, value: 'none'},
    justifyContent: {type: StyleValueType.string, value: 'flex-start'},
    alignContent:   {type: StyleValueType.string, value: 'flex-start'},
    marginTop:      {type: StyleValueType.pixels, value: '0'},
    marginBottom:   {type: StyleValueType.pixels, value: '0'},
    marginLeft:     {type: StyleValueType.pixels, value: '10'},
    marginRight:    {type: StyleValueType.pixels, value: '10'},
    paddingTop:     {type: StyleValueType.pixels, value: '0'},
    paddingBottom:  {type: StyleValueType.pixels, value: '0'},
    paddingLeft:    {type: StyleValueType.pixels, value: '0'},
    paddingRight:   {type: StyleValueType.pixels, value: '0'},

    scaleMin:        {type: StyleValueType.number, value: 1},
    scaleMax:        {type: StyleValueType.number, value: 1},
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
    hideOnInactivity:   {type: StyleValueType.bool, value: ''},
    keepSingleSentence: {type: StyleValueType.bool, value: ''},
    clearOnInactivity:  {type: StyleValueType.bool, value: ''},
    realtimeTyping:     {type: StyleValueType.bool, value: '1'},
    inactivityTimer:    {type: StyleValueType.string, value: '5000'},
  }
}

export const STATE_TEMPLATE: StyleState = {
  currentStyle:    STYLE_TEMPLATE,
  templates:       [],
  currentTemplate: null
}


export function PatchStyle(style: STTStyle) {
  const currentStyle: any = deepmerge(STYLE_TEMPLATE, style);

  // remove inset
  if (currentStyle.avatarStyle.bottom) delete currentStyle.avatarStyle.bottom;
  if (currentStyle.avatarStyle.left) delete currentStyle.avatarStyle.left;
  // remove animations
  if (currentStyle.avatarStyle.animationName) delete currentStyle.avatarStyle.animationName;
  if (currentStyle.avatarStyle.animationDuration) delete currentStyle.avatarStyle.animationDuration;
  // rename
  if (currentStyle.globalStyle.clearOnHide) delete currentStyle.globalStyle.clearOnHide;
  if (currentStyle.globalStyle.alwaysShow) delete currentStyle.globalStyle.alwaysShow;
  if (currentStyle.globalStyle.hideAfter) delete currentStyle.globalStyle.hideAfter;
  if (currentStyle.textStyle.alignItems) {
    currentStyle.textStyle.alignContent.value = currentStyle.textStyle.alignItems.value;
    delete currentStyle.textStyle.alignItems;
  }
  const textValues = currentStyle.textStyle;

  // inset -> margin
  if (!!textValues.top) {
    currentStyle.textStyle.marginTop.value = textValues.top.value;
    delete currentStyle.textStyle.top;
  }
  if (!!textValues.bottom) {
    currentStyle.textStyle.marginBottom.value = textValues.bottom.value;
    delete currentStyle.textStyle.bottom;
  }
  if (!!textValues.left) {
    currentStyle.textStyle.marginLeft.value = textValues.left.value;
    delete currentStyle.textStyle.left;
  }
  if (!!textValues.right) {
    currentStyle.textStyle.marginRight.value = textValues.right.value;
    delete currentStyle.textStyle.right;
  }
  if (typeof textValues.marginRight !== "object") currentStyle.textStyle.marginRight = STYLE_TEMPLATE.textStyle.marginRight;
  if (typeof textValues.marginLeft !== "object") currentStyle.textStyle.marginLeft = STYLE_TEMPLATE.textStyle.marginLeft;
  if (typeof textValues.marginTop !== "object") currentStyle.textStyle.marginTop = STYLE_TEMPLATE.textStyle.marginTop;
  if (typeof textValues.marginBottom !== "object") currentStyle.textStyle.marginBottom = STYLE_TEMPLATE.textStyle.marginBottom;

  // validate numbers
  if (typeof textValues.scaleMin.value === "string") currentStyle.textStyle.scaleMin.value = parseFloat(textValues.scaleMin.value)
  if (typeof textValues.scaleMax.value === "string") currentStyle.textStyle.scaleMax.value = parseFloat(textValues.scaleMax.value)
  if (typeof textValues.durationMin.value === "string") currentStyle.textStyle.durationMin.value = parseFloat(textValues.durationMin.value)
  if (typeof textValues.durationMax.value === "string") currentStyle.textStyle.durationMax.value = parseFloat(textValues.durationMax.value)
  if (typeof textValues.rotationMin.value === "string") currentStyle.textStyle.rotationMin.value = parseFloat(textValues.rotationMin.value)
  if (typeof textValues.rotationMax.value === "string") currentStyle.textStyle.rotationMax.value = parseFloat(textValues.rotationMax.value)
  if (typeof textValues.translationXMin.value === "string") currentStyle.textStyle.translationXMin.value = parseFloat(textValues.translationXMin.value)
  if (typeof textValues.translationXMax.value === "string") currentStyle.textStyle.translationXMax.value = parseFloat(textValues.translationXMax.value)
  if (typeof textValues.translationYMin.value === "string") currentStyle.textStyle.translationYMin.value = parseFloat(textValues.translationYMin.value)
  if (typeof textValues.translationYMax.value === "string") currentStyle.textStyle.translationYMax.value = parseFloat(textValues.translationYMax.value)
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
