import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDetailsComponent } from './accountsModule/accounts-details/accounts-details.component';
import { AccountsComponent } from './accountsModule/accounts/accounts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeamsDetailsComponent } from './teamsModule/teams-details/teams-details.component';
import { TeamsComponent } from './teamsModule/teams/teams.component';
import { UserDetailsComponent } from './usersModule/user-details/user-details.component';
import { UsersComponent } from './usersModule/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'register', component: RegisterComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full" },
  { path: 'users', component: UsersComponent, pathMatch: "full" },
  { path: 'user-details', component: UserDetailsComponent, pathMatch: "full" },
  { path: 'accounts', component: AccountsComponent, pathMatch: "full" },
  { path: 'accounts-details', component: AccountsDetailsComponent, pathMatch: "full" },
  { path: 'teams', component: TeamsComponent, pathMatch: "full" },
  { path: 'teams-details', component: TeamsDetailsComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
