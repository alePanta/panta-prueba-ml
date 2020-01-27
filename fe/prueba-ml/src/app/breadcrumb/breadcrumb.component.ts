import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ml-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() categories: string[];

  constructor() { }

  ngOnInit() {
    this.createCategorieLevels();
  }

  createCategorieLevels() {
    // this.categories
  }

}
