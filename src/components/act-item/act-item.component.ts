import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ActItem } from './ActItem';

@Component({
    selector: 'act-item',
    templateUrl: './act-item.component.html'
})

export class ActItemComponent {
    @Input() actItem: ActItem;
    @Output() changeEvent: EventEmitter<any> = new EventEmitter();
    @Output() selectEvent: EventEmitter<any> = new EventEmitter();

    changeValue(): void {
        this.changeEvent.emit(this.actItem);
    }

    toggleSelected(): void {
        this.actItem.selected = !this.actItem.selected;
        this.selectEvent.emit(this.actItem);
    }
}