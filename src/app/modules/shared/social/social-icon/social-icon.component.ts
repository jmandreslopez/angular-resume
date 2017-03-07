import { Component, Input } from '@angular/core';

@Component({
	selector: 'social-icon',
	templateUrl: 'social-icon.template.html',
	styleUrls: ['social-icon.styles.scss']
})
export class SocialIconComponent {
    @Input() url: string;
    @Input() icon: string;
    @Input() label: string = undefined;
    @Input() placement: string = 'bottom';
}
