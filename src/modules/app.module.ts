import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app/app.component';
import { HeaderAreaComponent } from '../components/header-area/header-area.component';
import { EffectAreaComponent } from '../components/effect-area/effect-area.component';
import { StageAreaComponent } from '../components/stage-area/stage-area.component';

import { SharedService } from '../services/shared.service';


import { AppRoutesModule } from './app-routes.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutesModule
    ],
    providers: [SharedService],
    declarations: [
        AppComponent,
        HeaderAreaComponent,
        EffectAreaComponent,
        StageAreaComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }