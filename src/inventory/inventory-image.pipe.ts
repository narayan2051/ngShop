import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryImage'
})
export class InventoryImagePipe implements PipeTransform {

  private readonly defaultUri = "https://media.istockphoto.com/vectors/photo-coming-soon-picture-frame-vector-illustration-vector-id1093292834?s=612x612";

  transform(value: string | null | undefined): string {
    return value === undefined || value === null ? this.defaultUri : value;
  }

}


