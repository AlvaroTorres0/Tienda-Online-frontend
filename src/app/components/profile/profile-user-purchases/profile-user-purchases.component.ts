import { Component, Input } from '@angular/core';
import { BackendServiceService } from "../../../services/backend-service/backend-service.service";

interface modelPurschase{
    fecha : String,
    idUsuario : String,
    infoCompra : 
      {
        id: String,
        pieces: Number,
        img : String,
        nombre: String,
        precio : Number
      },
    total : Number
};

@Component({
  selector: 'app-profile-user-purchases',
  templateUrl: './profile-user-purchases.component.html',
  styleUrls: ['./profile-user-purchases.component.css']
})
export class ProfileUserPurchasesComponent {

  constructor(private backend : BackendServiceService){}
  
  ngOnInit(): void {
    this.getInfoProduct();
  }
  @Input() allUserPurchases : any = [];
  public purchases : any = [];
  public framePurchase = false;
  public objPurchase : modelPurschase [] = [];

  public getInfoProduct(){
    let objPurchase;
    for (const purchase of this.allUserPurchases) {
      for (let index = 0; index < purchase.infoCompra.length; index++) {
        this.backend.findById("productos",purchase.infoCompra[index].id).subscribe((data : any) => {
          objPurchase = {
            fecha : purchase.fecha,
            idUsuario : purchase.idUsuario,
            infoCompra : {
              id: purchase.infoCompra[index].id,
              pieces: purchase.infoCompra[index].pieces,
              img : data.respuesta.imagenes[0].img,
              nombre: data.respuesta.nombre,
              precio : data.respuesta.precio
            },
            total : purchase.total 
          }
          this.purchases.push(objPurchase);
        }); 
      }
    }
    setTimeout(() => {
      this.framePurchase = true;
    }, 1000);
  }
}
