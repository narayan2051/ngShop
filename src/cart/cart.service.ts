import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { InventoryItem } from 'src/inventory/models/inventory-item.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {

  private readonly cart: BehaviorSubject<Cart>;

  constructor() {

    const initialCart: Cart = localStorage.getItem('ngBaitCart') !== null
      ? JSON.parse(localStorage.getItem('ngBaitCart') || "") : {
        items: [],
        numberOfCartItems: 0,
        cartTotal: 0
      };

    this.cart = new BehaviorSubject<Cart>(initialCart);
  }
  //observing
  get cart$(): Observable<Cart> {
    return this.cart.asObservable();
  }

  addItemsToCart(item: InventoryItem): void {

    const currentCart = this.cart.getValue();

    const newItems: CartInventoryItem[] = [
      ...currentCart.items,
      {
        ...item,
        cartUuid: uuidv4()
      }
    ]

    const newCart: Cart = {
      items: newItems,
      numberOfCartItems: newItems.length,
      cartTotal: currentCart.cartTotal + item.itemCost
    }
    this.cart.next(newCart);
    localStorage.setItem('ngBaitCart', JSON.stringify(newCart));
  }

  removeItemFromCart(item: CartInventoryItem): void {
    const currentCart = this.cart.getValue();
    const newItems = currentCart.items.filter(x => x.cartUuid !== item.cartUuid);
    const newCart: Cart = {
      items: newItems,
      numberOfCartItems: newItems.length,
      cartTotal: currentCart.cartTotal - item.itemCost
    }
    this.cart.next(newCart);
    localStorage.setItem("ngBaitCart", JSON.stringify(newCart))
  }

}

//Model data for cart
export interface Cart {
  items: CartInventoryItem[];
  numberOfCartItems: number;
  cartTotal: number;
}

export interface CartInventoryItem extends InventoryItem {

  cartUuid: string;

}
