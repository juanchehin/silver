import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasasComponent } from './tasas/tasas.component';

const routes: Routes = [
  { path: '', component: TasasComponent, data: { titulo: 'Tasas' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasasRoutingModule { }
