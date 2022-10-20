import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'assists',
        loadChildren: () => import('../assists/assists.module').then( m => m.AssistsPageModule)
      },
      {
        path: 'add-assists',
        loadChildren: () => import('../add-assists/add-assists.module').then(m => m.AddAssistsPageModule)
      },
      {
        path: 'edit-assists',
        loadChildren: () => import('../edit-assists/edit-assists.module').then( m => m.EditAssistsPageModule)
      }
    
      
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
