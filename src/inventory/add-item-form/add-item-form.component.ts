import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { InventoryItem } from '../models/inventory-item.model';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

  addItemFormGroup: FormGroup;
  constructor(private inventoryService: InventoryService) {
    this.addItemFormGroup = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemCost: new FormControl('0.00', [Validators.required, validateNumericControl]),
      itemDesc: new FormControl('', [Validators.required]),
      itemImageUri: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  addItem(): void {
    const item: InventoryItem = {
      ...this.addItemFormGroup.value,
      itemCost: +this.addItemFormGroup.value.itemCost
    }
    this.inventoryService.addInventoryItem(item);
  }

}

export const validateNumericControl = (control: AbstractControl): any => {
  let isNumeric = false;
  const value = control.value;

  const numericValue = +value;
  isNumeric = !Number.isNaN(numericValue);
  return isNumeric ? null : { valid: false };
}
