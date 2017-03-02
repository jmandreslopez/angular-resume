import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../../../services';

@Component({
	selector: 'home',
	templateUrl: 'home.template.html',
	styleUrls: ['home.styles.scss']
})
export class HomeComponent implements AfterViewInit {

    constructor(private route: ActivatedRoute,
                private scrollService: ScrollService) {
        //
    }

    public ngAfterViewInit() {
        if (!_.isEmpty(this.route.snapshot.url)) {
            let element = this.route.snapshot.url[0].path;
            this.scrollService.smoothTo(element);
        }
    }
}
