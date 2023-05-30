import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from "../../services/backend-service/backend-service.service";

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
  constructor(public route : ActivatedRoute, private _backend : BackendServiceService){}

  ngOnInit(): void {
    //? Dividimos la búsqueda y la asignamos a un array
    this.arraySearch = this.search.split(' ');
    this.maxWords = this.arraySearch.length;   
    this.getAllProducts();   
  }

  //* Variables and Models
  public arraySearch : any = [];
  public productsFilter : any = [];
  public vendors : any = [];
  public MODEL = "productos"
  //? Parámtros de búsqueda
  public search = String(this.route.snapshot.paramMap.get('userSearch')).toLowerCase();
  //* Máximo de palabras de la búsqueda
  public maxWords = 0


  public getAllProducts(){
    this._backend.findAll(this.MODEL).subscribe((data : any) => {
      this.traverProducts(data.respuesta)
    });
  }

  public traverProducts(data : any){
    for (const iterator of data) {
      let nameProduct = iterator.nombre.toLowerCase(); 
      if (this.searchCoincidence(nameProduct) >= 50) {
        this.productsFilter.push(iterator);
      }
    }
    this.findInfoVendors();
  }

  public searchCoincidence(name : string){
    let wordsContains = 0
    for (const key of this.arraySearch) {
      if (name.includes(key)) {
        wordsContains++;        
      }
    }
    return this.operationValidation(wordsContains); 
  }

  public operationValidation(wordsContains : number) : number{
    return wordsContains*100 / this.maxWords; 
  }

  public findInfoVendors(){
    for (let i = 0; i < this.productsFilter.length; i++) {
      this._backend.findVendor(this.productsFilter[i].vendedor).subscribe((data : any)=>{
        this.vendors.push(data.respuesta.nombre);
      });      
    }
  }

  public redirectToPurchase(idProduct : any){
    window.location.href = `purchase-product/${idProduct}`;
  }
}
