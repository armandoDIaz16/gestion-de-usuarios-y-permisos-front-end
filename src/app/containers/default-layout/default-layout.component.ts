import { Component, OnDestroy, Inject , OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public loggedIn: boolean;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public navItems=navItems;


  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    @Inject(DOCUMENT) _document?: any
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  ngOnInit() {
    //this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    //console.log(rutasRoles);
    navItems;
  }


  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
    localStorage.clear();
    console.clear();
}
}
//export const rutasRoles2 = rutas;
