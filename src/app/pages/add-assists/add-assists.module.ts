import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAssistsPageRoutingModule } from './add-assists-routing.module';

import { AddAssistsPage } from './add-assists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAssistsPageRoutingModule
  ],
  declarations: [AddAssistsPage]
})
export class AddAssistsPageModule {}
