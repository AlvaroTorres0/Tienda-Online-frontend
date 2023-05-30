import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { AzureServiceService } from '../../services/azure-service/azure-service.service';
import { BackendServiceService } from '../../services/backend-service/backend-service.service';
import { NotifierServiceService } from '../../services/notifier-service/notifier-service.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
})
export class SaleComponent {
  constructor(
    private blobService: AzureServiceService,
    private _backend: BackendServiceService,
    private notifier: NotifierServiceService
  ) {}

  ngOnInit(): void {
    if (this.vendor === null) {
      this.notifier.mostrarAlertaSuperior(
        'Para vender debes iniciar sesión',
        'Aceptar',
        3000
      );
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } else {
      this.productFrame = true;
    }
  }

  //? Estatus ventanas
  public productFrame = false;
  public imagesFrame = false;
  public showImages = false;
  public loader = false;

  //* VARIABLES
  public files: NgxFileDropEntry[] = [];
  public images: any = [];
  public containerName = 'productos';
  public MODEL = 'producto';
  public vendor = localStorage.getItem('idUser');
  //? Es la clave que nos genera el servicio de Azure Blob Storage para añadir y eliminar imágenes del contenedor
  //! firma de acceso compartido (SAS)
  public sas =
    'sp=racwdli&st=2023-05-04T07:05:11Z&se=2023-05-31T15:05:11Z&spr=https&sv=2022-11-02&sr=c&sig=fLx5UNEtE9GGHWhuKe553l0YBVJFd865hDkYCFu9zMY%3D';
  public dataProduct = {
    nombre: '',
    marca: '',
    categoria: '',
    descripcion: '',
    precio: Number,
    stock: 1,
    vendedor: this.vendor,
    imagenes: this.images,
  };

  public saleContinue = () => {
    this.productFrame = false;
    this.imagesFrame = true;
  };

  //! MÉTODOS AZURE BLOB STORAGE
  //? Este método sube el archivo a nuestro contenedor
  public upload(file: File) {
    const URL = this.blobService.uploadImage(
      this.sas,
      file,
      file.name,
      this.containerName,
      () => {
      }
    );
    return URL;
  }

  //* Agrega las urls a la data del producto
  public pushImgs(url: {}) {
    let image = {
      img: url,
    };
    this.images.push(image);
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
          //* Esperamos a que los blobs se suban al contenedor y después las agregamos al objecto
          this.loader = true;
          this.pushImgs(url);
          setTimeout(() => {
            this.loader = false;
            this.showImages = true;
          }, 10000);
        });
      }
    }
  }

  //! MÉTODOS BACKEND
  public postNewSale() {
    this._backend
      .createMethod(this.MODEL, this.dataProduct)
      .subscribe((resp: any) => {
        this.notifier.mostrarAlertaSuperior(
          'Producto registrado correctamente',
          'Aceptar',
          3000
        );
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      });
  }

  NumberValidation(event: any) {
    const inputChar = event.key;

    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  PriceValidation(event: any) {
    const inputChar = event.key;
    const inputValue = event.target.value;

    // Verificar si el carácter ingresado es un dígito o un punto decimal
    if (!/^\d$/.test(inputChar) && inputChar !== '.') {
      event.preventDefault();
    }

    // Verificar si ya existe un punto decimal en el valor actual
    if (inputChar === '.' && inputValue.includes('.')) {
      event.preventDefault();
    }

    // Verificar si ya hay dos dígitos después del punto decimal
    if (inputValue.includes('.') && inputValue.split('.')[1].length >= 2) {
      event.preventDefault();
    }
  }
}
