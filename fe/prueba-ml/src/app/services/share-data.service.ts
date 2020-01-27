import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private dataCategories = new Subject<any>();

  constructor() { }

  // Carga las Categorias
  setDataCategories(categories: string[]) {
    this.dataCategories.next({ categoriesInfo: categories });
  }

  // Obtiene las Categorias
  getDataCategories(): Observable<any> {
    return this.dataCategories.asObservable();
  }

  // Borra las Categorias
  clearCategories() {
    const emptyCategories = [];
    this.dataCategories.next({ categoriesInfo: emptyCategories });
  }
}

