import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventoryItem } from './models/inventory-item.model';

@Injectable()
export class InventoryService {

  private inventory: BehaviorSubject<InventoryItem[]>;


  constructor(private client: HttpClient) {
    this.inventory = new BehaviorSubject<InventoryItem[]>([]);
  }

  get inventory$(): Observable<InventoryItem[]> {
    return this.inventory.asObservable();
  }

  fetchItems(): void {
    this.client.get<InventoryItem[]>(environment.inventoryUri)
      .subscribe(data => {
        this.inventory.next(data);
      })
  }

  addInventoryItem(item: InventoryItem): void {
    this.client.post<InventoryItem>(environment.inventoryUri, item).pipe(
      take(1),
      map(() => {
        this.fetchItems();
      })
    ).subscribe();
  }

}
