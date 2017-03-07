import { Component } from '@angular/core';
import { ConfigModel, SocialModel } from '../../../../models';
import { ScrollService } from '../../../../services';

@Component({
    selector: 'contact',
    templateUrl: 'contact.template.html',
    styleUrls: ['contact.styles.scss']
})
export class ContactComponent {
    public trackScrollConfig = { position: 'bottom', offset: 200 };
    private config: ConfigModel = process.env;
    public socials: Array<SocialModel> = [
        { url: this.config.LINKEDIN_URL, icon: 'fa-linkedin-square' },
        { url: this.config.GITHUB_URL,   icon: 'fa-github-square' },
        { url: this.config.CODEPEN_URL,  icon: 'fa-codepen' },
        { url: this.config.TWITTER_URL,  icon: 'fa-twitter-square' },
        { url: this.config.FACEBOOK_URL, icon: 'fa-facebook-official' },
    ];

    // Google Maps
    // Location: Austin, TX
    public latitude: number = 30.2672;
    public longitude: number = -97.7431;
    public zoom: number = 13;

    constructor(private scrollService: ScrollService) {
        //
    }

    // METHODS

    public trackScrollEnter() {
        this.scrollService.changeActive('contact');
    }

    public trackScrollLeave() {

        // This is an special case, because in order to work
        // properly we change the position of the tracker
        // to the bottom and in some cases, when scrolling
        // up the background section is still active preventing
        // to trigger the URL change
        this.scrollService.changeActive('background');
    }
}
