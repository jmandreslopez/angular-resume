import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { HelpersService } from './helpers.service';
import { SeoService } from './seo.service';

@Injectable()
export class ScrollService {
    private active: string;
    private active$: Observable<string>;
    private activeObserver: Observer<string>;

    constructor(private pageScrollService: PageScrollService,
                private helpersService: HelpersService,
                private seoService: SeoService) {

        this.initObservables();
        this.initPageScroll();
    }

    // OBSERVABLES

    private initObservables() {
        this.active$ = new Observable<string>((observer: any) => this.activeObserver = observer).share();
    }

    public getActiveObservable(): Observable<string> {
        return this.active$;
    }

    // METHODS

    /**
     * Get active section
     *
     * @return string
     */
    public getActive(): string {
        return this.active;
    }

    /**
     * Set active section
     * - Change URL based on that
     * - Notify observables
     *
     * @param active: string
     */
    public setActive(active: string) {
        this.active = active;

        this.helpersService.changeUrl(this.getActive());

        if (!_.isUndefined(this.activeObserver)) {
            this.activeObserver.next(this.getActive());
        }
    }

    /**
     * Trigger change active section
     *
     * @param section: string
     */
    public changeActive(section: string) {
        this.setActive(section);
    }

    /**
     * Initialize PageScrollConfig
     */
    private initPageScroll() {

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
