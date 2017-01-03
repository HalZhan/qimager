import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActItem } from './ActItem';

@Component({
    selector: 'act-item',
    templateUrl: './act-item.component.html'
})

export class ActItemComponent {
    @Input() actItem: ActItem;
    @Output() changeEvent: EventEmitter<any> = new EventEmitter();

    changeValue() {
        this.changeEvent.emit(this.actItem);
    }
}