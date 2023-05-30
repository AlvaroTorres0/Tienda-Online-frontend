import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { HomePrincipalComponentComponent } from './components/home-principal-component/home-principal-component.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { PurchasePrincipalComponent } from './components/purchase-principal/purchase-principal.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { SaleComponent } from './components/sale/sale.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchCategorieComponent } from './components/search-categorie/search-categorie.component';
import { CartShopComponent } from './components/cart-shop/cart-shop.component';


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'login', component: LoginComponentComponent},
  {path: 'home', component: HomePrincipalComponentComponent},
  {path: 'new-user', component: NewuserComponent},
  {path: 'purchase-product/:idProduct', component: PurchasePrincipalComponent},
  {path: 'search/:userSearch', component: SearchProductsComponent},
  {path: 'search-by-categorie/:categorie', component: SearchCategorieComponent},
  {path: 'new-sale', component: SaleComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart-shop', component: CartShopComponent},
  {path: 'cart-shop/:id/:pieces', component: CartShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
