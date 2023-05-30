import { Component, Input } from '@angular/core';
import { BackendServiceService } from "../../../services/backend-service/backend-service.service";
import { NotifierServiceService } from "../../../services/notifier-service/notifier-service.service";

interface dataPrincipalUser {
  email: String,
  nombre: String,
  apellido: String,
  telefono: String,
  fotografia: String,
  codigopostal: String,
  estado: String,
  municipio: String,
  colonia: String,
  calleprincipal: String,
  numeroexterior: String,
  numinterior: String,
  calle1: String,
  calle2: String,
  descripcion: String
}

@Component({
  selector: 'app-profile-user-profile',
  templateUrl: './profile-user-profile.component.html',
  styleUrls: ['./profile-user-profile.component.css']
})
export class ProfileUserProfileComponent {
  constructor(private backend : BackendServiceService, private notifier : NotifierServiceService){}
  ngOnInit(): void {}
  public userLogged = localStorage.getItem('idUser');
  @Input() dataUser: dataPrincipalUser = {
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
  }

  public updateUser(){
    this.backend.update(this.userLogged,"user",this.dataUser).subscribe((data : any) => {
      this.notifier.mostrarAlertaSuperior("Datos modificados correctamente", "Aceptar", 5000)
    });
  }

}
