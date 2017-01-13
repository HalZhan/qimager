import { Component, Input } from '@angular/core';
import { Imager, STATUS, EFFECT_CATEGORIES } from '../../imager';
import { SharedService, SharedData } from '../../services/shared.service';
import { ActItem } from '../act-item/ActItem';
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

    ACT_EFFECTS: Array<any> = [{
        actName: '基础调整', actIcon: 'icon-jichu', actEffect: 'brightness', 
        options: [{
            optionName: '亮度', value: 0, min: -50, max: 50, step: 1
        }, {
            optionName: '对比度', value: 0, min: -50, max: 50, step: 1
        }]
    }, {
        actName: '色相/饱和度调节', actIcon: 'icon-sexiang', actEffect: 'setHSI', 
        options: [{
            optionName: '色相', value: 0, min: -50, max: 50, step: 1
        }, {
            optionName: '饱和度', value: 0, min: -50, max: 50, step: 1
        }, {
            optionName: '明度', value: 0, min: -50, max: 50, step: 1
        }, {
            optionName: '着色', value: 0, min: -50, max: 50, step: 1, type: 'checkbox'
        }]
    }, {
        actName: '灰度阈值', actIcon: 'icon-huidu', actEffect: 'toThresh', 
        options: [{
            optionName: '阈值', value: 127, min: 0, max: 255, step: 1
        }]
    }, {
        actName: '高斯模糊', actIcon: 'icon-gaosi', actEffect: 'gaussBlur', 
        options: [{
            optionName: '大小', value: 0, min: 0, max: 20, step: 1
        }]
    }, {
        actName: '锐化', actIcon: 'icon-ruihua', actEffect: 'sharp', 
        options: [{
            optionName: '大小', value: 0, min: 0, max: 20, step: 1
        }]
    }, {
        actName: '马赛克', actIcon: 'icon-masaike', actEffect: 'mosaic', 
        options: [{
            optionName: '大小', value: 0, min: 0, max: 20, step: 1
        }]
    }, {
        actName: '添加杂色', actIcon: 'icon-zase', actEffect: 'noise', 
        options: [{
            optionName: '数量', value: 0, min: 0, max: 20, step: 1
        }]
    }, {
        actName: '暗角', actIcon: 'icon-anjiao', actEffect: 'darkCorner', 
        options: [{
            optionName: '大小', value: 0, min: 0, max: 10, step: 1
        }, {
            optionName: '增加暗度', value: 0, min: 0, max: 255, step: 1
        }]
    }];

    sharedData: SharedData;

    constructor(private sharedSerivce: SharedService) {
        this.sharedData = sharedSerivce.getSharedData();
    }

    /**
     * 监听act参数变化
     */
    onActChange(opt: ActItem = null): void {
        let data: any = null;
        if (opt) {
            let params: Array<number> = [];
            for (let option of opt.options) {
                params.push(parseInt(String(option.value), 10));
            }
            data = {
                effect: opt.actEffect,
                params
            };
        }
        this.act(data);
    }

    /**
     * 监听选项选中
     */
    onActSelected(opt:ActItem = null): void {
        if(opt) {
            for(let item of this.ACT_EFFECTS) {
                if(opt.actEffect !== item.actEffect) {
                    item.selected = false;
                }
            }
        }
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
    act(opt: Object = null): void {
        if (this.sharedData.imager && opt && this.sharedData.hasLoaded) {
            this.sharedData.isProcessing = true;
            setTimeout(() => {
                this.sharedData.imager.act(opt).then(data => {
                    if (data.status === STATUS.SUCESS) {
                        this.sharedData.imageEffectUrl = data.data.dataUrl;
                    }
                    else {
                        console.info('ACT FAILED', data);
                    }
                    this.sharedData.isProcessing = false;
                });
            }, 100);
        }
    }
}