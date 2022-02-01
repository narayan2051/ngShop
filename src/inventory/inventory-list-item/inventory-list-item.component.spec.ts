import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListItemComponent } from './inventory-list-item.component';

describe('InventoryListItemComponent', () => {
  let component: InventoryListItemComponent;
  let fixture: ComponentFixture<InventoryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
