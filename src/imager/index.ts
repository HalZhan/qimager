/// <reference path="../declarations.d.ts" />

import 'AlloyImage';

const EFFECTS: Object = {
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

class Imager {
    _doms: Object = {
        img: HTMLElement
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
    _initLayer(): void {
        let img: HTMLElement = this._doms['img'] || null;
        if (img) {
            this._layer = $AI(img);
        }
    }

    /**
     * 图像处理
     * 
     * @param {Object} [opt={}]
     * 
     * @memberOf Imager
     */
    dealImg(opt: Object = {}): void {
        let effect: string = opt['effect'] || '';
        effect = this._getValidEffect(effect)
        if (this._getValidEffect(effect) && this._layer) {
            switch (effect) {
                case 'origin':
                    this.displayOrigin();
                    break;
                default:
                    this._addCount();
                    this._layer.view(effect).show();
                    this._layer.doView();
                    this._hasDoView = true;
                    break;
            }
        }
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
            if (this._hasDoView) {
                this._layer.undoView().show();
                this._hasDoView = false;
            }

            this._minusCount();
            this._layer.undoView().show();
        }
    }

    /**
     * 获得正确效果
     * 
     * @param {string} [effect='']
     * @returns {string}
     * 
     * @memberOf Imager
     */
    _getValidEffect(effect: string = ''): string {
        if (effect) {
            for (let k in EFFECTS) {
                if (effect === k || effect === EFFECTS[k]) {
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
        if(this._layer) {
            
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
        if(this._layer) {}
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
        if(this._layer) {}
    }

    /**
     * 仿射变换
     * 
     * @param {Array<number>} matrix
     * 
     * @memberOf Imager
     */
    transform(matrix: Array<number>): void {
        if(this._layer) {}
    }
}

export default Imager;