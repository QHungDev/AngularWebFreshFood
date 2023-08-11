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

@NgModule({
  declarations: [
    AppComponent,
    ProductIndexComponent,
    SiteLayoutComponent,
    VcHeaderComponent,
    HomeComponent,
    ProductDetailComponent,
    LoginComponent
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
      //Account routers
      {
        path: '', component: SiteLayoutComponent, children: [         
          { path: 'login', component: LoginComponent},
          // { path: 'category', component: AccountCategoryComponent},
        ]
      },

      //Security layout routers
      

      //None layout routers
     
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
