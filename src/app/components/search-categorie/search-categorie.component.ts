import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from "../../services/backend-service/backend-service.service";

@Component({
  selector: 'app-search-categorie',
  templateUrl: './search-categorie.component.html',
  styleUrls: ['./search-categorie.component.css']
})
export class SearchCategorieComponent {
  constructor(private router : ActivatedRoute, private backend : BackendServiceService){}

  ngOnInit(): void {
    this.searchProducts();
  
  }

  public products : any = [];
  public vendors : any = []; //* Tiene solo los nombres de los vendedores
  public categorie = String(this.router.snapshot.paramMap.get('categorie'));


  searchProducts(){
    this.backend.getProductsByCategorie(this.categorie).subscribe((data : any) => {
      this.products = data.respuesta;
    });
    setTimeout(() => {
      this.findInfoVendors();
    }, 2000);
  }
  public findInfoVendors(){
    for (let i = 0; i < this.products.length; i++) {
      this.backend.findVendor(this.products[i].vendedor).subscribe((data : any)=>{
        this.vendors.push(data.respuesta.nombre);
      });      
    }
  }
  public redirectToPurchase(idProduct : any){
    window.location.href = `purchase-product/${idProduct}`;
  }

}
