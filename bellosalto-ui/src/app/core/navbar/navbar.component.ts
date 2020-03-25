import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContaAzulService } from '../contaazul.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contaAzulService: ContaAzulService
  ) { }

  ngOnInit() {

    let code = this.activatedRoute.snapshot.queryParams["code"];
    let state = this.activatedRoute.snapshot.queryParams["state"];

    if (code && state) {
      this.contaAzulService.login(code, state);
    }

  }

  logout() {

    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onMouseout(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const relatedTarget = event.relatedTarget;

    if (target != null && relatedTarget != null && target.id != null && relatedTarget != null) {
      if (target.id.startsWith('__menu__') && !relatedTarget.id.startsWith('__menu__')) {
        this.exibindoMenu = false;
      }
    }
  }

  loginContaAzul() {
    this.contaAzulService.loginContaAzul();
  }
}
