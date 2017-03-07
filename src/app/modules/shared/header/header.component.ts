import * as _ from 'lodash';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { ConfigModel, SocialModel } from '../../../models';
import { ScrollService, NavigationService, HelpersService } from '../../../services';

declare let document: any;

@Component({
	selector: 'header',
	templateUrl: 'header.template.html',
	styleUrls: ['header.styles.scss']
})
export class HeaderComponent {
    @ViewChild('nav', { read: ElementRef }) nav: ElementRef;
    @ViewChild('home', { read: ElementRef }) home: ElementRef;
    @ViewChild('about', { read: ElementRef }) about: ElementRef;
    @ViewChild('skills', { read: ElementRef }) skills: ElementRef;
    @ViewChild('background', { read: ElementRef }) background: ElementRef;
    @ViewChild('contact', { read: ElementRef }) contact: ElementRef;
    private config: ConfigModel = process.env;
    public socials: Array<SocialModel> = [
        { label: 'Linkedin', url: this.config.LINKEDIN_URL, icon: 'fa-linkedin-square' },
        { label: 'GitHub',   url: this.config.GITHUB_URL,   icon: 'fa-github-square' },
        { label: 'Codepen',  url: this.config.CODEPEN_URL,  icon: 'fa-codepen' },
        { label: 'Twitter',  url: this.config.TWITTER_URL,  icon: 'fa-twitter-square' },
        { label: 'Facebook', url: this.config.FACEBOOK_URL, icon: 'fa-facebook-official' },
    ];

    constructor(private scrollService: ScrollService,
                private navigationService: NavigationService,
                private helpersService: HelpersService) {

        this.bindObservables();
    }

    // OBSERVABLES

    private bindObservables() {
        this.scrollService.getActiveObservable().subscribe((active: string) => this.onActive(active));
    }

    // EVENTS

    private onActive(active: string) {
        if (!_.isUndefined(active)) {

            // Reset class 'active' elements
            this.removeActiveElements();

            // Select element based on active section
            this.selectActive(active);
        }
    }

    // METHODS

    private removeActiveElements() {

        // Get elements with class 'active'
        let elements = this.nav.nativeElement.getElementsByClassName('active');
        if (!_.isNil(elements)) {

            // Loop elements and remove class 'active'
            _.forEach(elements, (element: HTMLElement) => {
                this.helpersService.removeClass(element, 'active');
            });
        }
    }

    private selectActive(active) {
        let element = undefined;

        // Select HTMLElement based on the active section
        switch (active) {
            case 'about':
                element = this.about.nativeElement;
                break;

            case 'skills':
                element = this.skills.nativeElement;
                break;

            case 'background':
                element = this.background.nativeElement;
                break;

            case 'contact':
                element = this.contact.nativeElement;
                break;

            // Home
            default:
                element = this.home.nativeElement;
                break;
        }

        // Add class 'active'
        if (!_.isUndefined(element)) {
            this.helpersService.addClass(element, 'active');
        }
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
