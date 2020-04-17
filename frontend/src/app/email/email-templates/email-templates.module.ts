import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailTemplatesRoutingModule } from './email-templates-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateComponent } from './template/template.component';


@NgModule({
  declarations: [TemplatesComponent, TemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmailTemplatesRoutingModule
  ]
})
export class EmailTemplatesModule { }
