import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { EmailPanelComponent } from './email-panel/email-panel.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { EmailTemplatesModule } from './email-templates/email-templates.module';

import * as $ from 'jquery';

@NgModule({
  declarations: [EmailComponent, EmailPanelComponent, EmailDetailComponent],
  imports: [CommonModule, FormsModule, EmailRoutingModule, EmailTemplatesModule],
})
export class EmailModule {}
