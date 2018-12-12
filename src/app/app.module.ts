import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageMembersComponent } from './components/manage-members/manage-members.component';
import { LoginComponent } from './components/login/login.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { MembersService } from './services/members.service';
import { SessionService } from './services/session.service';
import { LeagueService } from './services/league.service';
import { SeasonService } from './services/season.service';
import { ItemService } from './services/item.service';
import { RegisterService } from './services/register.service';
import { TransactionService } from './services/transaction.service';

import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-members',
    component: ManageMembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'payment/:id',
    component: PaymentComponent
  },
  {
    path: 'confirmation/:id',
    component: ConfirmationComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent,
    ProfileComponent,
    ManageMembersComponent,
    LoginComponent,
    TopMenuComponent,
    PaymentComponent,
    ConfirmationComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    MembersService,
    SessionService,
    LeagueService,
    SeasonService,
    ItemService,
    RegisterService,
    TransactionService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
