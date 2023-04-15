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

  getObjectKeys(obj: Object): { key: string, displayName: string }[] {
    const excludedKeys = ['id', 'nome', 'price_no_iva', 'nome_eng', "desc_eng", "codice", 'description', 'tipologia'];
    const keys = Object.keys(obj).filter(key => !excludedKeys.includes(key));
    const result = keys.map(key => {
      if (key === 'price_iva') {
        return { key, displayName: 'prezzo' };
      } else if (key === 'size') {
        return { key, displayName: 'taglia' };
      } else {
        return { key, displayName: key };
      }
    });
    return result;
}

  getObjectValue(key: string): any {
    return this.object[key as keyof Gioiello];
  }

}
