import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HelpersService } from '../helpers.service';

@Injectable()
export class ScriptLoaderService {

    constructor(private helpersService: HelpersService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    public insert(content: string|Array<string>, type: string = 'link'): Array<HTMLScriptElement> {
        let elements: Array<HTMLScriptElement> = [];
        if (!_.isUndefined(content)) {
            if (!_.isArray(content)) {
                elements.push(this.inject(content, type));

            }
            else {
                _.forEach(content, (c: string) => {
                    elements.push(this.inject(c, type));
                });
            }
        }

        return elements;
    }

    private inject(content: string, type: string): HTMLScriptElement {
        let element = <HTMLScriptElement>document.createElement('script');
        element.type = 'text/javascript';

        if (type === 'link') {
            element.src = content;
        }
        else {
            try {
                element.appendChild(document.createTextNode(content));
            }
            catch (e) {
                element.text = content;
            }
        }

        (document.body ? document.body : document.getElementsByTagName('head')[0]).appendChild(element);

        return element;
    }

    public remove(elements: string|Array<string>|HTMLScriptElement|Array<HTMLScriptElement>) {
        if (!_.isUndefined(elements)) {
            if (!_.isArray(elements)) {
                this.helpersService.removeFile(elements, 'js');
            }
            else {
                _.forEach(elements, (element) => this.helpersService.removeFile(element, 'js'));
            }
        }
    }
}
