import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { GioielliService } from 'src/app/services/gioielli.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentTime!: string;
  currentProduct!: string;

  @ViewChild('octagon') mySvg!: ElementRef<SVGSVGElement>;

  products: string[] = [];

  constructor(private gioielliSrv: GioielliService) {}

  ngOnInit() {
    this.getTime();

    this.swicthOctagonColor();

    this.ramdomPhotoSlider();

    this.gioielliSrv.getGioielli().subscribe((data) => {
      this.changeProductName(data);

      data.forEach((gioiello) => {
        if (this.products.indexOf(gioiello.nome) === -1) {
          this.products.push(gioiello.nome);
        }
      });
      this.products.sort();
    });
  }

  randomIntFromInterval(min: any, max: any) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  handleRamdomPictures() {
    let AllInnerDiv = document.querySelectorAll(
      '.slideshow-images-wrapper > div'
    );



    let all_images = [
      '../../../assets/img/b&w/backup/1Grande.jpeg',
      '../../../assets/img/b&w/backup/2Grande.jpeg',
      '../../../assets/img/b&w/backup/3Grande.jpeg',
      '../../../assets/img/b&w/backup/4Grande.jpeg',
      '../../../assets/img/b&w/backup/5Grande.jpeg',
      '../../../assets/img/b&w/backup/6Grande.jpeg',
      '../../../assets/img/b&w/backup/7Grande.jpeg',
      '../../../assets/img/b&w/backup/8Grande.jpeg',
      '../../../assets/img/b&w/backup/9Grande.jpeg',
      '../../../assets/img/b&w/backup/10Grande.jpeg',
    ];
    let firstPic = this.randomIntFromInterval(0, all_images.length - 1);
    let secondPic = this.randomIntFromInterval(0, all_images.length - 1);
    let firstcol = this.randomIntFromInterval(0, 3);
    let secondCol = this.randomIntFromInterval(0, 3);
    let firstImageWidth = this.randomIntFromInterval(222, 400);
    let secondImageWidth = this.randomIntFromInterval(222, 400);

    let topArea = this.randomIntFromInterval(20, 100);
    let leftArea = this.randomIntFromInterval(20, 100);

    let topAreas = this.randomIntFromInterval(20, 100);
    let leftAreas = this.randomIntFromInterval(20, 100);

    while (firstPic == secondPic) {
      firstPic = this.randomIntFromInterval(1, all_images.length - 1);
      secondPic = this.randomIntFromInterval(1, all_images.length - 1);
    }

    while (firstcol == secondCol) {
      firstcol = this.randomIntFromInterval(1, 4);
      secondCol = this.randomIntFromInterval(1, 4);
    }

    while (firstImageWidth == secondImageWidth) {
      firstImageWidth = this.randomIntFromInterval(160, 300);
      secondImageWidth = this.randomIntFromInterval(160, 300);
    }
    while (topArea == leftArea) {
      topArea = this.randomIntFromInterval(20, 100);
      leftArea = this.randomIntFromInterval(20, 100);
    }
    while (topAreas == leftAreas) {
      topArea = this.randomIntFromInterval(20, 100);
      leftArea = this.randomIntFromInterval(20, 100);
    }
    AllInnerDiv.forEach((EachDiv) => {
      EachDiv.innerHTML = '';
    });

    if (innerWidth > 1050) {

      if(AllInnerDiv[
        firstcol
      ]){
        AllInnerDiv[
          firstcol
        ].innerHTML = `<img src=${all_images[firstPic]} style="left:${leftArea}%;top:${topArea}px;width:${firstImageWidth}px;height:200px;object-fit:cover;" />`;

      }
      setTimeout(() => {
        if(AllInnerDiv[
          secondCol
        ]){
          AllInnerDiv[
            secondCol
          ].innerHTML = `<img src=${all_images[secondPic]} style="left:${leftAreas}%;top:${topAreas}px;width:${secondImageWidth}px;height:200px;object-fit:cover;"  />`;
        }

      }, 500);
    } else {
      let mobileblock = document.querySelector(
        '.mobile-black'
      ) as HTMLImageElement;

      mobileblock.src = all_images[firstPic];
    }
  }

  ramdomPhotoSlider() {
    this.handleRamdomPictures();
    setInterval(() => {
      this.handleRamdomPictures();
    }, 2000);
  }

  getTime() {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 0);
  }

  changeProductName(data: any) {
    // pusing data
    let productslocal: any = [];
    data.forEach((EachObj: any) => {
      productslocal.push(EachObj.nome);
    });
    this.WordTyping(productslocal);
  }

  swicthOctagonColor() {
    setInterval(() => {
      const element = this.mySvg.nativeElement.querySelector(
        '.cls-4'
      ) as SVGGraphicsElement;
      if (element) {
        const color = getComputedStyle(element).fill;
        element.style.fill = color == 'rgb(0, 0, 0)' ? '#007577' : 'black';
      }
    }, 1000);
  }

  WordTyping(productslocal: any) {
    let currentIndex = 0;
    const word = productslocal[currentIndex];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < word.length) {
        this.currentProduct = word.substr(0, i + 1);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    currentIndex = (currentIndex + 1) % productslocal.length;

    setInterval(() => {
      const word = productslocal[currentIndex];
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < word.length) {
          this.currentProduct = word.substr(0, i + 1);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      currentIndex = (currentIndex + 1) % productslocal.length;
    }, 2000);
  }
}
