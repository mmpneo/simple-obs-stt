import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import produce              from "immer";

export enum StyleValueType {
  string,
  pixels
}

export type StyleValue<T = StyleValueType.string | StyleValueType.pixels> = {
  type: T
  value: string
}

export interface STTStyle {
  boxStyle: {
    backgroundColor: StyleValue<StyleValueType.string>;
    [key: string]: any
  };
  textStyle: {
    color: StyleValue<StyleValueType.string>;
    fontSize: StyleValue<StyleValueType.pixels>;
    fontWeight: StyleValue<StyleValueType.string>;
    textTransform: StyleValue<StyleValueType.string>;
  };
  textStyleComposite: {
    textShadow: {
      x: StyleValue<StyleValueType.pixels>;
      y: StyleValue<StyleValueType.pixels>;
      b: StyleValue<StyleValueType.pixels>;
      color: StyleValue<StyleValueType.string>
    }

  }
  // avatarStyle: {
  //   display: string
  // }
}

export interface StyleState {
  currentStyle: STTStyle;
  templates: STTStyle[];
}

export function createInitialState(): StyleState {
  return {
    currentStyle: {
      boxStyle:  {
        backgroundColor: {type: StyleValueType.string, value: 'black'}
      },
      textStyle: {
        color:         {type: StyleValueType.string, value: 'white'},
        fontSize:      {type: StyleValueType.pixels, value: '18'},
        fontWeight:    {type: StyleValueType.string, value: 'normal'},
        textTransform: {type: StyleValueType.string, value: 'none'},
      },
      textStyleComposite: {
          textShadow: {
            x:     {type: StyleValueType.pixels, value: '0'},
            y:     {type: StyleValueType.pixels, value: '0'},
            b:     {type: StyleValueType.pixels, value: '0'},
            color: {type: StyleValueType.string, value: 'black'}
          }
      }
    },
    templates:    []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'style', producerFn: produce})
export class StyleStore extends Store<StyleState> {

  constructor() {
    super(createInitialState());
  }

}
