import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  @ViewChild('divleft', { static: true }) divleft!: ElementRef;
  @ViewChild('divmid', { static: true }) divmid!: ElementRef;
  @ViewChild('divright', { static: true }) divright!: ElementRef;
  @ViewChild('buttonClose', { static: true }) buttonClose!: ElementRef;
  @ViewChild('innerContentLeft', { static: true })
  innerContentLeft!: ElementRef;
  @ViewChild('innerContentMid', { static: true }) innerContentMid!: ElementRef;
  @ViewChild('innerContentRight', { static: true })
  innerContentRight!: ElementRef;

  isToggled = false;

  constructor() {}

  ngOnInit(): void {
    this.buttonClose.nativeElement.addEventListener('click', () => {
      this.removeDiv(this.divleft.nativeElement);
      this.removeDiv(this.divmid.nativeElement);
      this.removeDiv(this.divright.nativeElement);
    });
    this.divleft.nativeElement.addEventListener('click', () =>
      this.toggleDiv(this.divleft.nativeElement, '#3e5155')
    );
    this.divmid.nativeElement.addEventListener('click', () =>
      this.toggleDiv(this.divmid.nativeElement, '#456160')
    );
    this.divright.nativeElement.addEventListener('click', () =>
      this.toggleDiv(this.divright.nativeElement, '#A7968B')
    );
  }
  removeDiv(element: HTMLElement): void {
    let innerContent: ElementRef | undefined;
    this.divmid.nativeElement.style.borderLeftWidth = 1;
    this.divmid.nativeElement.style.borderRightWidth = 1;
    let header = document.querySelector('header') as HTMLDivElement;
    header.style.backgroundColor = '#fff';

    if (element === this.divleft.nativeElement) {
      innerContent = this.innerContentLeft;
    } else if (element === this.divmid.nativeElement) {
      innerContent = this.innerContentMid;
    } else if (element === this.divright.nativeElement) {
      innerContent = this.innerContentRight;
    }
    this.buttonClose.nativeElement.removeAttribute('style');
    element.removeAttribute('style');

    setTimeout(() => {
      element.classList.remove('firstbg');
      element.classList.remove('secondbg');
      element.classList.remove('thirdbg');
    }, 400);

    console.log(innerContent);

    if (innerContent) {
      innerContent.nativeElement.style.display = 'none';
    }
  }

  toggleDiv(element: HTMLElement, bgColor: string): void {
    this.isToggled = true;
    this.buttonClose.nativeElement.style.display = 'flex';
    let innerContent: ElementRef | undefined;
    if (element === this.divleft.nativeElement) {
      innerContent = this.innerContentLeft;
      element.classList.add('firstbg');
    } else if (element === this.divmid.nativeElement) {
      innerContent = this.innerContentMid;
      element.classList.add('secondbg');
    } else if (element === this.divright.nativeElement) {
      innerContent = this.innerContentRight;
      element.classList.add('thirdbg');
    }
    console.log(bgColor);

    let header = document.querySelector('header') as HTMLDivElement;
    header.style.backgroundColor = bgColor;

    if (window.innerWidth > 900) {
      const pos = this.isToggled
        ? '0'
        : element.id === 'divmid'
        ? '33.3%'
        : '66.6%';
      element.style.zIndex = this.isToggled ? '2' : '0';
      element.style.left = pos;
      element.style.width = this.isToggled ? '100%' : '33.3%';
    } else {
      const pos = this.isToggled
        ? '0'
        : element.id === 'divmid'
        ? '33.3vh'
        : '66.6vh';

      element.style.border = this.isToggled ? 'white' : 'black';
      element.style.zIndex = this.isToggled ? '2' : '0';
      element.style.top = pos;
      element.style.height = this.isToggled ? '100vh' : '33.3vh';
    }

    if (innerContent) {
      if (innerContent == this.innerContentMid) {
        innerContent.nativeElement.style.display = 'grid';
        this.divmid.nativeElement.style.borderLeftWidth = 0;
        this.divmid.nativeElement.style.borderRightWidth = 0;
      } else {
        innerContent.nativeElement.style.display = this.isToggled
          ? 'block'
          : 'none';
      }

      innerContent.nativeElement.style.backgroundColor = bgColor;
    }
  }
}
