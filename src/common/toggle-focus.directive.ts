import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleFocus]'
})
export class ToggleFocusDirective {

  isSelected = false; 

  constructor(private element: ElementRef) { }

  @HostListener('click', ['$event']) onClick($event: any) {
    this.isSelected = !this.isSelected;
    console.log(`clicked for selected: ${this.isSelected}`);
    this.element.nativeElement.style.background = this.isSelected ? 'gray' : 'white';
    this.element.nativeElement.style.color = this.isSelected ? 'white' : 'black';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent): void {
    console.log(`keydown -> ${event}`)
    if (event.code === 'Enter' && this, this.isSelected) {
      const button = this.element.nativeElement.querySelector('.delete');
      button.click();
    }
  }



}
