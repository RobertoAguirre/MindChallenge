import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from '../app/usersModule/users/users.component';
import { TablesComponent } from './reusable/tables/tables.component';
import { KeysPipe } from './keys.pipe';
import { UserDetailsComponent } from './usersModule/user-details/user-details.component';
import { AccountsComponent } from './accountsModule/accounts/accounts.component';
import { AccountsDetailsComponent } from './accountsModule/accounts-details/accounts-details.component';
import { TeamsComponent } from './teamsModule/teams/teams.component';
import { TeamsDetailsComponent } from './teamsModule/teams-details/teams-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    TablesComponent,
    KeysPipe,
    UserDetailsComponent,
    AccountsComponent,
    AccountsDetailsComponent,
    TeamsComponent,
    TeamsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
