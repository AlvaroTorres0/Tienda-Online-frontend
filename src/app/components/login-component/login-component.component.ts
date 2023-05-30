import { Component } from '@angular/core';
import { BackendServiceService } from '../../services/backend-service/backend-service.service';
import { NotifierServiceService } from '../../services/notifier-service/notifier-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent {
  constructor(
    private _backend: BackendServiceService,
    private notifier: NotifierServiceService
  ) {}
  ngOnInit(): void {}

  //* Variables and Models

  public credentials = {
    email: '',
    password: '',
  };

  public validateCredentials() {
    if (!this.credentials.email || !this.credentials.password) {
      this.notifier.mostrarAlertaSuperior(
        'El usuario y la contraseña son requeridos',
        'Aceptar',
        3000
      );
    } else{
      this._backend.login(this.credentials).subscribe((data: any) => {
        (data.err || data.user === null)
          ? this.userNotFound()
          : this.saveDataInLocalStorage(data.userFound);
      });
    }
    
  }
  public userNotFound() {
    this.notifier.mostrarAlertaSuperior(
      'Usuario no encontrado, verifique sus credenciales',
      'Aceptar',
      3000
    );
    this.credentials.email = '';
    this.credentials.password = '';
  }
  public saveDataInLocalStorage(data: any): void {
    const idUser = data._id;
    const imageUser = data.fotografia;
    localStorage.setItem('idUser', idUser);
    localStorage.setItem('imageUser', imageUser);

    window.location.href = `/home`;
  }
}
