import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {ImageCropperComponent} from 'ng2-img-cropper';

import { AppComponent } from '../components/app/app.component';
import { HeaderAreaComponent } from '../components/header-area/header-area.component';
import { EffectAreaComponent } from '../components/effect-area/effect-area.component';
import { ActItemComponent } from '../components/act-item/act-item.component';
import { StageAreaComponent } from '../components/stage-area/stage-area.component';

import { SharedService } from '../services/shared.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [SharedService],
    declarations: [
        AppComponent,
        HeaderAreaComponent,
        EffectAreaComponent,
        ActItemComponent,
        StageAreaComponent,
        ImageCropperComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }