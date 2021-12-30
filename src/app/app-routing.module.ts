import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHomeComponent } from './my-home/my-home.component';
import { MyMovieComponent } from './my-movie/my-movie.component';

const routes: Routes = [
   {path:'', redirectTo:'home', pathMatch: 'full'},
   { path:'home', component:MyHomeComponent},
   { path: 'movie/:id', component:MyMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const route=[MyHomeComponent,MyMovieComponent];