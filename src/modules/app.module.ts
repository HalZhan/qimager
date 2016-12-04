import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app/app.component';

import { AppRoutesModule } from './app-routes.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutesModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }