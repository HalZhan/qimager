export class ActItemOption {
    optionName: string = '';
    value: number | string = 0;
    min: number = -50;
    step: number = 1;
    max: number = 50;
    type: string = 'range';
}

export class ActItem {
    actName: string = '';
    actEffect: string = '';
    actIcon: string = '';
    selected: boolean = false;
    options: Array<ActItemOption> = [];
    negativeTitle: string = '取消';
    positiveTitle: string = '确定';
    negativeCb: any = function () { };
    positiveCb: any = function () { };
}