import { Component } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service/backend-service.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  constructor(private _backend: BackendServiceService) {}

  ngOnInit(): void {
    this.findAllProducts();
  }

  //* Variables and Models
  public products: any = [];
  public randoms: any = [];
  public MODEL = 'productos';
  public totalProducts = 0;

  public findAllProducts() {
    this._backend.findAll(this.MODEL).subscribe((data: any) => {
      this.totalProducts = data.respuesta.length;
      this.generateOffers();
      this.createOffers(data.respuesta);
    });
  }

  public generateOffers = () => {
    for (let i = 0; i <= 5; i++) {
      //* 14
      let numOffer = this.generateRandom();

      //
      if (this.randoms.includes(numOffer)) {
        i--;
      } else {
        this.randoms.push(numOffer);
      }
    }
    //* randoms = [4,7,11,14,3,9]
  };

  public createOffers(data: any) {
    for (let i = 0; i < this.randoms.length; i++) {
      this.products.push(data[this.randoms[i]]);
    }
  }

  public generateRandom() {
    return Math.floor(Math.random() * this.totalProducts);
  }

  public redirectToPurchase(idProduct: string) {
    window.location.href = `purchase-product/${idProduct}`;
  }
}
