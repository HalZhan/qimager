import { Component, OnInit, AfterViewInit } from '@angular/core';
import Imager from '../../imager';
// import '../../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  _selector: string = '[data-qimager-elem="image"]';
  _imager: Imager = null;
  constructor() {
    
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let img: any = document.querySelector(this._selector);
    // img.onload = () => {
    this._imager = new Imager({img});
    this._imager.init();
    // };
  }
  ps(effect: string): void {
    if(this._imager && effect) {
      this._imager.ps({ effect });
    }
  }
  act(effect: string = ''): void {
    if (this._imager && effect) {
        this._imager.act({effect});
    }
  }
  undo():void {
    if(this._imager) {
      this._imager.undo();
    }
  }
}