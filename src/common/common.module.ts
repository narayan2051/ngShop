import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ToggleFocusDirective } from './toggle-focus.directive';



@NgModule({
  declarations: [
    ToggleFocusDirective
  ],
  exports:[
    ToggleFocusDirective
  ],
  imports: [
    CommonModule
  ]
})
export class BaitCommonModule { }
