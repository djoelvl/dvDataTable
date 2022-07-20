import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DvDataTableComponent } from './dv-data-table.component';
import {NbButton, NbButtonModule, NbIconModule} from '@nebular/theme'
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DvDataTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    
    
    
  ],
  exports: [
    DvDataTableComponent
  ]
})
export class DvDataTableModule { }
