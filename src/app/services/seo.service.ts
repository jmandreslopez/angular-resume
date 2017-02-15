import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Injectable()
export class SeoService {

    // <head> Element of the HTML document
    private headElement: HTMLElement;
    private DOM: any;

    private defaultTitle: string = 'Amazing.com';
    private description: HTMLElement;
    private ogTitle: HTMLElement;
    private ogUrl: HTMLElement;
    private ogImage: HTMLElement;
    private ogDescription: HTMLElement;

    constructor(private titleService: Title) {
        this.DOM = getDOM();

        //  get the <head> Element
        this.headElement = this.DOM.query('head');

        this.description = this.getOrCreateMetaElement('description');
        this.ogTitle = this.getOrCreateMetaOgElement('og:title');
        this.ogUrl = this.getOrCreateMetaOgElement('og:url');
        this.ogImage = this.getOrCreateMetaOgElement('og:image');
        this.ogDescription = this.getOrCreateMetaOgElement('og:description');
    }

    //****************************************************************************************
    // Title
    //****************************************************************************************

    public getTitle(): string {
        return this.titleService.getTitle();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(this.defaultTitle + ((newTitle !== '') ? ' | ' : '') + newTitle);
    }

    //****************************************************************************************
    // Description
    //****************************************************************************************

    public getDescription(): string {
        return this.description.getAttribute('content');
    }

    public setDescription(description: string) {
        this.description.setAttribute('content', description);
    }

    //****************************************************************************************
    // OG:Title
    //****************************************************************************************

    public getOgTitle(): string {
        return this.ogTitle.getAttribute('content');
    }

    public setOgTitle(ogTitle: string) {
        this.ogTitle.setAttribute('content', this.defaultTitle + ' | ' + ogTitle);
    }

    //****************************************************************************************
    // OG:Url
    //****************************************************************************************

    public getOgUrl(): string {
        return this.ogUrl.getAttribute('content');
    }

    public setOgUrl(ogUrl: string) {
        this.ogUrl.setAttribute('content', ogUrl);
    }

    //****************************************************************************************
    // OG:Image
    //****************************************************************************************

    public getOgImage(): string {
        return this.ogImage.getAttribute('content');
    }

    public setOgImage(ogImage: string) {
        this.ogImage.setAttribute('content', ogImage);
    }

    //****************************************************************************************
    // OG:Description
    //****************************************************************************************

    public getOgDescription(): string {
        return this.ogDescription.getAttribute('content');
    }

    public setOgDescription(ogDescription: string) {
        this.ogDescription.setAttribute('content', ogDescription);
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    // HTML Metatags
    private getOrCreateMetaElement(name: string): HTMLElement {
        let el: HTMLElement;
        el = this.DOM.query('meta[name="' + name + '"]');
        if (_.isNil(el)) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            this.headElement.appendChild(el);
        }

        return el;
    }

    // OG Metatags, most commonly used by Facebook
    private getOrCreateMetaOgElement(property: string): HTMLElement {
        let el: HTMLElement;
        el = this.DOM.query('meta[property="' + property + '"]');
        if (_.isNil(el)) {
            el = this.DOM.createElement('meta');
            el.setAttribute('property', property);
            this.headElement.appendChild(el);
        }

        return el;
    }
}
