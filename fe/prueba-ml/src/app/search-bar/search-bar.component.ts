import { Component, EventEmitter , OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ml-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() valuSeach = new EventEmitter<string>();
  valuSeachTrim: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fireInputSearch() {
    this.valuSeachTrim = this.valuSeachTrim.trim();
    // tslint:disable-next-line:curly
    if (this.valuSeachTrim) this.valuSeach.emit(this.valuSeachTrim);
  }

  // Redirecciona al home
  onLogo() {
    this.valuSeachTrim = '';
    this.router.navigate(['/']);
  }
}
