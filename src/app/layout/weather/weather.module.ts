import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherRoutingModule } from './weather-routing.module'


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatSelectModule, TranslateModule, NgbModule, WeatherRoutingModule
  ],
  declarations: [
    WeatherComponent
  ]
})
export class WeatherModule { }
