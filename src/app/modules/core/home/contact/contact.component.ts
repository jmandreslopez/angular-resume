import { Component } from '@angular/core';
import { HelpersService } from '../../../../services';

@Component({
    selector: 'contact',
    templateUrl: 'contact.template.html',
    styleUrls: ['contact.styles.scss']
})
export class ContactComponent {
    public trackScrollConfig = {
        position: 'bottom',
        offset: 150
    };

    constructor(private helpersService: HelpersService) {
        //
    }

    public trackScrollEnter() {
        this.helpersService.changeUrl('contact');
    }

    public trackScrollLeave() {

        // This is an special case, because in order to work
        // properly we change the position of the tracker
        // to the bottom and in some cases, when scrolling
        // up the background section is still active preventing
        // to trigger the URL change
        this.helpersService.changeUrl('background');
    }
}
