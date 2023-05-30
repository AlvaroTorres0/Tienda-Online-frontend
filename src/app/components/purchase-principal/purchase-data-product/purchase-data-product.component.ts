import { Component, Input } from '@angular/core';

interface dataPrincipal{
  idProducto: String,
  nombre :String,
  precio : Number,
  descripcion : String,
  vendedor: String,
  stock : Number,
  marca : String
};

@Component({
  selector: 'app-purchase-data-product',
  templateUrl: './purchase-data-product.component.html',
  styleUrls: ['./purchase-data-product.component.css']
})
export class PurchaseDataProductComponent {
  constructor(){}

  //* Variables and models
  @Input() data: dataPrincipal = {
    idProducto: "",
    nombre :"",
    precio : 0,
    descripcion : "",
    vendedor : "",
    stock : 0,
    marca : ""
  };

}
