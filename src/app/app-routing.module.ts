import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/nuevo', component: UserFormComponent },
  { path: 'users/:id/editar', component: UserFormComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
