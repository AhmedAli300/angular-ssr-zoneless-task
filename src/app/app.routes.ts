import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePageComponent),
    title: 'Digital Bond | Premier Digital Marketing & Tech Agency'
  },
  {
    path: 'done',
    loadComponent: () => import('./pages/done/done-page.component').then(m => m.DonePageComponent),
    title: 'Thank You | Digital Bond - Let’s Bond Together'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
