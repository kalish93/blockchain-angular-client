import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './auth/services/jwt.interceptor';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { ElectionModule } from './election/election.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { OrganizationModule } from './organization/organization.module';


@NgModule({
  declarations: [AppComponent, HomeComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
    }),
    CoreModule,
    UserModule,
    SharedModule,
    CommonModule, 
    RouterOutlet,
    AuthModule,
    AppRoutingModule,
    ElectionModule,
    OrganizationModule
  ],
})
export class AppModule {}
