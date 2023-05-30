import { Component, Input } from '@angular/core';
import { BackendServiceService } from "../../../services/backend-service/backend-service.service";
import { NotifierServiceService } from "../../../services/notifier-service/notifier-service.service";

interface dataPrincipal{
  idProducto: String,
  vendedor: String,
  stock : Number,
  img : String,
  precio : Number
};

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.css']
})
export class PurchasePaymentComponent {
  constructor( private _backend : BackendServiceService, private notifier : NotifierServiceService){}
  ngOnInit(): void {
    this.findInfoVendor();
    this.findVendor = true;
  }


  //* Variables and models
  public buyer = localStorage.getItem('idUser');
  public pieces = 0;
  public findVendor = false;
  public dataVendor = {
    nombre : "",
  }

  @Input() data: dataPrincipal = {
    idProducto: "",
    vendedor : "",
    stock: 0,
    img : "",
    precio: 0 
  };

  //? Data to sale
  public dataPurchase = {};

  public findInfoVendor(){
    this._backend.findVendor(this.data.vendedor).subscribe((data : any) => {
      this.dataVendor.nombre = data.respuesta.nombre;
    })
  }

  public createDataPurchase(){

    if (this.validateUserLogged()) {
      let fecha = this.generateDate();
      this.dataPurchase = {
        idUsuario: this.buyer,
        infoCompra : [
          {
            id: this.data.idProducto,
            pieces: this.pieces
          }
        ],
        total: (Number(this.data.precio) * this.pieces),
        fecha: fecha
    }
    this.registerNewPurchase();       
    }else{
      this.notifier.mostrarAlertaSuperior("Debes estar registrado para poder comprar", "Aceptar",3000);
    }
  }

  public generateDate = () =>{
    let objFecha = new Date();
    let dia = objFecha.getDate();
    let mes = objFecha.getMonth() + 1;
    let anio = objFecha.getFullYear();
    let fechaFormateada = dia + '/' + mes + '/' + anio;
    return fechaFormateada;
  }

  public registerNewPurchase(){
    if (this.validatePurchase()) {
      this.discountStock();
      this._backend.createMethod('compra',this.dataPurchase).subscribe((data : any) => {
        this.showMessage("Compra registrada con éxito","Aceptar",3000,true)
      });      
    }else{
      this.showMessage("Oops, ha habido un error, verifica tu compra","Aceptar",3000,false)
    }
    
  }

  public validatePurchase(){
    return ((Number(this.data.stock) >= this.pieces) && Number(this.pieces > 0))
  }

  public discountStock(){
    const newValor = Number(this.data.stock) - this.pieces;
    const body = {
      nuevoValor : newValor
    }
    this._backend.discount(this.data.idProducto,body).subscribe((data : any) => {
    });
  }

  public showMessage(message : string, buttonMessage : string, time : number, redirect : boolean){
    this.notifier.mostrarAlertaSuperior(message,buttonMessage,time);
    if (redirect) {
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);      
    }
  }

  public validateUserLogged(){
    return (this.buyer !== null)
  }

  public addToCartShop(){
    (this.validateUserLogged())
      ? window.location.href = `/cart-shop/${this.data.idProducto}/${this.pieces}`
      : this.notifier.mostrarAlertaSuperior("Debes estar registrado para continuar", "Aceptar", 3000);
  }

}
