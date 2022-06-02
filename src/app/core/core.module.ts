import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';

import { MaterialModule } from '@app/material.module';
import { InternationalizationModule } from '@app/internationalization.module';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    InternationalizationModule
  ],
  providers: []
})
export class CoreModule { }
