import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../inventory.service';

import { AddItemFormComponent } from './add-item-form.component';

describe('AddItemFormComponent', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;
  let compiled: any; 
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {

    mockInventoryService = jasmine.createSpyObj('InventoryService', ['addInventoryItem']);

    await TestBed.configureTestingModule({
      declarations: [AddItemFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create with form element', () => {
    expect(component).toBeTruthy();

    expect(compiled.querySelector('form#add-item-form')).toBeTruthy();
    expect(compiled.querySelector('input#item-name')).toBeTruthy();
    expect(compiled.querySelector('input#item-cost')).toBeTruthy();
    expect(compiled.querySelector('textarea#item-desc')).toBeTruthy();
    expect(compiled.querySelector('input#item-image-uri')).toBeTruthy();
    expect(compiled.querySelector('button#submit-item').disabled).toBeTruthy();
  });

  it('should be enable when required fields have input', () => {

    let button = compiled.querySelector('button#submit-item');
    expect(button.disabled).toBeTruthy();

    let el = compiled.querySelector('input#item-name');
    el.value = 'Mock Item Name';
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('input#item-cost');
    el.value = 10.01;
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('textarea#item-desc');
    el.value = "Mock Item Description";
    el.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    button = compiled.querySelector('button#submit-item');
    expect(button.disabled).toBeFalsy();

  })

  it('Should enable when required fields and numeric cost have input', () => {
    let button = compiled.querySelector('button#submit-item');
    expect(button.disabled).toBeTruthy();

    let el = compiled.querySelector('input#item-name');
    el.value = 'Mock Item Name';
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('input#item-cost');
    el.value = "abc10";
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('textarea#item-desc');
    el.value = "Mock Item Description";
    el.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    button = compiled.querySelector('button#submit-item');
    expect(button.disabled).toBeTruthy();

    el = compiled.querySelector('input#item-cost');
    el.value = 10.01;

    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();
  });

  it('Should call inventory service add when submit is clicked', () => {
    let el = compiled.querySelector('input#item-name');
    el.value = 'Mock Item Name';
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('input#item-cost');
    el.value = 10.01;
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('textarea#item-desc');
    el.value = "Mock Item Description";
    el.dispatchEvent(new Event('input'));

    el = compiled.querySelector('input#item-image-uri');
    el.value = 'Mock Image URI';
    el.dispatchEvent(new Event('input'))

    fixture.detectChanges();

    const button = compiled.querySelector('button#submit-item');
    button.click();

    fixture.detectChanges();

    expect(
      mockInventoryService.addInventoryItem).toHaveBeenCalledWith({
        itemName: 'Mock Item Name',
        itemCost: 10.01,
        itemDesc: 'Mock Item Description',
        itemImageUri: 'Mock Image URI'
      });

  })
});
