import { Component, Input, ViewChild } from '@angular/core';
import { Imager, STATUS, EFFECT_CATEGORIES } from '../../imager';
import { SharedService, SharedData } from '../../services/shared.service';
import * as $ from 'jquery';
import * as _ from 'lodash';

const SELECTORS = {
    IMG_ORIGIN: '[data-qimager-elem="originImg"]',
    IMG_EFFECT: '[data-qimager-elem="effectImg"]'
};

@Component({
    selector: 'stage-area',
    templateUrl: './stage-area.component.html'
})

export class StageAreaComponent {
    sharedData: SharedData;
    isOrigin: boolean = false;
    defaultUrl: string = '../../../public/slicing/images/stop.jpg';
    constructor(private sharedService: SharedService) {
        this.sharedData = sharedService.getSharedData();
    }

    toggleOrigin(): void {
        let imgOrigin: HTMLImageElement = <HTMLImageElement>document.querySelector(SELECTORS.IMG_ORIGIN),
            imgEffect: HTMLImageElement = <HTMLImageElement>document.querySelector(SELECTORS.IMG_EFFECT);
        if(imgOrigin && imgEffect) {
            let duration = 'normal';
            let styleAttr = 'zIndex';
            let originWidth = imgOrigin.width;
            let originHeight = imgOrigin.height;
            let originZIndex = $(imgOrigin).css(styleAttr);
            let effectWidth = imgEffect.width;
            let effectHeight = imgEffect.height;
            let effectZIndex = $(imgEffect).css(styleAttr);
            $(imgOrigin).animate({
                width: effectWidth+'px',
                height: effectHeight+'px'
            }, duration, () => {
                // $(imgOrigin).parent().css(styleAttr, effectZIndex);
            });
            $(imgEffect).animate({
                width: originWidth+'px',
                height: originHeight+'px'
            }, duration, () => {
                // $(imgEffect).css(styleAttr, originZIndex);
            });
            this.isOrigin = !this.isOrigin;
        }
    }
}