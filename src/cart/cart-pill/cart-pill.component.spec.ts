import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable, of } from 'rxjs';
import { Cart, CartService } from '../cart.service';

import { CartPillComponent } from './cart-pill.component';


fdescribe('CartPillComponent', () => {
  let component: CartPillComponent;
  let fixture: ComponentFixture<CartPillComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {

    mockCartService = jasmine.createSpyObj('CartService', ['removeItemFromCart'], ['cart$']);


    await TestBed.configureTestingModule({
      declarations: [CartPillComponent],
      imports:[MatBadgeModule],
      providers: [
        { provide: CartService, useValue: mockCartService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {

    const mockCart: Cart = {
      numberOfCartItems: 2,
      cartTotal: 100.01,
      items: [
        {
          itemName: 'mock-name-1',
          itemCost: 100,
          itemDesc: 'mock-desc-1',
          cartUuid: 'mock-uuid-1'
        },
        {
          itemName: 'mock-name-2',
          itemCost: 0.01,
          itemDesc: 'mock-desc-2',
          cartUuid: 'mock-uuid-2'
        }
      ]
    };

    const mockCartObservable: Observable<Cart> = of(mockCart);

    //@ts-ignore
    Object.getOwnPropertyDescriptor(mockCartService, 'cart$').get.and.returnValue(mockCartObservable);


    fixture = TestBed.createComponent(CartPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Should have number of item ', () => {
    let el: Element = fixture.nativeElement.querySelector(".mat-badge-content");
    fixture.detectChanges()
    expect(el.textContent).toEqual('2');
  })

});
