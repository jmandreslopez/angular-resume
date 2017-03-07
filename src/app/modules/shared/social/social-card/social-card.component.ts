import { Component, Input } from '@angular/core';

@Component({
	selector: 'social-card',
	templateUrl: 'social-card.template.html',
	styleUrls: ['social-card.styles.scss']
})
export class SocialCardComponent {
    @Input() url: string;
    @Input() icon: string;
}
