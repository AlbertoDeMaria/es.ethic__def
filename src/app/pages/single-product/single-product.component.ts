import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GioielliService } from 'src/app/services/gioielli.service';

@Component({
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  id: string = '';

  constructor(private route: ActivatedRoute, private gioielliSrv:GioielliService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.gioielliSrv.getGioielloById(this.id).subscribe((data)=>{
      console.log(data)
    })
  }

}
