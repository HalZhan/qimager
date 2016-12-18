/// <reference path="../declarations.d.ts" />

import 'AlloyImage';

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
 * 高级效果
 */
export const EFFECTS_ACT: Object = {
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
export const EFFECTS_PS: Object = {
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
    _layer: any = null;
    _count: number = 0;
    _hasDoView: boolean = false;

    constructor(opt: Object = {}) {
        this._doms['img'] = opt['img'];
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
            let img: HTMLImageElement = this._doms['img'] || null;
            if (img) {
                img.loadOnce(() => {
                    this._layer = $AI(img);
                    try {
                        resolve({
                            status: STATUS.SUCESS
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
        return this._initLayer();
    }

    /**
     * 图像处理
     * 
     * @param {Object} [opt={}]
     * 
     * @memberOf Imager
     */
    act(opt: Object = {}): void {
        let effect: string = opt['effect'] || '';
        effect = this.getValidActEffect(effect)
        if (this.getValidActEffect(effect) && this._layer) {
            let img = this._doms['img'];
            switch (effect) {
                case 'origin':
                    this.displayOrigin();
                    break;
                default:
                    this._addCount();
                    this._layer.view(effect).replace(img);
                    this._layer.doView();
                    this._hasDoView = true;
                    break;
            }
        }
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
            let img = this._doms['img'];
            if (this._layer && img && effect) {
                try {
                    if (effect === EFFECT_ORIGIN) {
                        this._layer.clone().replace(img).complete(() => {
                            resolve({
                                status: STATUS.SUCESS
                            });
                        });
                    }
                    else {
                        this._layer.clone().ps(effect).replace(img).complete(() => {
                            resolve({
                                status: STATUS.SUCESS
                            });
                        });
                    }
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
                    msg: 'Lacked params!'
                });
            }
        });
    }

    /**
     * 增加处理计数
     * 
     * 
     * @memberOf Imager
     */
    _addCount(): void {
        this._count++;
    }

    /**
     * 减少处理计数
     * 
     * 
     * @memberOf Imager
     */
    _minusCount(): void {
        this._count--;
        this._count = this._count < 0 ? 0 : this._count;
    }

    /**
     * 显示原图
     * 
     * 
     * @memberOf Imager
     */
    displayOrigin(): void {
        if (this._layer) {
            while (this._count) {
                this.undo();
            }
        }
    }

    /**
     * 撤销
     * 
     * 
     * @memberOf Imager
     */
    undo(): void {
        if (this._layer) {
            let img = this._doms['img'];
            if (this._hasDoView && img) {
                this._layer.undoView().replace(img);
                this._hasDoView = false;
            }

            this._minusCount();
            this._layer.undoView().show();
        }
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
    clip(x0: number, y0: number, width: number, height: number): void {
        if (this._layer) {

        }
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
    transform(matrix: Array<number>): void {
        if (this._layer) { }
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
     * 保存图像文件
     * 
     * @returns {Promise<any>}
     * 
     * @memberOf Imager
     */
    saveImageFile(): Promise<any> {
        return new Promise((resolve, reject) => {
            let iframe: HTMLIFrameElement = <HTMLIFrameElement>window.frames[SELECTORS.SAVE_IFRAME];
            if (!iframe) {
                iframe = <HTMLIFrameElement>document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.id = SELECTORS.SAVE_IFRAME;
                iframe.name = SELECTORS.SAVE_IFRAME;
                // let script = <HTMLScriptElement>document.createElement('script');
                // script.innerText = `document.domain=${location.host}`;
                // iframe.contentWindow.document.body.appendChild(script);
                document.querySelector('body').appendChild(iframe);
            }
            iframe.onload = () => {
                window.frames[SELECTORS.SAVE_IFRAME].document.execCommand('saveAs');
            };
            iframe.src = this._layer.save();
        });
    }
}