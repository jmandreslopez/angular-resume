import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// App
import { providers } from './app.providers';
import { routing } from './routes';

// Modules/Components
import { AppComponent } from './app.component';
import { CoreModule } from './modules';
import { SharedModule } from './modules';

@NgModule({
    imports: [
        BrowserModule,
        routing,

        // App Modules
        CoreModule,
        SharedModule,
    ],
    declarations: [AppComponent],
    providers: [providers],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}
