import { Injectable, ElementRef } from '@angular/core';
import { LoggerService } from './logger.service';

declare let document: any;
declare let window: any;

let browser = require('detect-browser');

@Injectable()
export class HelpersService {

    constructor(private loggerService: LoggerService) {
        //
    }

    /**
     * Description: Convert a string into a number, a shortcut for the vanilla parseInt function
     *
     * @input value: any - The string to be converted
     * @return number
     */
    public convertToNumber(value: any): number {
        return parseInt(value, 10);
    }

    /**
     * Description: Add a class name to an element
     *
     * @input el - ElementRef
     * @input className: string - Class name
     */
    public addClass(el, className: string) {
        el.classList ? el.classList.add(className) : el.className += ' ' + className;
    }

    /**
     * Description: Check if ther element has a class name
     *
     * @input el - ElementRef
     * @input className: string - Class name
     * @return boolean
     */
    public hasClass(el, className: string) {
        return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    /**
     * Description: Remove a class name to an element
     *
     * @input el - ElementRef
     * @input className: string - Class name
     */
    public removeClass(el, className: string) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    /**
     * Description: Add a vanilla javascript event attached to an element
     *
     * @input el: ElementRef
     * @input type: string - Event type (click, mouse, ...)
     * @input handler: Callback
     */
    public addEvent(el, type, handler) {
        (el.attachEvent) ? el.attachEvent('on' + type, handler) : el.addEventListener(type, handler);
    }

    /**
     * Description: Remove a vanilla javascript event attached to an element
     *
     * @input el: ElementRef
     * @input type: string - Event type (click, mouse, ...)
     * @input handler: Callback
     */
    public removeEvent(el, type, handler) {
        (el.detachEvent) ? el.detachEvent('on' + type, handler) : el.removeEventListener(type, handler);
    }

    /**
     * Description: Trigger custom event
     *
     * @input el: ElementRef
     * @input type: string - Event name
     * @input params: Object - Params to pass with the event
     */
    public triggerCustonEvent(el, type: string, params = {}) {
        let event;
        if (window.CustomEvent) {
            event = new CustomEvent(type, params);
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, params);
        }
        el.dispatchEvent(event);
    }

    /**
     * Description Scroll to Element
     *
     * @input element: ElementRef
     * @input padding: number
     * @input animation: number
     */
    public scrollTo(element: ElementRef, padding, animation) {
        this.scrollToNativeElement(element.nativeElement, padding, animation);
    }

    /**
     * Description Scroll to Element (native)
     *
     * @input element: any (ElementRef.nativeElement)
     * @input padding: number
     * @input animation: number
     */
    public scrollToNativeElement(element: any, padding, animation) {
        let offset = element.offsetTop - padding;
        this.scrollBodyTo(offset, animation);
    }

    /**
     * Description: Scroll to the top of the page
     */
    public scrollToTop() {
        window.scrollTo(0, 0);
    }

    /**
     * Description: Scroll the document body to an specific position
     *
     * @input offset: number - Position
     * @input duration: number - Animation duration
     */
    public scrollBodyTo(offset, duration) {
        if (duration <= 0) {
            return;
        }

        let element = document.body;

        // Firefox Fix
        if (browser.name === 'firefox') {
            element = document.documentElement;
        }

        let difference = offset - element.scrollTop;
        let perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === offset) {
                return;
            }

            this.scrollBodyTo(offset, duration - 10);
        }, 10);
    }

    /**
     * Description: Encode element
     *
     * @input element: any
     * @return string
     */
    public encode(element: any): string {
        return JSON.stringify(element);
    }

    /**
     * Description: Decode element
     *
     * @input element: string
     * @return any
     */
    public decode(element: string): any {
        return JSON.parse(element);
    }

    /**
     * Description: Change URL and Title
     *
     * @input url: string - The new url
     * @input title: string (optional) - The new title
     */
    public changeUrl(url: string, title = '') {
        window.history.pushState({}, title, url);
    }

    /**
     * Description: Remove CSS/JS file from the DOM tree
     *
     * @input element: HTMLScriptElement|string
     * @inout filetype: string
     */
    public removeFile(element: HTMLScriptElement|string, filetype: string) {
        if (typeof element === 'HTMLScriptElement' || typeof element === 'object') {
            element.parentNode.removeChild(element);
        }
        else {
            let targetelement = (filetype === 'js') ? 'script' : (filetype === 'css') ? 'link' : 'none'; // determine element type to create nodelist from
            let targetattr = (filetype === 'js') ? 'src' : (filetype === 'css') ? 'href' : 'none'; // determine corresponding attribute to test for
            let allsuspects = document.getElementsByTagName(targetelement);

            // Search backwards within nodelist for matching elements to remove
            for (let i = allsuspects.length; i >= 0; i--) {
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) !== null && allsuspects[i].getAttribute(targetattr).indexOf(element) !== -1) {

                    //remove element by calling parentNode.removeChild()
                    allsuspects[i].parentNode.removeChild(allsuspects[i]);
                }
            }
        }
    }

    /**
     * Description: Returns a random number between min (inclusive) and max (exclusive)
     *
     * @input max: number
     * @input min: number | Default = 0
     */
    random(max, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
