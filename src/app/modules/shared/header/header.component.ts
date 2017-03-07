import * as _ from 'lodash';
import { Component } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { ConfigModel, SocialModel } from '../../../models';
import { ScrollService, NavigationService } from '../../../services';

declare let document: any;

@Component({
	selector: 'header',
	templateUrl: 'header.template.html',
	styleUrls: ['header.styles.scss']
})
export class HeaderComponent {
    private config: ConfigModel = process.env;
    public socials: Array<SocialModel> = [
        { label: 'Linkedin', url: this.config.LINKEDIN_URL, icon: 'fa-linkedin-square' },
        { label: 'GitHub',   url: this.config.GITHUB_URL,   icon: 'fa-github-square' },
        { label: 'Codepen',  url: this.config.CODEPEN_URL,  icon: 'fa-codepen' },
        { label: 'Twitter',  url: this.config.TWITTER_URL,  icon: 'fa-twitter-square' },
        { label: 'Facebook', url: this.config.FACEBOOK_URL, icon: 'fa-facebook-official' },
    ];

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
