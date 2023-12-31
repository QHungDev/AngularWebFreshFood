import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';





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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NewsIndexComponent } from './news/news-index/news-index.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { BillSuccessComponent } from './bill/bill-success/bill-success.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthenticCodeComponent } from './authentic-code/authentic-code.component';
import { OnlyNumberDirective } from './bill/bill-detail/only-number.directive';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';


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
    RegisterclientComponent,
    NewsIndexComponent,
    NewsDetailComponent,
    BillDetailComponent,
    BillSuccessComponent,
    ClientInfoComponent,
    ForgotPasswordComponent,
    AuthenticCodeComponent,
    OnlyNumberDirective,
    ContactComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    // ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot(),
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
          { path: 'detail/:orderID', component: ClientCartDetailComponent}
        ]
      },
      {
        path: 'news', component: SiteLayoutComponent, children: [
          { path: '', component: NewsIndexComponent, },
          { path: 'index', component: NewsIndexComponent },
          { path: 'index/:orderID', component: NewsIndexComponent },
          { path: 'detail', component: NewsDetailComponent},
          { path: 'detail/:orderID', component: NewsDetailComponent}
        ]
      },
      {
        path: 'contact', component: SiteLayoutComponent, children: [
          { path: '', component: ContactComponent, },
        ]
      },
      {
        path: 'chat', component: SiteLayoutComponent, children: [
          { path: '', component: ChatComponent, },
        ]
      },
      {
        path: 'bill', component: SiteLayoutComponent, children: [
          { path: '', component: BillDetailComponent, },
          { path: 'bill-detail', component: BillDetailComponent },
          { path: 'bill-success', component: BillSuccessComponent},
          { path: 'bill-success/:errorCode', component: BillSuccessComponent},
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
          { path: 'forgot-password', component: ForgotPasswordComponent},
          { path: 'authentic-code', component: AuthenticCodeComponent},
        ]
      },
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'client-info', component: ClientInfoComponent}
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

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
