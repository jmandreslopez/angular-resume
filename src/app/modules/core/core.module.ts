import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared';

// Components
import { HomeComponent } from './home';
import { GreetingComponent } from './home';
import { AboutComponent } from './home';
import { SkillsComponent } from './home';
import { BackgroundComponent } from './home';
import { ContactComponent } from './home';
import { NotFoundComponent } from './not-found';

// Providers
import { providers } from './core.providers';

@NgModule({
    imports: [SharedModule],
    declarations: [
        HomeComponent,
        GreetingComponent,
        AboutComponent,
        SkillsComponent,
        BackgroundComponent,
        ContactComponent,
        NotFoundComponent,
    ],
    providers: [providers]
})
export class CoreModule {
    //
}
