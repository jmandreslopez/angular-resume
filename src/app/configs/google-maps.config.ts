import { Injectable } from '@angular/core';
import { ConfigModel } from '../models';

@Injectable()
export class GoogleMapsConfig {
    private config: ConfigModel = process.env;
    public apiKey: string;

    constructor() {
        this.apiKey = this.config.GOOGLE_API_KEY;
    }
}
