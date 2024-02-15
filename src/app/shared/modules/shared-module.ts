import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumPipe } from '../../shared/pipes/sum-pipe.pipe';

@NgModule({
  declarations: [
    SumPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SumPipe
  ]
})
export class CustomPipeModule { }
