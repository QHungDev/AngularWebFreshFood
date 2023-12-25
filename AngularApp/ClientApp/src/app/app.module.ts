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
import { ProductCategoryDetailComponent } from './product-category/product-category-detail/product-category-detail.component';
import { ProductCategoryIndexComponent } from './product-category/product-category-index/product-category-index.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleIndexComponent } from './article/article-index/article-index.component';
import { ProductMainCategoryDetailComponent } from './product-main-category/product-main-category-detail/product-main-category-detail.component';
import { ProductMainCategoryIndexComponent } from './product-main-category/product-main-category-index/product-main-category-index.component';
import { RequestSupplyIndexComponent } from './request-supply/request-supply-index/request-supply-index.component';
import { RequestSupplyDetailComponent } from './request-supply/request-supply-detail/request-supply-detail.component';
import { OnlyNumberDirective } from './request-supply/request-supply-detail/only-number.directive';
import { RequestSupplyApproveIndexComponent } from './request-supply-approve/request-supply-approve-index/request-supply-approve-index.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SecurityLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ArticleIndexComponent,
    ArticleDetailComponent,
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
    ProductCategoryIndexComponent,
    ProductCategoryDetailComponent,
    ProductMainCategoryIndexComponent,
    ProductMainCategoryDetailComponent,
    RequestSupplyIndexComponent,
    RequestSupplyDetailComponent,
    RequestSupplyApproveIndexComponent,
    OnlyNumberDirective,
    ChatComponent,
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
        ]
      },
      {
        path: 'product-category', component: SiteLayoutComponent, children: [
          { path: '', component: ProductCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: ProductCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:productCategoryID', component: ProductCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: ProductCategoryDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:productCategoryID', component: ProductCategoryDetailComponent, canActivate: [AuthencationGuard] },

        ]
      },
      {
        path: 'product-main-category', component: SiteLayoutComponent, children: [
          { path: '', component: ProductMainCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: ProductMainCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:productMainCategoryID', component: ProductMainCategoryIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: ProductMainCategoryDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:productMainCategoryID', component: ProductMainCategoryDetailComponent, canActivate: [AuthencationGuard] },

        ]
      },
      {
        path: 'article', component: SiteLayoutComponent, children: [
          { path: '', component: ArticleIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: ArticleIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index/:orderID', component: ArticleIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: ArticleDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:orderID', component: ArticleDetailComponent, canActivate: [AuthencationGuard] },
        ]
      },
      {
        path: 'request-supply', component: SiteLayoutComponent, children: [
          { path: '', component: RequestSupplyIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: RequestSupplyIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'detail', component: RequestSupplyDetailComponent, canActivate: [AuthencationGuard] },
          { path: 'detail/:ID', component: ArticleDetailComponent, canActivate: [AuthencationGuard] },
        ]
      },
      {
        path: 'request-supply-approve', component: SiteLayoutComponent, children: [
          { path: '', component: RequestSupplyApproveIndexComponent, canActivate: [AuthencationGuard] },
          { path: 'index', component: RequestSupplyApproveIndexComponent, canActivate: [AuthencationGuard] },
        ]
      },

      //Security layout routers
      {
        path: '', component: SecurityLayoutComponent, children: [
          { path: 'login', component: LoginComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent }
        ]
      },
      {
        path: '', component: SecurityLayoutComponent, children: [
          { path: 'chat', component: ChatComponent },
        ]
      },
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'privacy', component: PrivacyComponent },
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
