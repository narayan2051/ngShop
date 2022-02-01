import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartViewComponent } from 'src/cart/cart-view/cart-view.component';
import { InventoryListComponent } from 'src/inventory/inventory-list/inventory-list.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryListComponent },
  { path: 'cart', component: CartViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
