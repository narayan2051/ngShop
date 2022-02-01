import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryListItemComponent } from './inventory-list-item/inventory-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { InventoryImagePipe } from './inventory-image.pipe';
import { MatButtonModule } from '@angular/material/button';
import { InventoryService } from './inventory.service';
import { HttpClientModule } from '@angular/common/http';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';

@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryListItemComponent,
    InventoryImagePipe,
    AddItemFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    InventoryListComponent
  ],
  providers:[
    InventoryService
  ]
})
export class InventoryModule { }
