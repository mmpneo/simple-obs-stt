import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface GoogleFont{
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

export interface ApplicationState {
   key: string;
   fonts: GoogleFont[]
}

export function createInitialState(): ApplicationState {
  return {
    key: '',
    fonts: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'application' })
export class ApplicationStore extends Store<ApplicationState> {

  constructor() {
    super(createInitialState());
  }

}
