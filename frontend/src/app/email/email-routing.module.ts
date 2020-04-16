import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';
import { EmailPanelComponent } from './email-panel/email-panel.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';


const routes: Routes = [
  { path: '',
    component: EmailComponent,
    children: [
      { path: '', redirectTo: '/email/panel/send', pathMatch: 'full'},
      { path: 'panel/:state', component: EmailPanelComponent },
      { path: 'detail/:id', component: EmailDetailComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
