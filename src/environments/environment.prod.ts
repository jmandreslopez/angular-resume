import { disableDebugTools } from '@angular/platform-browser';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { PROVIDERS } from './environment.common';
import { metrics } from './metrics';

let _decorateModuleRef = <T>(value: T): T => { return value; };

// Enable Production Mode
enableProdMode();

// Production
_decorateModuleRef = (modRef: any) => {
    disableDebugTools();

    // Start metrics
    metrics();

    return modRef;
};

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
    ...PROVIDERS,
    // custom providers in production
];
