import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-pill',
  templateUrl: './cart-pill.component.html',
  styleUrls: ['./cart-pill.component.scss']
})
export class CartPillComponent implements OnInit,OnDestroy {
  numberOfCartItems: number = 0;

  subscription: Subscription | undefined;
  constructor(private cardService: CartService) { }

  ngOnInit(): void {

    //Subscribing the annyonimus function
    this.cardService.cart$.subscribe((cart) => {
      this.numberOfCartItems = cart.numberOfCartItems;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

