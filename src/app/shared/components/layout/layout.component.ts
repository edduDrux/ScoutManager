// src/app/shared/components/layout/layout.component.ts
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router'; // RouterModule para routerLink
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay, startWith, take } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { AppUser, UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Necessário para routerLink e router-outlet
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;

  now = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  ); // Para atualizar o ano se o app ficar aberto na virada
  currentYear = new Date().getFullYear();
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private userService = inject(UserService); // Injetar UserService
  private router = inject(Router);

  currentUser: AppUser | null = null; // Para dados do Firestore
  firebaseUserSubscription!: Subscription;
  routerSubscription!: Subscription;
  pageTitle: string = 'ScoutCalendar';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navItems = [
    { name: 'Home', route: '/home', icon: 'home' },
    { name: 'Loja', route: '/loja', icon: 'storefront' },
    {
      name: 'Financeiro',
      route: '/financeiro',
      icon: 'account_balance_wallet',
    },
    { name: 'Almoxarifado', route: '/almoxarifado', icon: 'inventory_2' },
    { name: 'Pessoas/Escoteiros', route: '/pessoas', icon: 'groups' },
    { name: 'Configurações', route: '/configuracoes', icon: 'settings' },
  ];

  ngOnInit() {
    this.firebaseUserSubscription = this.authService.currentUser$.subscribe(
      (fbUser) => {
        if (fbUser) {
          this.userService.getUserProfile(fbUser.uid).then((appUser) => {
            this.currentUser = appUser;
          });
        } else {
          this.currentUser = null;
        }
      }
    );

    // Atualizar título da página com base na rota
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Tenta pegar o título da rota mais profunda
        let currentRoute = this.router.routerState.root;
        let title = '';
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        if (currentRoute.snapshot.data['title']) {
          title = currentRoute.snapshot.data['title'];
        } else if (currentRoute.snapshot.routeConfig?.title) {
          // Para rotas definidas com 'title' diretamente
          title =
            typeof currentRoute.snapshot.routeConfig.title === 'string'
              ? currentRoute.snapshot.routeConfig.title
              : 'ScoutCalendar';
        }
        this.pageTitle = title || 'ScoutCalendar';

        // Fechar sidenav em navegação em telas pequenas
        this.isHandset$.pipe(take(1)).subscribe((isHandset) => {
          if (isHandset && this.drawer && this.drawer.opened) {
            this.drawer.close();
          }
        });
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    // O guard ou o onAuthStateChanged no authService já deve redirecionar para /login
  }

  ngOnDestroy() {
    if (this.firebaseUserSubscription) {
      this.firebaseUserSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
