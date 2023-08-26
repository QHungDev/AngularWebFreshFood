import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { VcHeaderComponent } from './_component/vc-header/vc-header.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { VcFooterComponent } from './_component/vc-footer/vc-footer.component';
import { ClientCartIndexComponent } from './client-cart/client-cart-index/client-cart-index.component';
import { ClientCartDetailComponent } from './client-cart/client-cart-detail/client-cart-detail.component';
import { RegisterclientComponent } from './registerclient/registerclient.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductIndexComponent,
    SiteLayoutComponent,
    VcHeaderComponent,
    HomeComponent,
    ProductDetailComponent,
    LoginComponent,
    CartComponent,
    VcFooterComponent,
    ClientCartIndexComponent,
    ClientCartDetailComponent,
    RegisterclientComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: '', component: HomeComponent, pathMatch: 'full'}

        ]
      },
      //Product routers
      {
        path: 'product', component: SiteLayoutComponent, children: [
          { path: '', component: ProductIndexComponent, },
          { path: 'index', component: ProductIndexComponent },
          { path: 'index/:productID', component: ProductIndexComponent },
          { path: 'detail', component: ProductDetailComponent},
          { path: 'detail/:productID', component: ProductDetailComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      },
      //////CLIENT _CART
      {
        path: 'client-cart', component: SiteLayoutComponent, children: [
          { path: '', component: ClientCartIndexComponent, },
          { path: 'index', component: ClientCartIndexComponent },
          { path: 'index/:orderID', component: ClientCartIndexComponent },
          { path: 'detail', component: ClientCartDetailComponent},
          { path: 'detail/:orderID', component: ClientCartDetailComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      },
      //Account routers
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'login', component: LoginComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      },
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'registerclient', component: RegisterclientComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      },
      /////CART
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'cart', component: CartComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      }
      //Security layout routers


      //None layout routers

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
