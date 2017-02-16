import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { HelpersService } from './helpers.service';
import { SeoService } from './seo.service';

@Injectable()
export class ScrollService {

    constructor(private pageScrollService: PageScrollService,
                private helpersService: HelpersService,
                private seoService: SeoService) {

        // PageScroll configuration
        PageScrollConfig.defaultScrollOffset = 80; // pixels
        PageScrollConfig.defaultDuration = 1250; // miliseconds
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                t /= d; t--;
	            return c * ( t * t * t + 1) + b;
            }
        };
    }

    /**
     * Smooth scroll to a document ID
     *
     * @input target: string - i.e. 'about'
     */
    // public scrollTo(event: Event, target: string, fallbackRoute: string) {
    public smoothTo(target: string) {

        // Check if target is defined
        if (!_.isUndefined(target) && target !== '') {

            // Prepend # to the target
            let element: string = '#' + target;

            let instance = PageScrollInstance.advancedInstance(document, element, null, '', true);
            this.pageScrollService.start(instance);

            // Prevent "Home" to appear on the URL and Title
            target = (target === 'home') ? '' : target;

            // Updating the URL and Title with the new "route"
            this.helpersService.changeUrl(target);
        }
    }
}
