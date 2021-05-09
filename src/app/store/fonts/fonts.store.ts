import {Injectable}         from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';

export interface GoogleFont {
  category: string
  family: string
  files: {
    [fontType: string]: string // file url
  }
  kind: string[]
  lastModified: string
  subsets: string[]
  variants: string[]
  version: string
}

export interface FontsState {}
export function createInitialState(): FontsState {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'fonts' })
export class FontsStore extends Store<FontsState> {

  constructor() {
    super(createInitialState());
  }

}
