import {Injectable}                                 from '@angular/core';
import {selectPersistStateInit, Store, StoreConfig} from '@datorama/akita';
import produce                                      from "immer";
import {migrate_style}                              from "@store/style/style.migration";

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
  audioFile
}

export function BuildTypedValue(v: StyleValue, valueIndex: number): string | number {
  const value = v.value[valueIndex];
  switch (v.type) {
    case StyleValueType.pixels:
      return value + 'px';
    case StyleValueType.ms:
      return value + 'ms';
    case StyleValueType.url:
      return `url(${value})`;
    case StyleValueType.translateX:
      return `translateX(${value}px)`;
    case StyleValueType.translateY:
      return `translateY(${value}px)`;
    case StyleValueType.number:
      return value;
    default:
      return value;
  }
}

type ValueType<T> = T extends StyleValueType.number ? number : string;

export type StyleValue<T = StyleValueType, V = ValueType<T>> =
  {
    type: T,
    value: [V, V],
    linked: boolean
  }

export type CustomStyleFn = (state: STTStyle, elementStyle: any, calculatedValue: string | number, valueIndex: number) => void;

// override style applying with side effects
export const CUSTOM_STYLE_LOGIC: { [k in keyof Omit<STTStyle, 'version'>]: { [styleKey: string]: CustomStyleFn } } = {
  textStyle:   {
    marginRight: (state, elementStyle, calculatedValue, valueIndex) => {
      elementStyle.position    = state.boxStyle.heightMode.value[0] === 'fixed' ? 'absolute' : 'relative';
      elementStyle.marginRight = calculatedValue;
    },
    shadowColor: (state, elementStyle, value, valueIndex) => {
      elementStyle.textShadow = `${state.textStyle.shadowX.value[valueIndex]}px ${state.textStyle.shadowY.value[valueIndex]}px ${state.textStyle.shadowB.value[valueIndex]}px ${state.textStyle.shadowColor.value[valueIndex]}`
    }
  },
  boxStyle:    {
    shadowColor: (state, elementStyle, value, valueIndex) => {
      elementStyle.boxShadow = `${state.boxStyle.shadowX.value[valueIndex]}px ${state.boxStyle.shadowY.value[valueIndex]}px ${state.boxStyle.shadowB.value[valueIndex]}px ${state.boxStyle.shadowSpread.value[valueIndex]}px ${state.boxStyle.shadowColor.value[valueIndex]}`
    },
    // based on boxStyle.heightMode keep height fixed or minimized with max height
    height:     (state, elementStyle, calculatedValue, valueIndex) => {
      if (state.boxStyle.heightMode.value[0] === 'grow') {
        elementStyle.maxHeight = calculatedValue;
        elementStyle.height    = 'auto';
      }
      else {
        elementStyle.maxHeight = 'none';
        elementStyle.height    = calculatedValue;
      }
    },
    transformY: (state, elementStyle, calculatedValue, valueIndex) => {
      elementStyle.transform = `translateX(${state.boxStyle.transformX.value[valueIndex]}px) translateY(${state.boxStyle.transformY.value[valueIndex]}px) scale(${state.boxStyle.scale.value[valueIndex]})`
    },
    bgStyle:    (state, elementStyle, calculatedValue, valueIndex) => {
      //  normal | sliced

      elementStyle.borderImage     = null;
      elementStyle.backgroundImage = null;
      if (calculatedValue === 'normal') {
        if (state.boxStyle.backgroundImage.value[valueIndex])
        elementStyle.backgroundImage = `url(${state.boxStyle.backgroundImage.value[valueIndex]})`;
      }
      else {
        // ignore border rules
        elementStyle.border           = '0px solid transparent';
        if (state.boxStyle.backgroundImage.value[valueIndex]) {
          elementStyle.borderImage      = `url(${state.boxStyle.backgroundImage.value[valueIndex]})`;
          elementStyle.borderImageSlice = `${state.boxStyle.borderWidthTop.value[valueIndex]} ${state.boxStyle.borderWidthRight.value[valueIndex]} ${state.boxStyle.borderWidthBottom.value[valueIndex]} ${state.boxStyle.borderWidthLeft.value[valueIndex]} fill`;
          elementStyle.borderImageWidth = `${state.boxStyle.borderWidthTop.value[valueIndex]}px ${state.boxStyle.borderWidthRight.value[valueIndex]}px ${state.boxStyle.borderWidthBottom.value[valueIndex]}px ${state.boxStyle.borderWidthLeft.value[valueIndex]}px`;
        }
        // border-image-slice x-x-x-x fill
        // border-image-width x-x-x-x
      }
    }
  },
  avatarStyle: {
    transformY: (state, elementStyle, calculatedValue, valueIndex) => {
      elementStyle.transform = `translateX(${state.avatarStyle.transformX.value[valueIndex]}px) translateY(${state.avatarStyle.transformY.value[valueIndex]}px)`
    }
  },
  globalStyle: {},
  soundStyle:  {},
}

export interface STTStyle {
  version: number,
  boxStyle: {
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    transformX: StyleValue<StyleValueType.number>;
    transformY: StyleValue<StyleValueType.number>;
    scale: StyleValue<StyleValueType.number>;
    heightMode: StyleValue<StyleValueType.logic, 'grow' | 'fixed'>;
    backgroundImage: StyleValue<StyleValueType.logic>; // apply it later in [bgStyle]
    backgroundColor: StyleValue<StyleValueType.string>;
    opacity: StyleValue<StyleValueType.number>;

    borderWidth: StyleValue<StyleValueType.pixels>;
    borderColor: StyleValue<StyleValueType.string>;
    borderRadius: StyleValue<StyleValueType.pixels>;

    borderWidthTop: StyleValue<StyleValueType.logic>
    borderWidthRight: StyleValue<StyleValueType.logic>
    borderWidthBottom: StyleValue<StyleValueType.logic>
    borderWidthLeft: StyleValue<StyleValueType.logic>

    bgStyle: StyleValue<StyleValueType.logic>;

    shadowX: StyleValue<StyleValueType.pixels>;
    shadowY: StyleValue<StyleValueType.pixels>;
    shadowB: StyleValue<StyleValueType.pixels>;
    shadowSpread: StyleValue<StyleValueType.pixels>;
    shadowColor: StyleValue<StyleValueType.string>;

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

    shadowX: StyleValue<StyleValueType.pixels>;
    shadowY: StyleValue<StyleValueType.pixels>;
    shadowB: StyleValue<StyleValueType.pixels>;
    shadowColor: StyleValue<StyleValueType.string>;

    webkitTextStrokeWidth: StyleValue<StyleValueType.pixels>;
    webkitTextStrokeColor: StyleValue<StyleValueType.string>;

  };
  avatarStyle: {
    order: StyleValue<StyleValueType.string>;
    width: StyleValue<StyleValueType.pixels>;
    height: StyleValue<StyleValueType.pixels>;
    backgroundImage: StyleValue<StyleValueType.url>;
    animationName: StyleValue<StyleValueType.string>;
    animationDuration: StyleValue<StyleValueType.ms>;
    transformX: StyleValue<StyleValueType.number>;
    transformY: StyleValue<StyleValueType.number>;
    opacity: StyleValue<StyleValueType.number>;
  },
  soundStyle: {
    volume: StyleValue<StyleValueType.string>;
    typeClip: StyleValue<StyleValueType.audioFile>;
    typePlayback: StyleValue<StyleValueType.number>;
    typeDetune: StyleValue<StyleValueType.number>;
    voiceVolume: StyleValue<StyleValueType.string>;
  },
  globalStyle: {
    emoteHeight: StyleValue<StyleValueType.pixels>

    hideOnInactivity: StyleValue<StyleValueType.bool>;
    keepSingleSentence: StyleValue<StyleValueType.bool>;
    clearOnInactivity: StyleValue<StyleValueType.bool>;
    realtimeTyping: StyleValue<StyleValueType.bool>;
    inactivityTimer: StyleValue<StyleValueType.string>;

    typingAnimation: StyleValue<StyleValueType.bool>;
    typeWords: StyleValue<StyleValueType.bool>;
    typingDelay: StyleValue<StyleValueType.number>;
  }
}

export interface StyleState {
  currentStyle: STTStyle;
  templates: { name: string, value: STTStyle }[];
  currentTemplate: number | null
}

export const STYLE_TEMPLATE: STTStyle = {
  version:     8,
  boxStyle:    {
    width:             {type: StyleValueType.pixels, value: ['300', '300'], linked: true},
    height:            {type: StyleValueType.pixels, value: ['100', '100'], linked: true},
    transformX:        {type: StyleValueType.number, value: [0, 0], linked: true},
    transformY:        {type: StyleValueType.number, value: [0, 0], linked: true},
    scale:             {type: StyleValueType.number, value: [1, 1], linked: true},
    heightMode:        {type: StyleValueType.logic, value: ['fixed', 'fixed'], linked: true},
    backgroundImage:   {type: StyleValueType.logic, value: ['', ''], linked: true},
    backgroundColor:   {type: StyleValueType.string, value: ['transparent', 'transparent'], linked: true},
    borderRadius:      {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    borderWidth:       {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    borderColor:       {type: StyleValueType.string, value: ['transparent', 'transparent'], linked: true},
    borderWidthTop:    {type: StyleValueType.logic, value: ['0', '0'], linked: true},
    borderWidthRight:  {type: StyleValueType.logic, value: ['0', '0'], linked: true},
    borderWidthBottom: {type: StyleValueType.logic, value: ['0', '0'], linked: true},
    borderWidthLeft:   {type: StyleValueType.logic, value: ['0', '0'], linked: true},
    bgStyle:           {type: StyleValueType.logic, value: ['normal', 'normal'], linked: true},
    opacity:           {type: StyleValueType.number, value: [1, 1], linked: true},

    shadowX:      {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowY:      {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowB:      {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowSpread: {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowColor:  {type: StyleValueType.string, value: ['transparent', 'transparent'], linked: true},
  },
  textStyle:   {
    fontFamily:     {type: StyleValueType.string, value: ['Roboto', 'Roboto'], linked: true},
    color:          {type: StyleValueType.string, value: ['white', 'white'], linked: true},
    fontSize:       {type: StyleValueType.pixels, value: ['18', '18'], linked: true},
    lineHeight:     {type: StyleValueType.string, value: ['1.2', '1.2'], linked: true},
    fontWeight:     {type: StyleValueType.string, value: ['500', '500'], linked: true},
    textTransform:  {type: StyleValueType.string, value: ['none', 'none'], linked: true},
    justifyContent: {type: StyleValueType.string, value: ['flex-start', 'flex-start'], linked: true},
    alignContent:   {type: StyleValueType.string, value: ['flex-start', 'flex-start'], linked: true},
    marginTop:      {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    marginBottom:   {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    marginLeft:     {type: StyleValueType.pixels, value: ['10', '10'], linked: true},
    marginRight:    {type: StyleValueType.pixels, value: ['10', '10'], linked: true},
    paddingTop:     {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    paddingBottom:  {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    paddingLeft:    {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    paddingRight:   {type: StyleValueType.pixels, value: ['0', '0'], linked: true},

    scaleMin:        {type: StyleValueType.number, value: [1, 1], linked: true},
    scaleMax:        {type: StyleValueType.number, value: [1, 1], linked: true},
    durationMin:     {type: StyleValueType.number, value: [0.1, 0.1], linked: true},
    durationMax:     {type: StyleValueType.number, value: [0.1, 0.1], linked: true},
    rotationMin:     {type: StyleValueType.number, value: [0, 0], linked: true},
    rotationMax:     {type: StyleValueType.number, value: [0, 0], linked: true},
    translationXMin: {type: StyleValueType.number, value: [0, 0], linked: true},
    translationXMax: {type: StyleValueType.number, value: [0, 0], linked: true},
    translationYMin: {type: StyleValueType.number, value: [0, 0], linked: true},
    translationYMax: {type: StyleValueType.number, value: [0, 0], linked: true},

    shadowX:     {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowY:     {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowB:     {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    shadowColor: {type: StyleValueType.string, value: ['transparent', 'transparent'], linked: true},

    webkitTextStrokeWidth: {type: StyleValueType.pixels, value: ['0', '0'], linked: true},
    webkitTextStrokeColor: {type: StyleValueType.string, value: ['black', 'black'], linked: true}
  },
  avatarStyle: {
    order:             {type: StyleValueType.string, value: ['0', '0'], linked: true},
    width:             {type: StyleValueType.pixels, value: ['120', '120'], linked: true},
    height:            {type: StyleValueType.pixels, value: ['120', '120'], linked: true},
    backgroundImage:   {type: StyleValueType.url, value: ['', ''], linked: true},
    animationName:     {type: StyleValueType.string, value: ['none', 'none'], linked: true},
    animationDuration: {type: StyleValueType.ms, value: ['2000', '2000'], linked: true},
    transformX:        {type: StyleValueType.number, value: [0, 0], linked: true},
    transformY:        {type: StyleValueType.number, value: [0, 0], linked: true},
    opacity:           {type: StyleValueType.number, value: [1, 1], linked: true},
  },
  soundStyle:  {
    volume:       {type: StyleValueType.string, value: ['0.5', '0.5'], linked: true},
    typeClip:     {type: StyleValueType.audioFile, value: ['assets/sounds/type_1.wav', 'url'], linked: true},
    typeDetune:   {type: StyleValueType.number, value: [0, 0], linked: true},
    typePlayback: {type: StyleValueType.number, value: [1, 1], linked: true},
    voiceVolume:  {type: StyleValueType.string, value: ['0.5', '0.5'], linked: true},
  },
  globalStyle: {
    emoteHeight:        {type: StyleValueType.pixels, value: ['24', '24'], linked: true},
    hideOnInactivity:   {type: StyleValueType.bool, value: ['', ''], linked: true},
    keepSingleSentence: {type: StyleValueType.bool, value: ['', ''], linked: true},
    clearOnInactivity:  {type: StyleValueType.bool, value: ['', ''], linked: true},
    realtimeTyping:     {type: StyleValueType.bool, value: ['1', '1'], linked: true},
    inactivityTimer:    {type: StyleValueType.string, value: ['5000', '5000'], linked: true},

    typingAnimation: {type: StyleValueType.bool, value: ['', ''], linked: true},
    typeWords:       {type: StyleValueType.bool, value: ['', ''], linked: true},
    typingDelay:     {type: StyleValueType.number, value: [80, 80], linked: true}
  }
}

export const STATE_TEMPLATE: StyleState = {
  currentStyle:    STYLE_TEMPLATE,
  templates:       [],
  currentTemplate: null
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'style', producerFn: produce})
export class StyleStore extends Store<StyleState> {
  constructor() {
    super(STATE_TEMPLATE);
    selectPersistStateInit().subscribe(value => {
      this.update({
        currentStyle: migrate_style(this.getValue().currentStyle),
        templates:    this.getValue().templates.map(template => ({...template, value: migrate_style(template.value)}))
      });
    })
  }
}
