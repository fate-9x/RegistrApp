import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAssistsPageRoutingModule } from './edit-assists-routing.module';

import { EditAssistsPage } from './edit-assists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAssistsPageRoutingModule
  ],
  declarations: [EditAssistsPage]
})
export class EditAssistsPageModule {}
