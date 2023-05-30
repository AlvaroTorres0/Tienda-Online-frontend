import { Component } from '@angular/core';
import { BackendServiceService } from "../../services/backend-service/backend-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private backend : BackendServiceService){}
  ngOnInit(): void {
    this.getDataUserLogged();
    this.getUserPurchases();
    this.getUserSales();
  }
  
  //* Variables and models
  public statusFrames = [[false,'profile'],[false,'purchases'],[false,'sales']];
  public idUserLogged = localStorage.getItem('idUser');
  public dataUserLogged = {
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    fotografia: "",
    codigopostal: "",
    estado: "",
    municipio: "",
    colonia: "",
    calleprincipal: "",
    numeroexterior: "",
    numinterior: "",
    calle1: "",
    calle2: "",
    descripcion: ""
  };

  public userPurchases = [];
  public userSales = [];
  public modelPurchases = "compras";

  public showFrame(nameFrame : string){
    for (const frame of this.statusFrames) {
      (frame[1]===nameFrame)
        ? frame[0] = true
        : frame[0] = false;
    }
  }

  public getDataUserLogged(){
    this.backend.findById("user",this.idUserLogged).subscribe((data : any) => {
      this.dataUserLogged = data.respuesta;
    });
  }

  public getUserPurchases(){
    this.backend.getUserPurchasesAndSales(this.idUserLogged, this.modelPurchases).subscribe((data : any) => {
      this.userPurchases = data.respuesta;
    });
  }

  public getUserSales(){
    this.backend.getUserPurchasesAndSales(this.idUserLogged,"ventas").subscribe((data : any) => {
      this.userSales = data.respuesta;
    });
  }

}
