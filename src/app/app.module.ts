import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  //每个在浏览器中运行应用都需要它
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 动画  Angular 4 里面的导入用法
import { RouterModule } from '@angular/router';  //使用路由模块必须引入的
import { HttpModule,JsonpModule ,Http} from '@angular/http';  //使用http请求必须导入，JsonpModule是只要使用jsonp跨域才导入
import { ReactiveFormsModule } from '@angular/forms';  //	响应式表单 必须导入，如果是模板驱动表单则导入FormModule
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate'; // 多语言切换
import { GrowlModule } from 'primeng/components/growl/growl';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { UserLoginService } from './user/user-login/user-login.service';
import { ForgetPwdComponent } from './user/forget-pwd/forget-pwd.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserRegisterService } from './user/user-register/user-register.service';
import { ForgetPwdService } from './user/forget-pwd/forget-pwd.service';

import { EqualValidator } from './user/user-register/directives/equal-validator.directive';

import { ChartComponent } from './chart/chart.component';
import { EChartOptionDirective1 } from './chart/echart-option.directive';
import { GaodeMapComponent } from './map/gaode-map/gaode-map.component';
import { AmapComponent } from './map/gaode-map/amap/amap.component';
import { JsplumbDemoComponent } from './jsplumb-demo/jsplumb-demo.component';
import {appRoutes} from './app.routes';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    ForgetPwdComponent,
    UserRegisterComponent,
    EqualValidator,
    EChartOptionDirective1,
    ChartComponent,
    AmapComponent,
    GaodeMapComponent,
    JsplumbDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    SharedModule,
    GrowlModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserLoginService,
    UserRegisterService,
    ForgetPwdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
