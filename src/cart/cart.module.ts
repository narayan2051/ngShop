import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { CartPillComponent } from './cart-pill/cart-pill.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BaitCommonModule } from 'src/common/common.module';

@NgModule({
  declarations: [
    CartPillComponent,
    CartViewComponent
  ],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    BaitCommonModule
  ],
  exports: [
    CartPillComponent,
    CartViewComponent
  ],
  providers: [
    CartService
  ]
})
export class CartModule { }
