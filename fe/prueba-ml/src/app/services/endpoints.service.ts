import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  // Endpoint
  private urlEndPoint = '/api/items';

  // Setea el key del query param
  private keyParam = 'q';

  constructor(private http: HttpClient) { }

  // Conecta con el endpoint de la búsqueda general agregando el query param a la url
  getSearch(query: string) {
    const params = new HttpParams();
    params.set(this.keyParam, query);
    return this.http.get(this.urlEndPoint, {
      params: { q: query }, headers: { name: 'Alejandro', lastname: 'Panta' }
      }
    );
  }

  // Conecta con el endpoint de detalle del producto agregando el Id a la url
  getProductDetail(id: string) {
    return this.http.get(`${this.urlEndPoint}/${id}`, { headers: { name: 'Alejandro', lastname: 'Panta' }});
  }
}
