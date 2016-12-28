import { Injectable } from '@angular/core';
import { Imager } from '../imager';

export class SharedData {
    imager: Imager = null;
    imageEffectUrl: string = '';
    imageOriginUrl: string = '';
    curStage: number = 0;
    hasLoaded: boolean = false;
    effectCategory: number = 0;
    loadingShowFlag: boolean = false;
    isProcessing: boolean = false;
}

@Injectable()
export class SharedService {
    private _sharedData: SharedData = new SharedData();

    getSharedData(): SharedData {
        return this._sharedData;
    }
}