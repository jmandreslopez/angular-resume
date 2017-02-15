import * as _ from 'lodash';
import { Component } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { ScrollService, NavigationService } from '../../../services';

declare let document: any;

@Component({
	selector: 'header',
	templateUrl: 'header.template.html',
	styleUrls: ['header.styles.scss']
})
export class HeaderComponent {
    isScrolled = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 15;

    constructor(private scrollService: ScrollService,
                private navigationService: NavigationService) {
        //
    }

    public scrollTo(event: Event, target: string) {

        // Prevent default click event
        event.preventDefault();

        // Check if target is defined
        if (!_.isUndefined(target) && target !== '') {

            // If there's no ID in the document, treat this as a link
            if (_.isNil(document.getElementById(target))) {

                let element: any = event.target;
                let route = element.getAttribute('routerlink') || element.getAttribute('href');

                if (!_.isNil(route)) {

                    // Navigate using the NavigationService
                    this.navigationService.navigate([route]);
                }
            }

            // Smooth scroll to the ID
            else {
                this.scrollService.smoothTo(target);
            }
        }
    }
}
