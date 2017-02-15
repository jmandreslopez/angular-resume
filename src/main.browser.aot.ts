import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './environments/environment.prod';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
    return platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory)
        .then(decorateModuleRef)
        .catch(err => console.error(err));
}

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
