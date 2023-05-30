import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Controlar formularios reactivos
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { BackendServiceService } from '../../services/backend-service/backend-service.service';
import { AzureServiceService } from '../../services/azure-service/azure-service.service';
import { NotifierServiceService } from '../../services/notifier-service/notifier-service.service';
import { Router } from '@angular/router';
import { DipomexServiceService } from 'src/app/services/dipomex-service/dipomex-service.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css'],
})
export class NewuserComponent {
  dataUserForm: FormGroup;
  addressUserForm: FormGroup;
  dataAddress: any = [];

  constructor(
    private _backend: BackendServiceService,
    private blobService: AzureServiceService,
    private notifier: NotifierServiceService,
    private router: Router,
    private dipomex: DipomexServiceService
  ) {
    this.dataUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required]),
    });
    this.addressUserForm = new FormGroup({
      codigopostal: new FormControl('', [Validators.required]),
      estado: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      municipio: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      colonia: new FormControl('', [Validators.required]),
      calleprincipal: new FormControl('', [Validators.required]),
      numeroexterior: new FormControl('', [Validators.required]),
      numerointerior: new FormControl(''),
      calle1: new FormControl('', [Validators.required]),
      calle2: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //* Para validar que el usuario no está logueado
    this.validateUserIsNotLogged();
  }

  //? estatus ventanas
  public formUser = false;
  public formAddress = false;
  public containerName = 'usuarios';
  public userImage = false;
  public gif = true;
  public inputDisabled = true;

  //* Variables y modelos
  public estados = [{ nombre: 'Morelos' }, { nombre: 'Ciudad de México' }];
  public files: NgxFileDropEntry[] = [];
  //? Es la clave que nos genera el servicio de Azure Blob Storage para añadir y eliminar imágenes del contenedor
  //! firma de acceso compartido (SAS)
  public sas =
    'sp=racwdli&st=2023-05-13T23:12:38Z&se=2023-05-31T07:12:38Z&spr=https&sv=2022-11-02&sr=c&sig=4FhCezc7hZFoU4Hli2O%2BI15B7RXZfTQBJgpyUaxxtrQ%3D';
  public dataUser = {
    fotografia: '',
  };
  public MODEL = 'user';

  //! Methods
  public continueAddress() {
    this.formUser = false;
    this.formAddress = true;
  }

  public validateUserIsNotLogged() {
    const idUser = localStorage.getItem('idUser');
    if (idUser === null) {
      this.formUser = true;
    } else {
      this.formUser = false;
      window.location.href = '/home';
    }
  }

  public createUser() {
    this._backend
      .createMethod(this.MODEL, this.dataUser)
      .subscribe((resp: any) => {
        this.notifier.mostrarAlertaSuperior(
          'Usuario registrado correctamente',
          'Aceptar',
          3000
        );
        this.router.navigate(['/login']);
      });
  }

  //? Peticion GET a a la api
  public getAddressInfo(postalCode: string) {
    this.dipomex.getByPostalCode(postalCode).subscribe((data: any) => {
      //Generamos un objeto con las propiedades que necesitamos
      const data1 = {
        postal: postalCode,
        estado: data.codigo_postal.estado,
        municipio: data.codigo_postal.municipio,
        colonias: data.codigo_postal.colonias,
      };
      //Vaciamos el arreglo en cada peticion
      this.dataAddress = [];
      //llenamos el arreglo con los datos que queremos
      this.dataAddress.push(data1);
      //Colocamos los valores en los inputs
      this.addressUserForm.patchValue({
        codigopostal: data1.postal,
        municipio: data1.municipio,
        estado: data1.estado,
      });
    });
  }

  //? Metodo para detectar el enter
  onEnter() {
    const postalCodeValue = this.addressUserForm.get('codigopostal')?.value;
    this.getAddressInfo(postalCodeValue);
  }
  //? Metodo para detectar que ya no esta en el input
  onBlur() {
    const postalCodeValue = this.addressUserForm.get('codigopostal')?.value;
    this.getAddressInfo(postalCodeValue);
  }
  //? Método para el Drag and Drop
  public uploadDragAndDrop(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      //* Verificamos si es un archivo
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          //! Llamamos al método para subir y le pasamos el archivo como parámetro
          let url = this.upload(file);
          //* Esperamos a que los blobs se suban al contenedor y después las agregamos al objeto
          this.dataUser.fotografia = url;
          this.gif = false;
          setTimeout(() => {
            this.userImage = true;
          }, 3000);
        });
      }
    }
  }

  //? Este método sube el archivo a nuestro contenedor en Azure
  public upload(file: File) {
    const URL = this.blobService.uploadImage(
      this.sas,
      file,
      file.name,
      this.containerName,
      () => {
        this.notifier.mostrarAlertaSuperior('Archivo Subido', 'Aceptar', 3000);
      }
    );
    return URL;
  }

  //? Este método valida que no entren letras
  numberValidation(event: Event, formGroup: FormGroup, controlName: string) {
    if (!formGroup) {
      return;
    }
    const input = event.target as HTMLInputElement;
    if (!input) {
      return;
    }
    const value = input.value || '';
    const clean_value = value.replace(/\D/g, '');
    const control = formGroup.get(controlName);
    if (control) {
      control.setValue(clean_value);
    }
  }
  //? Este método valida que no entren numeros
  lyricsValidation(event: Event, formGroup: FormGroup, controlName: string) {
    if (!formGroup) {
      return;
    }
    const input = event.target as HTMLInputElement;
    if (!input) {
      return;
    }
    const value = input.value || '';
    const clean_value = value.replace(/[^a-zA-Z\sáéíóúÁÉÍÓÚ]/g, '');
    const control = formGroup.get(controlName);
    if (control) {
      control.setValue(clean_value);
    }
  }

  //? Este método funciona con el boton para validar y enviar datos
  onSubmit(formGroup: FormGroup) {
    if (formGroup == this.dataUserForm && formGroup.valid) {
      this.dataUser = { ...this.dataUser, ...this.dataUserForm.value };

      this.continueAddress();
    } else if (formGroup == this.addressUserForm && formGroup.valid) {
      this.addressUserForm.get('estado')?.enable();
      this.addressUserForm.get('municipio')?.enable();
      this.dataUser = { ...this.dataUser, ...this.addressUserForm.value };
      this.addressUserForm.get('estado')?.disable();
      this.addressUserForm.get('municipio')?.disable();
      this.createUser();
    } else {
      this.notifier.mostrarAlertaSuperior(
        'No dejes vacíos los campos marcados con un asterisco (*)',
        'Aceptar',
        Infinity
      );
    }
  }
}
