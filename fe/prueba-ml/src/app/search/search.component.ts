import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ml-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.shareDataService.clearCategories();
  }

}
