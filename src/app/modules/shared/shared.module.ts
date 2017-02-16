import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Vendors
import { Parallax } from 'ng2-parallax/src/ts/parallax.directive';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { TooltipModule } from 'ng2-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

// Components
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { AngularLogoComponent } from './footer';
import { WebpackLogoComponent } from './footer';

// Directives
import { TrackScrollDirective } from '../../directives';

// Providers
import { providers } from './shared.providers';

@NgModule({
    imports: [

        // Angular
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        // Vendors
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
        TooltipModule.forRoot(),
        Ng2PageScrollModule.forRoot(),
    ],
    declarations: [

        // Vendors
        Parallax,

        // Components
        HeaderComponent,
        FooterComponent,
        AngularLogoComponent,
        WebpackLogoComponent,

        // Directives
        TrackScrollDirective,
    ],
    exports: [

        // Modules
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        Angulartics2Module,
        TooltipModule,
        Ng2PageScrollModule,

        // Vendors
        Parallax,

        // Components
        HeaderComponent,
        FooterComponent,
        AngularLogoComponent,
        WebpackLogoComponent,

        // Directives
        TrackScrollDirective,
    ],
    providers: [providers]
})

export class SharedModule {
    //
}
