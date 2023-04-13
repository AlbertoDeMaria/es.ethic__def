import { Component, OnInit } from '@angular/core';
import { Gioiello } from 'src/app/interface/gioiello';
import { GioielliService } from 'src/app/services/gioielli.service';

@Component({
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  gioielli!:Gioiello[];
  productTitle = '*NOME PRODOTTO';
  private typingTimeout: any;

  constructor(private gioielliSrv:GioielliService) { }

  ngOnInit(): void {
    this.gioielliSrv.getGioielli().subscribe((data)=>{
      this.gioielli = data;
    });
  }

  onProductHover(item: any) {
    this.productTitle = '*';
    this.startTyping(item.nome);
  }

  startTyping(name: string) {
    let i = 0;
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setInterval(() => {
      if (i < name.length) {
        this.productTitle += name.charAt(i);
        i++;
      } else {
        clearInterval(this.typingTimeout);
      }
    }, 50);
  }

}
