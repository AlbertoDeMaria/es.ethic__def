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
  intervelhome: any;


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
    let firstchild = document.querySelector(
      '.slideshow-images-wrapper > div:first-child img.active'
    );
    let secondChild = document.querySelector(
      '.slideshow-images-wrapper > div:nth-child(2) img.active'
    );
    let mobileblockActive = document.querySelector('.mobile-black.active');

    if (mobileblockActive) {
      mobileblockActive.classList.remove('active');
    }
    if (firstchild) {
      firstchild.classList.remove('active');
    }
    if (secondChild) {
      secondChild.classList.remove('active');
    }

    let all_images = document.querySelectorAll(
      '.slideshow-images-wrapper > div:first-child img'
    );

    let firstPic = this.randomIntFromInterval(0, all_images.length - 1);
    let secondPic = this.randomIntFromInterval(0, all_images.length - 1);

    let firstImageHeight = this.randomIntFromInterval(50, 80);
    let secondImageHeight = this.randomIntFromInterval(50, 80);

    let topArea = this.randomIntFromInterval(20, 100);
    let topAreas = this.randomIntFromInterval(20, 100);

    while (firstPic == secondPic) {
      firstPic = this.randomIntFromInterval(0, all_images.length - 1);
      secondPic = this.randomIntFromInterval(0, all_images.length - 1);
    }

    if (firstImageHeight == secondImageHeight) {
      firstImageHeight = this.randomIntFromInterval(50, 80);
      secondImageHeight = this.randomIntFromInterval(50, 80);
    }

    let firstchildAfter = document.querySelectorAll(
      '.slideshow-images-wrapper > div:first-child img'
    );
    let secondChildAfter = document.querySelectorAll(
      '.slideshow-images-wrapper > div:nth-child(2) img'
    );

    if (firstchildAfter[firstPic]) {
      let Image = firstchildAfter[firstPic] as HTMLImageElement;
      Image.classList.add('active');
      Image.style.height = `${firstImageHeight}%`;
      Image.style.top = `${topArea}%`;
      Image.style.transform = `translateY(-${topArea}%)`;
    }
    if (secondChildAfter[secondPic]) {
      let Image = secondChildAfter[secondPic] as HTMLImageElement;
      Image.classList.add('active');
      Image.style.height = `${secondImageHeight}%`;
      Image.style.top = `${topAreas}%`;
      Image.style.transform = `translateY(-${topAreas}%)`;
    }

    if (window.innerWidth < 1050) {
      let mobileblock = document.querySelectorAll('.mobile-black');
      let Image = mobileblock[firstPic] as HTMLImageElement;
      Image.classList.add('active');
    }
  }

  ramdomPhotoSlider() {
    this.handleRamdomPictures();
    this.intervelhome = setInterval(() => {

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

  ngOnDestroy() {
    if (this.intervelhome) {
      clearInterval(this.intervelhome);
    }
  }
}
