import { Component, Input } from '@angular/core';
import { Imager, STATUS, EFFECT_CATEGORIES } from '../../imager';
import { SharedService, SharedData } from '../../services/shared.service';
import * as _ from 'lodash';

@Component({
    selector: 'stage-area',
    templateUrl: './stage-area.component.html'
})

export class StageAreaComponent {
    sharedData: SharedData;
    
    constructor(private sharedService: SharedService) {
        this.sharedData = sharedService.getSharedData();
    }
}