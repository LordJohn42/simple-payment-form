import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayFormComponent } from './pay-form/pay-form.component';


const routes: Routes = [
  { path: '',  component: PayFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
