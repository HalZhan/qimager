/// <reference path="../declarations.d.ts" />

import 'AlloyImage';
import { Stack, FLAGS_STACK } from './stack';

/**
 * 状态值
 */
export const STATUS = {
    SUCESS: 0,  // 成功
    FAIL: -1,   // 失败
    ERROR: -2,  // 错误
    UNKNOWN: -9 // 未知
};

/**
 * 效果类别
 */
export const EFFECT_CATEGORIES = {
    PS: 0,
    ACT: 1
};

/**
 * 高级效果
 */
export const EFFECTS_ACT = {
    brightness: '亮度',
    setHSI: '色相/饱和度调节',
    curve: '曲线',
    toGray: '灰度处理',
    toThresh: '灰度阈值',
    toReverse: '反色',
    gaussBlur: '高斯模糊',
    sharp: '锐化',
    mosaic: '马赛克',
    embossment: '浮雕效果',
    corrode: '腐蚀',
    noise: '添加杂色',
    darkCorner: '暗角',
    dotted: '喷点',
    origin: '原图'
};

/**
 * PS效果
 */
export const EFFECTS_PS = {
    origin: '原图',
    softenFace: '美肤',
    sketch: '素描',
    softEnhancement: '自然增强',
    purpleStyle: '紫调',
    soften: '柔焦',
    vintage: '复古',
    gray: '黑白',
    lomo: '仿lomo',
    strongEnhancement: '亮白增强',
    strongGray: '灰白',
    lightGray: '灰色',
    warmAutumn: '暖秋',
    carveStyle: '木雕',
    rough: '粗糙'
};

/**
 * 原图 - 效果名
 */
export const EFFECT_ORIGIN: string = 'origin';

const SELECTORS = {
    SAVE_IFRAME: '__IMAGER_IFRMAE__'
};

const FLAG_UNDO = 0; // 撤销标识
const FLAG_REDO = 1; // 重做标识
const STACK_SIZE = 20; // 操作栈大小

/**
 * Imager类
 * 
 * @export
 * @class Imager
 */
export class Imager {
    _doms: Object = {
        img: HTMLImageElement
    };
    _originLayer: any = null;
    _layer: any = null;
    _stack: Stack = null;
    _curPSEffect: string = '';
    _curActEffect: string = '';

    constructor(opt: Object = {}) {
        this._doms['img'] = opt['img'];
        this._stack = new Stack({ size: STACK_SIZE });
    }

    /**
     * 初始化
     * 
     * 
     * @memberOf Imager
     */
    init(): void {
        this._initLayer();
    }

    /**
     * 初始化图层
     * 
     * 
     * @memberOf Imager
     */
    _initLayer(): Promise<any> {
        return new Promise((resolve, reject) => {
            let img: ImagerHTMLImageElement = this._doms['img'] || null;
            if (img) {
                img.loadOnce(() => {
                    try {
                        this._originLayer = $AI(img);
                        this._layer = $AI(img);
                        resolve({
                            status: STATUS.SUCESS,
                            data: {
                                dataUrl: img.src
                            }
                        });
                    }
                    catch (err) {
                        resolve({
                            status: STATUS.ERROR,
                            data: err
                        });
                    }
                });
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of image document object model!'
                });
            }
        });
    }

    /**
     * 重置
     * 
     * @returns {Promise<any>}
     * 
     * @memberOf Imager
     */
    reset(): Promise<any> {
        return this._initLayer()
            .then(data => {
                if (data.status === STATUS.SUCESS) {
                    this._stack.reset();
                }
                return data;
            });
    }

    /**
     * 图像处理
     * 
     * @param {Object} [opt={}]
     * 
     * @memberOf Imager
     */
    act(opt: Object = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            let effect: string = opt['effect'] || '';
            let params: Array<number | string> = opt['params'] || [];
            let img: HTMLImageElement = this._doms['img'];
            effect = this.getValidActEffect(effect);
            this._layer = $AI(img);
            if (this.getValidActEffect(effect) && this._layer) {
                if (effect === EFFECT_ORIGIN) {
                    this._originLayer.clone().replace(img).complete(() => {
                        this._stack.push(img.src);
                        resolve({
                            status: STATUS.SUCESS,
                            data: {
                                dataUrl: img.src
                            }
                        });
                    });
                }
                else {
                    params.unshift(effect);
                    try {
                        let layer = this._layer;
                        let tmpLayer = this._layer;
                        layer.add(tmpLayer.act.apply(tmpLayer, params))
                            .replace(img)
                            .complete(() => {
                                this._stack.push(img.src);
                                resolve({
                                    status: STATUS.SUCESS,
                                    data: {
                                        dataUrl: img.src
                                    }
                                });
                            });
                    }
                    catch (err) {
                        resolve({
                            status: STATUS.ERROR,
                            msg: 'ERROR!',
                            data: err
                        });
                    }
                }
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of params!'
                });
            }
        });
    }

    /**
     * 获得正确的PS效果
     * 
     * @param {string} [effect='']
     * 
     * @memberOf Imager
     */
    getValidPSEffect(effect: string = ''): string {
        if (effect) {
            for (let k in EFFECTS_PS) {
                if (k === effect || EFFECTS_PS[k] === effect) {
                    return k;
                }
            }
        }
        else {
            return '';
        }
    }

    /**
     * PS效果
     * 
     * @param {Object} [opt={}]
     * 
     * @memberOf Imager
     */
    ps(opt: Object = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            let effect: string = opt['effect'] || '';
            effect = this.getValidPSEffect(effect);
            let img: HTMLImageElement = this._doms['img'];
            this._layer = $AI(img);
            if (this._layer && img && effect) {
                try {
                    if (this._curPSEffect && this._curPSEffect === effect) {
                        resolve({
                            status: STATUS.SUCESS,
                            data: {
                                dataUrl: img.src
                            }
                        });
                    }
                    else if (effect === EFFECT_ORIGIN) {
                        this._originLayer.clone().replace(img).complete(() => {
                            this._stack.push(img.src);
                            resolve({
                                status: STATUS.SUCESS,
                                data: {
                                    dataUrl: img.src
                                }
                            });
                        });
                    }
                    else {
                        this._layer.ps(effect).replace(img).complete(() => {
                            this._stack.push(img.src);
                            resolve({
                                status: STATUS.SUCESS,
                                data: {
                                    dataUrl: img.src
                                }
                            });
                        });
                    }
                    this._curPSEffect = effect;
                }
                catch (err) {
                    resolve({
                        status: STATUS.ERROR,
                        data: err
                    });
                }
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of params!'
                });
            }
        });
    }

    /**
     * 撤销
     * 
     * 
     * @memberOf Imager
     */
    undo(opt: Object = null): Promise<any> {
        if (this._layer) {
            let effectCategory = opt['effectCategory'];
            let img: HTMLImageElement = this._doms['img'];
            return Promise.resolve({
                status: STATUS.SUCESS,
                data: {
                    dataUrl: this._stack.load(FLAGS_STACK.BOTTOM)
                }
            });
        }
        return Promise.resolve({
            status: STATUS.FAIL
        });
    }

    /**
     * 恢复
     * 
     * @param {Object} [opt=null]
     * 
     * @memberOf Imager
     */
    redo(opt: Object = null): Promise<any> {
        if (this._layer) {
            return Promise.resolve({
                status: STATUS.SUCESS,
                data: {
                    dataUrl: this._stack.load(FLAGS_STACK.TOP)
                }
            })
        }
        return Promise.resolve({
            status: STATUS.FAIL
        });
    }

    /**
     * 重做
     * 
     * @param {Object} [opt=null]
     * 
     * @memberOf Imager
     */
    renew(): Promise<any> {
        if (this._layer) {
            let params = {
                effect: EFFECT_ORIGIN
            };
            return this.ps(params);
        }
        return Promise.resolve({
            status: STATUS.FAIL
        });
    }

    /**
     * 获得正确高级效果
     * 
     * @param {string} [effect='']
     * @returns {string}
     * 
     * @memberOf Imager
     */
    getValidActEffect(effect: string = ''): string {
        if (effect) {
            for (let k in EFFECTS_ACT) {
                if (effect === k || effect === EFFECTS_ACT[k]) {
                    return k;
                }
            }
        }
        return '';
    }

    /**
     * 剪裁
     * 
     * @param {number} x0 起始横坐标
     * @param {number} y0 起始纵坐标
     * @param {number} width 剪裁宽度
     * @param {number} height 剪裁高度
     * 
     * @memberOf Imager
     */
    clip(x0: number, y0: number, width: number, height: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this._layer) {
                let img: HTMLImageElement = this._doms['img'];
                try {
                    this._layer = $AI(img);
                    this._layer.clip(x0, y0, width, height).replace(img).complete(() => {
                        resolve({
                            status: STATUS.SUCESS,
                            data: {
                                dataUrl: img.src
                            }
                        });
                    })
                }
                catch (err) {
                    resolve({
                        status: STATUS.ERROR,
                        data: err
                    });
                }
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of layer!'
                });
            }
        });
    }

    /**
     * 旋转
     * 
     * @param {number} degree
     * 
     * @memberOf Imager
     */
    rotate(degree: number): void {
        if (this._layer) { }
    }

    /**
     * 缩放
     * 
     * @param {number} xRatio
     * @param {number} yRatio
     * 
     * @memberOf Imager
     */
    scale(xRatio: number, yRatio: number): void {
        if (this._layer) { }
    }

    /**
     * 仿射变换
     * 
     * @param {Array<number>} matrix
     * 
     * @memberOf Imager
     */
    transform(matrix: Array<number>): Promise<any> {
        return new Promise((resolve, reject) => {
            let img: HTMLImageElement = this._doms['img'];
            this._layer = $AI(img);
            if (this._layer) {
                try {
                    this._layer.transform(matrix)
                        .replace(img)
                        .complete(() => {
                            resolve({
                                status: STATUS.SUCESS,
                                data: {
                                    dataUrl: img.src
                                }
                            });
                        });
                }
                catch (err) {
                    resolve({
                        status: STATUS.ERROR,
                        data: err
                    });
                }
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of layer!'
                });
            }
        });
    }

    /**
     * 打开图像文件
     * 
     * @param {*} [fileUrl=null]
     * 
     * @memberOf Imager
     */
    loadImageFile(fileUrl: any = null): Promise<any> {
        let reader = new FileReader();
        let self = this;
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(fileUrl);
            reader.onload = function () {
                let img: HTMLImageElement = self._doms['img'];
                img.src = this.result;
                resolve({
                    status: STATUS.SUCESS
                });
            };
        });
    }

    /**
     * 获得图像宽高
     * 
     * @param {HTMLImageElement} imgElem
     * @returns {Promise<any>}
     * 
     * @memberOf Imager
     */
    getImageDimension(imgElem: HTMLImageElement): Promise<any> {
        return new Promise((resolve, reject) => {
            let width = 0, height = 0;
            if (imgElem && imgElem.src) {
                let image: HTMLImageElement = new Image();
                image.onload = () => {
                    width = image.naturalWidth;
                    height = image.naturalHeight;
                    resolve({
                        status: STATUS.SUCESS,
                        data: {
                            width, height
                        }
                    })
                };
                image.src = imgElem.src;
            }
            else {
                resolve({
                    status: STATUS.FAIL,
                    msg: 'Lack of Image Element!'
                });
            }
        });
    }
}