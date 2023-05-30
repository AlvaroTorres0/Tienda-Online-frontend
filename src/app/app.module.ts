import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { HomePrincipalComponentComponent } from './components/home-principal-component/home-principal-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { OffersComponent } from './components/offers/offers.component';
import { PublicityVogueComponent } from './components/publicity-vogue/publicity-vogue.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { PurchasePrincipalComponent } from './components/purchase-principal/purchase-principal.component';
import { PurchaseImagesComponent } from './components/purchase-principal/purchase-images/purchase-images.component';
import { PurchaseDataProductComponent } from './components/purchase-principal/purchase-data-product/purchase-data-product.component';
import { PurchasePaymentComponent } from './components/purchase-principal/purchase-payment/purchase-payment.component';
import { SaleComponent } from './components/sale/sale.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUserProfileComponent } from './components/profile/profile-user-profile/profile-user-profile.component';
import { ProfileUserSalesComponent } from './components/profile/profile-user-sales/profile-user-sales.component';
import { ProfileUserPurchasesComponent } from './components/profile/profile-user-purchases/profile-user-purchases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { SearchCategorieComponent } from './components/search-categorie/search-categorie.component';
import { CartShopComponent } from './components/cart-shop/cart-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomePrincipalComponentComponent,
    NavbarComponent,
    PromotionsComponent,
    OffersComponent,
    PublicityVogueComponent,
    NewuserComponent,
    PurchasePrincipalComponent,
    PurchaseImagesComponent,
    PurchaseDataProductComponent,
    PurchasePaymentComponent,
    SaleComponent,
    SearchProductsComponent,
    ProfileComponent,
    ProfileUserProfileComponent,
    ProfileUserSalesComponent,
    ProfileUserPurchasesComponent,
    CategoriesComponent,
    SearchCategorieComponent,
    CartShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxFileDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
