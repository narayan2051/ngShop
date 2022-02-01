import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/cart/cart.service';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../models/inventory-item.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  inventoryItems: InventoryItem[] | undefined;

  constructor(private inventoryService: InventoryService, private cartService: CartService) { }

  ngOnInit(): void {
    this.inventoryService.inventory$.subscribe(items => {
      console.log("yes its fire");
      this.inventoryItems = items;
    });
    this.inventoryService.fetchItems();
  }

  onAddItemEvent(item: InventoryItem): void {
    console.log(`the ${item?.itemName} has been selected for cart`);
    this.cartService.addItemsToCart(item);
  }

}


