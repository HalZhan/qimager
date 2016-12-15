import { Component, OnInit, AfterViewInit } from '@angular/core';
import Imager from '../../imager';
import '../../../public/css/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  _selector: string = '[data-qimager-elem="image"]';
  _imager: Imager = null;
  constructor() {

  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let img: any = document.querySelector(this._selector);
    img.onload = () => {
      this._imager = new Imager({img});
      this._imager.init();
    };
  }
  deal(way: string = ''): void {
    if (this._imager) {
      if(way) {
        this._imager.dealImg({effect: way});
      }
    }
  }
  undo():void {
    if(this._imager) {
      this._imager.undo();
    }
  }
}