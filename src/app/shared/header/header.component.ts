import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routes!: Route[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routes = this.router.config;
  }

}
