import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { environment } from '../../environments/environment';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { InputMaskModule } from 'primeng/inputmask';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: environment.tokenWhitelistedDomains,
    blacklistedRoutes: environment.tokenBlacklistedRoutes
  };
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    SegurancaRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
