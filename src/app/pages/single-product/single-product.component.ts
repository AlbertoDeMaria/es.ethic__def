import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gioiello } from 'src/app/interface/gioiello';
import { GioielliService } from 'src/app/services/gioielli.service';

@Component({
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  id: string = '';
  object!: Gioiello;

  constructor(private route: ActivatedRoute, private gioielliSrv: GioielliService) { }

  ngOnInit(): void {
    let header = document.querySelector('header') as HTMLDivElement;
    header.style.backgroundColor = '#646F79';

    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.gioielliSrv.getGioielloById(this.id).subscribe((data) => {
      this.object = data;
    })
  }

  ngOnDestroy() {
    let header = document.querySelector('header') as HTMLDivElement;
    header.style.backgroundColor = '#fff';
  }

  getObjectKeys(obj: Object): string[] {
    const excludedKeys = ['id', 'nome', 'price_no_iva', "codice", 'tipologia', 'description'];
    return Object.keys(obj).filter(key => !excludedKeys.includes(key));
  }

  getObjectValue(key: string): any {
    return this.object[key as keyof Gioiello];
  }

}
