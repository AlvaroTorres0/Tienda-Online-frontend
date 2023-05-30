import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from "../../services/backend-service/backend-service.service";

@Component({
  selector: 'app-purchase-principal',
  templateUrl: './purchase-principal.component.html',
  styleUrls: ['./purchase-principal.component.css']
})
export class PurchasePrincipalComponent {
  constructor(private _backend : BackendServiceService, public route : ActivatedRoute){}

  ngOnInit(): void {
    this.getProductSelected();
  }
  
  //* Variables and models
  public product = String(this.route.snapshot.paramMap.get('idProduct'));
  public MODEL = "productos";
  public images = [];
  public dataRecibed = false;
  public dataProduct = {
    idProducto: "",
    nombre :"",
    precio : 0,
    descripcion : "",
    stock: 0,
    vendedor: "",
    img: "",
    marca : ""
  }
  
  //! Buscamos la información del producto seleccionado
  public getProductSelected(){
    this._backend.findById(this.MODEL, this.product).subscribe((data : any) => {
      this.dataRecibed = true;
      this.assignDataProduct(data.respuesta);
      setTimeout(() => {
        this.images = data.respuesta.imagenes;
      }, 1500);      
    });
  }

  public assignDataProduct(data : any){
    // Podemos mejorar esto
    this.dataProduct.idProducto = data._id;
    this.dataProduct.nombre = data.nombre;
    this.dataProduct.precio = data.precio;
    this.dataProduct.descripcion = data.descripcion;
    this.dataProduct.stock = data.stock;
    this.dataProduct.vendedor = data.vendedor;
    this.dataProduct.marca = data.marca;
  }
}
