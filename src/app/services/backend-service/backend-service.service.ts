import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  public urlBackEnd;
  constructor(private _dataBase : HttpClient) { 
    this.urlBackEnd = 'http://localhost:3900';
  }
  
  
  //* Methods
  createMethod = (modelName : string, body : any) => {
    console.log(body);
    let endPoint = `${this.urlBackEnd}/new/${modelName}`;
    return this._dataBase.post(endPoint,body);
  }
  
  findAll = (modelName : string) => {
    let endPoint = `${this.urlBackEnd}/all/${modelName}`;
    return this._dataBase.get(endPoint);
  };

  findById = (modelName : string, id : any) => {
    let endPoint = `${this.urlBackEnd}/one/${modelName}/${id}`;
    return this._dataBase.get(endPoint);
  }

  findVendor = (id : any) => {
    let endPoint = `${this.urlBackEnd}/vendor/productos/${id}`;
    return this._dataBase.get(endPoint);
  }
  
  login = (body : any) =>{
    let endPoint = `${this.urlBackEnd}/login/user`;
    return this._dataBase.post(endPoint, body);
  }  
  getUserPurchasesAndSales = (idUser : any, model : string) => {
    let endPoint = `${this.urlBackEnd}/all/${model}/oneUser/${idUser}`;
    return this._dataBase.get(endPoint);
  }

  update(id : any, model : string, body : any){
    let endPoint = `${this.urlBackEnd}/update/${model}/${id}`;
    return this._dataBase.put(endPoint,body);    
  }

  discount(idProduct : any, body : any){
    let endPoint = `${this.urlBackEnd}/update/productos/${idProduct}`;
    return this._dataBase.put(endPoint,body);    
  }

  getProductsByCategorie(categorie : string){
    let endPoint = `${this.urlBackEnd}/categorie/productos/${categorie}`;
    return this._dataBase.get(endPoint);
  }
}
