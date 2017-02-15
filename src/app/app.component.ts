import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.template.html',
    styleUrls: ['app.styles.scss'],
    encapsulation: ViewEncapsulation.None // make styles global
})
export class AppComponent {
    //
}
