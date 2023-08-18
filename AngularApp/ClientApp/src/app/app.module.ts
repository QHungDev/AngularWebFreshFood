import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthencationGuard } from './guards/authencation.guard';

import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SecurityLayoutComponent } from './_layout/security-layout/security-layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { VcHeaderComponent } from './_component/vc-header/vc-header.component';
import { VcNavigationComponent } from './_component/vc-navigation/vc-navigation.component';
import { VcBreadcrumbComponent } from './_component/vc-breadcrumb/vc-breadcrumb.component';
import { VcFooterComponent } from './_component/vc-footer/vc-footer.component';
import { VcAdminSettingComponent } from './_component/vc-admin-setting/vc-admin-setting.component';
import { VcAdminInfoComponent } from './_component/vc-admin-info/vc-admin-info.component';
import { AccountIndexComponent } from './account/account-index/account-index.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountCategoryComponent } from './account/account-category/account-category.component';
import { ProductIndexComponent } from './product/product-index/product-index.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderIndexComponent } from './order/order-index/order-index.component';
@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SecurityLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ArticleListComponent,
    PrivacyComponent,
    VcHeaderComponent,
    VcNavigationComponent,
    VcBreadcrumbComponent,
    VcFooterComponent,
    VcAdminSettingComponent,
    VcAdminInfoComponent,
    AccountIndexComponent,
    AccountDetailComponent,
    AccountCategoryComponent,
    ProductIndexComponent,
    ProductDetailComponent,
    OrderIndexComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      //Site layout routers
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthencationGuard] },
          { path: 'article-list', component: ArticleListComponent, canActivate: [AuthencationGuard] }
        ]
      },
      //Product routers
      {
        path: 'product', component: SiteLayoutComponent, children: [
          { path: '', component: ProductIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: ProductIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:productID', component: ProductIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: ProductDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:productID', component: ProductDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'category', component: AccountCategoryComponent, canActivate: [AuthencationGuard] },
        ]
      },
      //Account routers
      {
        path: 'account', component: SiteLayoutComponent, children: [
          { path: '', component: AccountIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: AccountIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:username', component: AccountIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: AccountDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:username', component: AccountDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'category', component: AccountCategoryComponent, canActivate: [AuthencationGuard] },
        ]
      },
      {
        path: 'order', component: SiteLayoutComponent, children: [
          { path: '', component: OrderIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: OrderIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:orderID', component: OrderIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: OrderDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:orderID', component: OrderDetailComponent, canActivate: [AuthencationGuard] },
          // { path: 'category', component: AccountCategoryComponent, canActivate: [AuthencationGuard] },
        ]
      },

      //Security layout routers
      {
        path: '', component: SecurityLayoutComponent, children: [
          { path: 'login', component: LoginComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent }
        ]
      },

      //None layout routers
      { path: 'privacy', component: PrivacyComponent },
    ])
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
