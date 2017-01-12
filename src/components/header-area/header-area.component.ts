import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Imager, STATUS, EFFECT_CATEGORIES } from '../../imager';
import { SharedService, SharedData } from '../../services/shared.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import * as _ from 'lodash';

/**
 * 选择器
 */
const SELECTORS = {
    IMAGER: '[data-qimager-elem="image"]',
    LOADING_WRAP: '[data-qimager-elem="loadingWrap"]',
    IMAGE_INPUT: '[data-qimager-elem="imageInput"]',
    IMAGE_EFFECT: '[data-qimager-elem="effectImg"]'
};

/**
 * 文案
 */
const MESSAGES = {
    SAVE: '图像生成成功！请右键另存为...',
    PLEASE_OPEN: '请先打开一张图片！'
};

const CROPPER_CANVAS_WIDTH = 800;
const CROPPER_CANVAS_HEIGHT = 500;

@Component({
    selector: 'header-area',
    templateUrl: './header-area.component.html'
})

export class HeaderAreaComponent implements AfterViewInit {

    @ViewChild(ImageCropperComponent)
    cropper: ImageCropperComponent;

    cropperSettings: CropperSettings;
    cropperShow: string = 'none';
    sharedData: SharedData;
    imageData: Object = {};
    cropData: Object = {};

    constructor(private sharedSerivce: SharedService) {
        this.sharedData = sharedSerivce.getSharedData();
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = CROPPER_CANVAS_WIDTH;
        this.cropperSettings.canvasHeight = CROPPER_CANVAS_HEIGHT;
        this.cropperSettings.keepAspect = false;
    }

    ngAfterViewInit(): void {
        let img: HTMLImageElement = <HTMLImageElement>document.querySelector(SELECTORS.IMAGER);
        if (this.sharedData) {
            this.sharedData.imager = new Imager({ img });
            this.sharedData.imager.init();
        }
    }

    /**
     *  图片切换
     */
    imageChange(event: any): void {
        if (event && event.target && this.sharedData.imager && event.target.files[0]) {
            this.sharedData.isProcessing = true;
            setTimeout(() => {
                this.sharedData.imager.loadImageFile(event.target.files[0])
                    .then(data => {
                        if (data.status === STATUS.SUCESS) {
                            return this.sharedData.imager.reset();
                        }
                    })
                    .then(data => {
                        if (data.status === STATUS.SUCESS) {
                            this.sharedData.imageEffectUrl = this.sharedData.imageOriginUrl = data.data.dataUrl;
                            this.sharedData.hasLoaded = true;
                        }
                        this.sharedData.isProcessing = false;
                    })
            }, 100);
        }
    }

    /**
     * 打开图像
     */
    openFile(): void {
        let imageInput: HTMLFormElement = <HTMLFormElement>document.querySelector(SELECTORS.IMAGE_INPUT);
        if (imageInput) {
            imageInput.click();
        }
    }

    /**
     * 保存图像
     * 弹窗提示右键保存...(醉了)
     */
    saveFile(): void {
        if (this.sharedData.imager) {
            // this.imager.saveImageFile();
            if (this.sharedData.imageEffectUrl) {
                alert(MESSAGES.SAVE);
            }
            else {
                alert(MESSAGES.PLEASE_OPEN);
            }
        }
    }

    /**
     * 撤销操作
     */
    undo(): void {
        if (this.sharedData.imager && this.sharedData.hasLoaded) {
            this.sharedData.isProcessing = true;
            setTimeout(() => {
                this.sharedData.imager.undo({
                    effectCategory: this.sharedData.effectCategory
                })
                    .then(data => {
                        if (data.status === STATUS.SUCESS) {
                            this.sharedData.imageEffectUrl = data.data.dataUrl;
                        }
                        this.sharedData.isProcessing = false;
                    });
            }, 100);
        }
    }

    /**
     * 恢复操作
     */
    redo(): void {
        if (this.sharedData.imager && this.sharedData.hasLoaded) {
            this.sharedData.isProcessing = true;
            setTimeout(() => {
                this.sharedData.imager.redo({
                    effectCategory: this.sharedData.effectCategory
                })
                    .then(data => {
                        if (data.status === STATUS.SUCESS) {
                            this.sharedData.imageEffectUrl = data.data.dataUrl;
                        }
                        this.sharedData.isProcessing = false;
                    });
            }, 100);
        }
    }

    /**
     * 重做
     */
    renew(): void {
        if (this.sharedData.imager && this.sharedData.hasLoaded) {
            this.sharedData.isProcessing = true;
            setTimeout(() => {
                this.sharedData.imager.renew()
                    .then(data => {
                        if (data.status === STATUS.SUCESS) {
                            this.sharedData.imageEffectUrl = data.data.dataUrl;
                        }
                        this.sharedData.isProcessing = false;
                    });
            }, 100);
        }
    }

    /**
     * 剪裁
     */
    doCrop(): void {
        if (this.sharedData.imager && this.sharedData.hasLoaded) {
            let image = new Image();
            image.src = this.sharedData.imageEffectUrl;
            this.cropper.setImage(image);
            this.cropperShow = 'block';
        }
    }

    /**
     * 剪裁完成
     */
    endCrop(): void {
        if (this.sharedData.imager && this.sharedData.hasLoaded) {
            this.sharedData.imager.clip(this.cropData['left'], this.cropData['top'], this.cropData['width'], this.cropData['height'])
                .then(data => {
                    if (data.status === STATUS.SUCESS) {
                        this.sharedData.imageEffectUrl = data.data.dataUrl;
                    }
                })
        }
        this.cropperShow = 'none';
    }

    /**
     * 取消剪裁
     */
    cancelCrop(): void {
        this.cropperShow = 'none';
    }

    /**
     * 监听剪裁事件
     */
    onCrop(opt: any = null): void {
        if (opt) {
            let width = opt.width;
            let height = opt.height;
            let centre = opt.getCentre();
            let x = centre.x, y = centre.y;
            let top = y - height / 2;
            let left = x - width / 2;
            this.cropData = {
                left, top, width, height
            };
        }
    }
}