import { Component, Input } from '@angular/core';

interface userPrincipalSales{
  categoria : String,
  descripcion : String
  imagenes : [{
    img : String
  }],
  nombre : String,
  precio : Number,
  stock : Number,
};

@Component({
  selector: 'app-profile-user-sales',
  templateUrl: './profile-user-sales.component.html',
  styleUrls: ['./profile-user-sales.component.css']
})
export class ProfileUserSalesComponent {

  ngOnInit(): void {
    setTimeout(() => {
      this.frameSales = true;
    }, 1000);
  }
  @Input() userSales : userPrincipalSales[] = [];
  public frameSales = false;

}
