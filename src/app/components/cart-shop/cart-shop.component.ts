import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from "../../services/backend-service/backend-service.service";
import { NotifierServiceService } from "../../services/notifier-service/notifier-service.service";

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.css']
})
export class CartShopComponent {
  constructor(private router : ActivatedRoute, private backend : BackendServiceService, private notifier : NotifierServiceService){}
  ngOnInit(): void {
    //* Verificamos si el usuario se encuentra logueado
    if (this.validateUserLogged()) {
      this.notifier.mostrarAlertaSuperior("Por favor inicia sesión","Aceptar",3000);
    }else{
      this.frameCartShop = true;
      //* Validamos si se está accediendo desde un producto o desde el botón
      if (this.idProduct === 'null') {
        const cartShop = localStorage.getItem("cartShop");
        if (cartShop !== null) {
          //* Validamos si la variable en el local storage del carrito no es nulo
          this.cartShop = JSON.parse(cartShop); 
          this.searchInfoProducts();       
        }
      }else{
        this.addProductToCartShop();      
      }    
    }
    
  }

  //* Variables and Models
  public frameCartShop = false
  public dataPurchase = {}
  public productsOnCart = 0;
  public total = 0;
  public idProduct = String(this.router.snapshot.paramMap.get('id'));
  public piecesProduct = Number(this.router.snapshot.paramMap.get('pieces'));
  public cartShop : any = [];
  public modelProductCartShop = {
      id : "",
      pieces: 0
  };
  public products : any = [];
  public MODEL = "productos";
  public namesVendors : any = [];
  public buyer = localStorage.getItem('idUser');

  public validateUserLogged(){
    return (this.buyer === '')
  }

  public createDataPurchase(){

    if (this.validateUserLogged()) {
      this.notifier.mostrarAlertaSuperior("Debes estar registrado para poder comprar", "Aceptar",3000);
            
    }else{
      let fecha = this.generateDate();
      this.dataPurchase = {
        idUsuario: this.buyer,
        infoCompra : this.cartShop,
        total: this.total,
        fecha: fecha
      }
      this.registerNewPurchase(); 
    }
  }

  public registerNewPurchase(){
    this.discountStock();
    this.backend.createMethod('compra',this.dataPurchase).subscribe((data : any) => {
      this.notifier.mostrarAlertaSuperior("Compra realizada con éxito","Aceptar",3000)
    });
    localStorage.removeItem('cartShop');
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);     
  }

  public discountStock(){
    for (let index = 0; index < this.cartShop.length; index++) {
      const body = {
        nuevoValor : this.products[index].stock - this.cartShop[index].pieces
      }
      this.backend.discount(this.cartShop[index].id, body).subscribe((data : any) => {
      });    
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


  public addProductToCartShop(){
    const cartShop = localStorage.getItem("cartShop");
    //* Valida si hay un carrito ya creado
    const existCartShop = this.validateCartShopExist(cartShop);
    this.modelProductCartShop = {
      id : this.idProduct,
      pieces: this.piecesProduct
    }

    if (existCartShop) {
      const existProduct = this.validateProductExistOnCartShop(cartShop);
      if (existProduct) {
        this.notifier.mostrarAlertaSuperior("Oops... El producto ya se encuentra en el carrito","Aceptar", 3000);      
      }else{
        //* Agregamos el producto y las piezas al carrito
        this.cartShop.push(this.modelProductCartShop);
        //* Actualizamos en el almacenamiento del navegador
        localStorage.setItem("cartShop", JSON.stringify(this.cartShop)); 
      }
    }else{
      this.cartShop.push(this.modelProductCartShop);
      localStorage.setItem("cartShop",JSON.stringify(this.cartShop));
    }

    //* Sacamos la cantidad de productos que tenemos en el carrito.
    this.productsOnCart = this.cartShop.length;
    
    this.searchInfoProducts(); 
  }

  public validateProductExistOnCartShop(cartShopParameter : any){
      this.cartShop = JSON.parse(cartShopParameter);  
      for (const data of this.cartShop) {
        if (data.id === this.idProduct) {
          return true
        }
      }
      return false;
  }


  public validateCartShopExist(cartShop : any){
    return (cartShop !== null);
  }

  public searchInfoProducts(){
    for (const product of this.cartShop) {
      this.backend.findById(this.MODEL,product.id).subscribe((data : any) => {
        setTimeout(() => {
          this.products.push(data.respuesta); 
          this.findNameVendor(data.respuesta.vendedor);
        }, 500);
      });           
    }
    setTimeout(() => {
      this.calculateTotal();
    }, 2000);
    
    
  }

  //* Buscar el nombre del vendedor
  public findNameVendor(vendedor : string){
    this.backend.findVendor(vendedor).subscribe((data : any) => {
      setTimeout(() => {
          this.namesVendors.push(data.respuesta.nombre);
      }, 500);
    })
  }

  public decreaseValue(numberElement : number){
    const inputPieces = document.getElementById(`${numberElement}`) as HTMLInputElement;
    let newValue = parseInt(inputPieces.value) - 1;
    if (newValue >= 1) {
      inputPieces.value = String(newValue);     
      this.cartShop[numberElement].pieces = newValue;
      this.calculateTotal();
    }

  }

  public increaseValue(numberElement : number){
    const inputPieces = document.getElementById(`${numberElement}`) as HTMLInputElement;
    let newValue = parseInt(inputPieces.value) + 1;
    if (newValue > this.products[numberElement].stock) {
      this.notifier.mostrarAlerta("Lo sentimos, por el momento no tenemos todas esas unidades 😞","Aceptar",4000);
      inputPieces.value = String(this.cartShop[numberElement].pieces);
    }else{
      inputPieces.value = String(newValue);     
      this.cartShop[numberElement].pieces = newValue; 
      this.calculateTotal();
    }
  }

  public deleteProduct(position : Number){
    const arrayLength = this.cartShop.length-1;
    if (arrayLength === position) {
      this.cartShop.pop();
      this.products.pop();
      this.namesVendors.pop();
    }else{
      this.cartShop.splice(position, 1);
      this.products.splice(position, 1);
      this.namesVendors.splice(position, 1);
    }
    localStorage.setItem("cartShop", JSON.stringify(this.cartShop)); 
    this.calculateTotal();
  }

  public calculateTotal(){
    this.total = 0;
    for (let index = 0; index < this.products.length; index++) {
      this.total += this.products[index].precio * this.cartShop[index].pieces;      
    }
  }

}
