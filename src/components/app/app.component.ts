import { Component, OnInit, AfterViewInit } from '@angular/core';
// import $ from 'jquery';
import 'AlloyImage';
import '../../../public/css/styles.css';

/**
 * 
 */
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  _selector: string = '[data-qimager-elem="image"]';
  constructor() {

  }
  ngOnInit() {}
  ngAfterViewInit() {
    let img = document.querySelectorAll(this._selector)[0];
    img.onload = () => {
      this.alloyImage = AlloyImage(img);
    };
  }
  deal(way) {
    let el = document.querySelectorAll(this._selector)[0];
    console.info(el);
    if (el && this.alloyImage) {
      let image = this.alloyImage.clone();
      if(way) {
        image.act(way).replace(el);
      }
      else {
        image.replace(el);
      }
    }
  }
}