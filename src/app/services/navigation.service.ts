import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Injectable()
export class NavigationService {

    constructor(private router: Router) {
        //
    }

    public navigate(commands: Array<any>, extras?: NavigationExtras): Promise<boolean> {

        // This acts as a middleware
        // Here we can implement accions before the
        // router navigation gets triggered

        return this.router.navigate(commands, extras);
    }
}
