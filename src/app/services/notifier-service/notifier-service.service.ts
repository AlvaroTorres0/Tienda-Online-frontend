import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierServiceService {

  constructor(private notifier : MatSnackBar) { }

  public mostrarAlerta(mensaje : string, buttonMesage : string, time : number){
    this.notifier.open(mensaje, buttonMesage, {
      duration: time,
      panelClass: ['success-snackbar'],
    });
  }
  public mostrarAlertaSuperior(mensaje : string, buttonMesage : string, time : number){
    this.notifier.open(mensaje, buttonMesage, {
      duration: time,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  }
}
