import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAssistsPage } from './add-assists.page';

const routes: Routes = [
  {
    path: '',
    component: AddAssistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAssistsPageRoutingModule {}
