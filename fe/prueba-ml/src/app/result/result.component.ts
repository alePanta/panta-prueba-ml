import { Component, OnInit, OnDestroy } from '@angular/core';
import { EndpointsService } from '../services/endpoints.service';
import { ShareDataService } from '../services/share-data.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ml-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  resultSearch: any;
  observerQueryString = null;

  constructor(
    private endpointsService: EndpointsService,
    private route: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDataService
  ) {
    // Obtiene el query string de la barra de navegación
    this.observerQueryString = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe( () => this.getQueryString()
    );
  }

  ngOnInit() {
  }

  getQueryString() {
    const queryString: string = this.route.snapshot.queryParamMap.get('q');

    // Si la query de búsqueda esta bien armada conecta con el endpoint sino muestra mensaje de error
    if (queryString) {
      this.getSearch(queryString);
    } else {
      alert('La query de búsqueda está mal armanda');
    }
  }

  // Conecta con el endpoint
  getSearch(queryString: string) {
    this.endpointsService.getSearch(queryString).subscribe(
      (data: any) => {
        if (data.items.length) {
          this.resultSearch = data;
          this.shareDataService.setDataCategories(this.resultSearch.categories);
        } else {
          alert('Su búsqueda no dio resultados');
        }
      },
      error => {
        alert('Error al llamar al servicio');
      }
    );
  }

  ngOnDestroy(): void {
    this.observerQueryString.unsubscribe();
  }
}
