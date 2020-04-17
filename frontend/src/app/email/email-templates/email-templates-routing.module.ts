import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { TemplatesComponent } from './templates/templates.component';


const routes: Routes = [
  { path: '', component: TemplateComponent },
  { path: ':id', component: TemplateComponent },
  { path: 'list/templates', component: TemplatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplatesRoutingModule { }
