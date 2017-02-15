import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HelpersService } from '../helpers.service';

@Injectable()
export class StyleLoaderService {

    constructor(private helpersService: HelpersService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public insert(url) {
        if (!_.isUndefined(url)) {
            !_.isArray(url) ? this.inject(url) : _.forEach(url, (u) => this.inject(u));
        }
    }

    private inject(url) {
        let element = document.createElement('link');
        element.setAttribute('rel', 'stylesheet');
        element.setAttribute('type', 'text/css');
        element.setAttribute('href', url);

        document.getElementsByTagName('head')[0].appendChild(element);
    }

    public remove(elements: string|Array<string>) {
        if (!_.isUndefined(elements)) {
            if (!_.isArray(elements)) {
                this.helpersService.removeFile(elements, 'css');
            }
            else {
                _.forEach(elements, (element) => this.helpersService.removeFile(element, 'css'));
            }
        }
    }
}
