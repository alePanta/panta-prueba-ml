import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ml-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  resultProductDetail: any;
  showDetail: boolean;
  private paramId: any;

  constructor(
    private route: ActivatedRoute,
    private endpointsService: EndpointsService) { }

  ngOnInit() {
    this.paramId = this.route.snapshot.params.id;
    this.getProductDetail(this.paramId);
  }

  getProductDetail(id: string) {
    this.endpointsService.getProductDetail(id).subscribe(
      (data: any) => {
        this.resultProductDetail = data;
        if (this.resultProductDetail.items.error) {
          alert('Id de producto incorrecto');
          this.showDetail = false;
        } else {
          this.showDetail = true;
        }
      },
      error => {
        alert('Error en el servicio');
      }
    );
  }

}
