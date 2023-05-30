import { Component } from '@angular/core';
import { NotifierServiceService } from "../../services/notifier-service/notifier-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private notifier : NotifierServiceService){}
  ngOnInit(): void {
    this.validateUserLogged()
    this.addEventListenerSearchBar();
  }

  //* Variables and Models
  public menuProfile = false;
  public buttonMenuProfile = false;
  public buttonCarShop = false;
  public buttonSignIn = false;
  public dataUserLoged = {
    id: localStorage.getItem('idUser'),
    image: localStorage.getItem('imageUser'),
  };

  public addEventListenerSearchBar() {
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    searchBar?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const value = searchBar.value;
        (value !== '')
          ? window.location.href = `/search/${value}`
          : this.notifier.mostrarAlerta("Oops... ¿Algo más claro?","Aceptar",3000)
      }
    });
  }

  public showMenuProfile(){
    this.menuProfile = true;
    setTimeout(() => {
      this.disabledMenuProfile();
    }, 500);
  }

  public disabledMenuProfile(){
    const menu = document.querySelector('.menu');
    menu?.addEventListener('mouseleave', ()=>{
      this.menuProfile = false;
    });
  }

  public redirectToHome() {
    window.location.href = '/home';
  }
  
  public redirectToCartShop(){
    window.location.href = '/cart-shop';
  }
  public redirectToSale() {
    window.location.href = '/new-sale';
  }

  public redirectToProfile() {
    window.location.href = '/profile';
  }
  public redirectToLogin(){
    window.location.href = '/login';
  }
  
  public signOff(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('imageUser');
    this.redirectToLogin();
  }
  

  public validateUserLogged(){
    (localStorage.getItem('idUser') != null)
      ? (this.buttonMenuProfile = true, this.buttonCarShop = true)
      : this.buttonSignIn= true
  }
}
