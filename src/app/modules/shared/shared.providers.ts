import { LAZY_MAPS_API_CONFIG } from 'angular2-google-maps/core/services';
import { GoogleMapsConfig } from '../../configs';

export const providers = [
    { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig } // Google Maps
];
