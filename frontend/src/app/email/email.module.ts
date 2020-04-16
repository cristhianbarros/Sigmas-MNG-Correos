import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { EmailPanelComponent } from './email-panel/email-panel.component';


@NgModule({
  declarations: [EmailComponent, EmailPanelComponent],
  imports: [CommonModule, FormsModule, EmailRoutingModule],
})
export class EmailModule {}
