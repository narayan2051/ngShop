import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ToggleFocusDirective } from 'src/common/toggle-focus.directive';
import { Cart, CartService } from '../cart.service';

import { CartViewComponent } from './cart-view.component';

describe('CartViewComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {

    mockCartService = jasmine.createSpyObj('CartService', ['removeItemFromCart'], ['cart$'])



    await TestBed.configureTestingModule({
      declarations: [CartViewComponent, ToggleFocusDirective],
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

    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    //Better to put on each it function if you want to change the mock data for specific test case
    //    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display our cart items', () => {
    //It calls the component lifecycle event like onInit every time (because we are subscribing on onIninit)
    fixture.detectChanges();
    const listItems: Element[] = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(listItems.length).toEqual(2);

    let el = listItems[0].querySelector('.sub-line');
    expect(el?.textContent).toContain('$100.00')

    el = listItems[1].querySelector('.sub-line');
    expect(el?.textContent).toContain('$0.01');

    el = listItems[0].querySelector('div[mat-line]');
    expect(el?.textContent).toContain('mock-name-1');

    el = listItems[1].querySelector('div[mat-line]');
    expect(el?.textContent).toContain('mock-name-2');

    expect(
      fixture.nativeElement.querySelector('h2').textContent).toContain('2');

    expect(
      fixture.nativeElement.querySelector('h3').textContent).toContain('$100.01')

  });

  it('Should delete on delete icon click', () => {

    const mockCart: Cart = {
      numberOfCartItems: 2,
      cartTotal: 100.11,
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
        },
        {
          itemName: 'mock-name-3',
          itemCost: 0.1,
          itemDesc: 'mock-desc-3',
          cartUuid: 'mock-uuid-3'
        }
      ]
    };

    const mockCartObservable: Observable<Cart> = of(mockCart);

    //@ts-ignore
    Object.getOwnPropertyDescriptor(mockCartService, 'cart$').get.and.returnValue(mockCartObservable);
    //It calls the component lifecycle event like onInit every time (because we are subscribing on onIninit)
    fixture.detectChanges();
    let icons: Element[] = fixture.nativeElement.querySelectorAll('mat-icon.delete');

    expect(icons.length).toEqual(3);

    (icons[0] as any).click();
    (icons[1] as any).click();
    (icons[2] as any).click();

    // expect(mockCartService.removeItemFromCart).toHaveBeenCalledTimes(1);
    expect(mockCartService.removeItemFromCart).toHaveBeenCalledTimes(3);
    expect(mockCartService.removeItemFromCart).toHaveBeenCalledWith(mockCart.items[0]);
    expect(mockCartService.removeItemFromCart).toHaveBeenCalledWith(mockCart.items[1]);
    expect(mockCartService.removeItemFromCart).toHaveBeenCalledWith(mockCart.items[2]);
  });

  it('Should change color when clicked', () => {
    fixture.detectChanges();
    const complied = fixture.nativeElement;
    const itemsEls: Element[] = complied.querySelectorAll('mat-list-item');
    const item = itemsEls[0] as any;

    expect(item.style.background).toEqual('');

    item.click();
    expect(item.style.background).toEqual('gray');

    item.click();
    expect(item.style.background).toEqual('white');
  });

  it("Should delete selected items when Enter key pressed", () => {
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelectorAll('mat-list-item')[1];

    item.click();

    const event = new KeyboardEvent('keydown', {
      code: 'Enter'
    });

    document.dispatchEvent(event);

    expect(
      mockCartService.removeItemFromCart
    ).toHaveBeenCalledWith({
      itemName: 'mock-name-2',
      itemCost: 0.01,
      itemDesc: 'mock-desc-2',
      cartUuid: 'mock-uuid-2'
    })

  })
});
