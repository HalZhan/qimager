/**
 * 栈操作标识
 */
export const FLAGS_STACK = {
    NODIRECTION: 0,
    TOP: 1,
    BOTTOM: -1
};

/**
 * desc: 栈
 * author: zhanghao
 * date: 2016/12/19
 * 
 * @export
 * @class Stack
 */
export class Stack {
    _stack: Array<any> = [];
    _ptr: number = -1;
    constructor() { }

    /**
     * 将指针上移
     * 
     * 
     * @memberOf Stack
     */
    _moveTop(): void {
        let total = this._stack.length;
        this._ptr = this._ptr < total - 1 ? this._ptr + 1 : total - 1;
    }

    /**
     * 将指针下移
     * 
     * 
     * @memberOf Stack
     */
    _moveBottom(): void {
        let total = this._stack.length;
        if(total) {
            this._ptr = this._ptr < 1 ? 0 : this._ptr - 1;
        }
        else {
            this._ptr = -1;
        }
    }

    /**
     * 将元素放入栈顶
     * 
     * @param {*} elem
     * 
     * @memberOf Stack
     */
    push(elem: any): void {
        if (elem) {
            this._stack.push(elem);
            this._ptr++;
        }
    }

    /**
     * 从栈顶弹出元素
     * 
     * @returns {void}
     * 
     * @memberOf Stack
     */
    pop(): void {
        if (this._stack && this._stack.length) {
            this._ptr--;
            return this._stack.pop();
        }
    }

    /**
     * 按指定方向移动指针并读出元素
     * 
     * @param {number} [direction=0]
     * @returns {*}
     * 
     * @memberOf Stack
     */
    load(direction: number = 0): any {
        if (direction === FLAGS_STACK.TOP) {
            this._moveTop();
        }
        else if(direction === FLAGS_STACK.BOTTOM) {
            this._moveBottom();
        }
        return this._stack[this._ptr];
    }

    /**
     * 重置栈
     * 
     * 
     * @memberOf Stack
     */
    reset(): void {
        this._stack = [];
        this._ptr = -1;
    }

    /**
     * 销毁栈
     * 
     * 
     * @memberOf Stack
     */
    destroy(): void {
        this._stack = null;
        this._ptr = -1;
    }
};