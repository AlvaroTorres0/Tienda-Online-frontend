import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//* Definimos una interfaz del objeto
interface imagesPrincipal {
  img: string;
}

@Component({
  selector: 'app-purchase-images',
  templateUrl: './purchase-images.component.html',
  styleUrls: ['./purchase-images.component.css'],
})
export class PurchaseImagesComponent {
  //* Creamos la entrada del objeto y lo asignamos a la propiedad images
  @Input() images: imagesPrincipal[] = [];
  selectedIndex = 0;

  prevImage() {
    this.selectedIndex == 0
      ? (this.selectedIndex = this.images.length - 1)
      : this.selectedIndex--;
  }

  nextImage() {
    this.selectedIndex == this.images.length - 1
      ? (this.selectedIndex = 0)
      : this.selectedIndex++;
  }
}
