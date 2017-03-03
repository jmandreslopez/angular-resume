import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from '../modules';
import { NotFoundComponent } from '../modules';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: HomeComponent,
    },
    {
        path: 'skills',
        component: HomeComponent,
    },
    {
        path: 'background',
        component: HomeComponent,
    },
    {
        path: 'contact',
        component: HomeComponent,
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
