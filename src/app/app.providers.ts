import { ScriptLoaderService } from './services';
import { StyleLoaderService } from './services';
import { HelpersService } from './services';
import { LoggerService } from './services';
import { SeoService } from './services';
import { NavigationService } from './services';
import { ScrollService } from './services';

// Application providers
export const providers = [
    ScriptLoaderService,
    StyleLoaderService,
    HelpersService,
    LoggerService,
    SeoService,
    NavigationService,
    ScrollService,
];
