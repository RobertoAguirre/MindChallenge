import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDetailsComponent } from './accountsModule/accounts-details/accounts-details.component';
import { AccountsComponent } from './accountsModule/accounts/accounts.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TeamsDetailsComponent } from './teamsModule/teams-details/teams-details.component';
import { TeamsMovementsComponent } from './teamsModule/teams-movements/teams-movements.component';
import { TeamsComponent } from './teamsModule/teams/teams.component';
import { UserDetailsComponent } from './usersModule/user-details/user-details.component';
import { UsersComponent } from './usersModule/users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full",canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'register', component: RegisterComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'users', component: UsersComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'user-details', component: UserDetailsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'accounts', component: AccountsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'accounts-details', component: AccountsDetailsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'teams', component: TeamsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'teams-details', component: TeamsDetailsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'teams-movements', component: TeamsMovementsComponent, pathMatch: "full",canActivate: [LoginGuard]  },
  { path: 'profile', component: ProfileComponent, pathMatch: "full",canActivate: [LoginGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
