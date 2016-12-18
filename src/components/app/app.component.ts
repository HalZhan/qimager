import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Imager, STATUS } from '../../imager';
// import '../../../public/css/styles.css';

/**
 * 选择器
 */
const SELECTORS = {
  IMAGER: '[data-qimager-elem="image"]',
  LOADING_WRAP: '[data-qimager-elem="loadingWrap"]',
  IMAGE_INPUT: '[data-qimager-elem="imageInput"]'
};

/**
 * 样式名
 */
const CLASSES = {
  HIDE: 'dn'
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {
  PS_PICTURE_NAMES: Array<Object> = [
    { effect: '原图', pic: 'e0' },
    { effect: '美肤', pic: 'e1' },
    { effect: '素描', pic: 'e2' },
    { effect: '自然增强', pic: 'e3' },
    { effect: '紫调', pic: 'e4' },
    { effect: '柔焦', pic: 'e5' },
    { effect: '复古', pic: 'e6' },
    { effect: '黑白', pic: 'e7' },
    { effect: '仿lomo', pic: 'e8' },
    { effect: '亮白增强', pic: 'e9' },
    { effect: '灰白', pic: 'e10' },
    { effect: '灰色', pic: 'e11' },
    { effect: '暖秋', pic: 'e12' },
    { effect: '木雕', pic: 'e13' },
    { effect: '粗糙', pic: 'e14' }
  ];

  _imager: Imager = null;
  constructor() {

  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    let img: any = document.querySelector(SELECTORS.IMAGER);
    this._imager = new Imager({ img });
    this._imager.init();
  }
  _loadingShow(): void {
    let loadingWrap = document.querySelector(SELECTORS.LOADING_WRAP);
    if (loadingWrap) {
      loadingWrap.classList.remove(CLASSES.HIDE);
    }
  }
  _loadingHide(): void {
    let loadingWrap = document.querySelector(SELECTORS.LOADING_WRAP);
    if (loadingWrap) {
      loadingWrap.classList.add(CLASSES.HIDE);
    }
  }
  openFile(): void {
    let imageInput: HTMLFormElement = <HTMLFormElement>document.querySelector(SELECTORS.IMAGE_INPUT);
    if (imageInput) {
      imageInput.click();
    }
  }
  saveFile(): void {
    if(this._imager) {
      this._imager.saveImageFile();
    }
  }
  imageChange(event: any): void {
    if (event && event.target && this._imager && event.target.files[0]) {
      this._loadingShow();
      setTimeout(() => {
        this._imager.loadImageFile(event.target.files[0])
          .then(data => {
            if (data.status === STATUS.SUCESS) {
              return this._imager.reset();
            }
          })
          .then(data => {
            this._loadingHide();
          })
      }, 100);
    }
  }
  ps(effect: string = ''): void {
    if (this._imager && effect) {
      this._loadingShow();
      // 必须为异步，否则loading弹层无法正常显示
      setTimeout(() => {
        this._imager.ps({ effect }).then(data => {
          this._loadingHide();
        });
      }, 100);
    }
  }
  act(effect: string = ''): void {
    if (this._imager && effect) {
      this._imager.act({ effect });
    }
  }
  undo(): void {
    if (this._imager) {
      this._imager.undo();
    }
  }
}