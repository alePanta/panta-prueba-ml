import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShareDataService } from './services/share-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  subscription: Subscription;

  constructor(
    private router: Router,
    private shareDataService: ShareDataService) {}

  ngOnInit() {
    // Suscribe al servicio shareDataService de donde obtiene las categorias
    this.subscription = this.shareDataService.getDataCategories().subscribe( data => {
      setTimeout(() => {
        this.categories = data.categoriesInfo;
      }, 50);
    });
  }

  // Verifica el string del search, si es válido cambia la url a la vista de resultado
  handlerValuSearch(valueSearch: any) {
    const cleanValueSearch = valueSearch.trim();
    if (cleanValueSearch) {
      this.router.navigate(['/items'], { queryParams: { q: cleanValueSearch } });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
