import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InventoryItem } from 'src/inventory/models/inventory-item.model';
import { Cart, CartInventoryItem, CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit, OnDestroy {

  cart: Cart | undefined;

  cart$: Observable<Cart> | undefined;

  subscription: Subscription | undefined;

  constructor(private cartService: CartService) { }


  // using observable On Template
  ngOnInit(): void {
    //This is one way of doing with async pipe and observable
    this.cart$ = this.cartService.cart$;

    //This is another way of subscribing with code
    this.subscription = this.cart$.subscribe(cartStuff => {
      this.cart = cartStuff;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onDeleteItem(item:CartInventoryItem):void{
    this.cartService.removeItemFromCart(item);
  }

}
