import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';
@Component({
  //eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngshop-inventory-list-item',
  templateUrl: './inventory-list-item.component.html',
  styleUrls: ['./inventory-list-item.component.scss']
})
export class InventoryListItemComponent {

  @Input()
  item: InventoryItem | undefined;

  @Output() addItemEvent: EventEmitter<InventoryItem> = new EventEmitter();

  constructor() { }


  onItemAddClick(): void {
    console.log(`${this.item?.itemName} has been clicked`);
    this.addItemEvent.emit(this.item);
  }

}



