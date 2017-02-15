import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared';

// Components
import { HomeComponent } from './home';
import { GreetingComponent } from './greeting';
import { SkillsComponent } from './skills';
import { BackgroundComponent } from './background';

import { BlogComponent } from './blog';
import { AboutComponent } from './about';
import { ResumeComponent } from './resume';
import { ContactComponent } from './contact';
import { ContactFormComponent } from './contact';
import { NotFoundComponent } from './not-found';

// Providers
import { providers } from './core.providers';

@NgModule({
    imports: [SharedModule],
    declarations: [
        HomeComponent,
        GreetingComponent,
        SkillsComponent,
        BackgroundComponent,

        BlogComponent,
        AboutComponent,
        ResumeComponent,
        ContactComponent,
        ContactFormComponent,
        NotFoundComponent,
    ],
    providers: [providers]
})
export class CoreModule {
    //
}
