import { Component } from '@angular/core';
import { ScrollService } from '../../../../services';

@Component({
    selector: 'greeting',
    templateUrl: 'greeting.template.html',
    styleUrls: ['greeting.styles.scss']
})
export class GreetingComponent {

    constructor(private scrollService: ScrollService) {
        //
    }

    // METHODS

    public trackScrollEnter() {
        this.scrollService.changeActive('');
    }
}
