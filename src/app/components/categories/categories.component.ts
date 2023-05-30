import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  
  public searchCategorie(categorie : string){
    window.location.href = `search-by-categorie/${categorie}`;
  }

}
