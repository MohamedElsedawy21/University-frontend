import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AuthorizationComponent
  ],
  providers: []
})
export class AuthModule {}
