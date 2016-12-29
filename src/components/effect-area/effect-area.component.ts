import { Component, Input } from '@angular/core';
import { Imager, STATUS, EFFECT_CATEGORIES } from '../../imager';
import { SharedService, SharedData } from '../../services/shared.service';
import * as _ from 'lodash';

@Component({
    selector: 'effect-area',
    templateUrl: './effect-area.component.html'
})

export class EffectAreaComponent {
    PS_PICTURE_NAMES: Array<Object> = [
        { effect: '原图', pic: 'yuantu' },
        { effect: '美肤', pic: 'meifu' },
        { effect: '素描', pic: 'sumiao' },
        { effect: '自然增强', pic: 'ziran' },
        { effect: '紫调', pic: 'zidiao' },
        { effect: '柔焦', pic: 'roujiao' },
        { effect: '复古', pic: 'fugu' },
        { effect: '黑白', pic: 'heibai' },
        { effect: '仿lomo', pic: 'lomo' },
        { effect: '亮白增强', pic: 'liangbai' },
        { effect: '灰白', pic: 'huibai' },
        { effect: '灰色', pic: 'huise' },
        { effect: '暖秋', pic: 'nuanqiu' },
        { effect: '木雕', pic: 'mudiao' },
        { effect: '粗糙', pic: 'cucao' }
    ];

    sharedData: SharedData;

    constructor(private sharedSerivce: SharedService) {
        this.sharedData = sharedSerivce.getSharedData();
    }

    /**
    * PS图像
    */
    ps(effect: string = ''): void {
        if (this.sharedData.imager && effect && this.sharedData.hasLoaded) {
            this.sharedData.isProcessing = true;
            // 必须为异步，否则loading弹层无法正常显示
            setTimeout(() => {
                this.sharedData.imager.ps({ effect }).then(data => {
                    if (data.status === STATUS.SUCESS) {
                        this.sharedData.imageEffectUrl = data.data.dataUrl;
                    }
                    this.sharedData.isProcessing = false;
                });
            }, 100);
        }
    }
    /**
     * 图像高级效果
     */
    act(effect: string = ''): void {
        if (this.sharedData.imager && effect) {
            this.sharedData.imager.act({ effect });
        }
    }
}