import { Component, OnInit } from '@angular/core';

export interface IEmail {
  id: number;
  from: { name: string; email: string };
  subject: string;
  attachments: string;
  html: string;
  address: string;
  cc: string;
  bcc: string;
  date: { date: string; hour: string };
  state: string;
  errors: string;
  template: { id: number; styles: string; footer: string };
}

@Component({
  selector: 'app-email',
  template: `
    <div class="row">
      <div class="col-md-3">
        <ul class="list-group">
          <li
            class="list-group-item list-group-item-action"
            [routerLink]="['/', 'email', 'panel', 'send']"
            routerLinkActive="active"
          >
            <i class="fas fa-envelope-open-text"></i>
            Enviados
          </li>
          <li
            class="list-group-item list-group-item-action"
            [routerLink]="['/', 'email', 'panel', 'queue']"
            routerLinkActive="active"
          >
            <i class="fas fa-tasks"></i> En Proceso
          </li>
          <li
            class="list-group-item list-group-item-action"
            [routerLink]="['/', 'email', 'panel', 'no-send']"
            routerLinkActive="active"
          >
            <i class="fas fa-exclamation"></i> Sin Enviar
          </li>
          <li
            class="list-group-item list-group-item-action dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-clipboard-list" routerLinkActive="active"></i>
            Plantillas
            <div class="dropdown-menu dropdown-menu-lg-right">
              <a
                class="dropdown-item"
                [routerLink]="['/', 'email', 'templates']"
              >
                Nueva</a
              >
              <a
                class="dropdown-item"
                [routerLink]="['/', 'email', 'templates', 'list', 'templates']"
              >
                Mis Plantillas</a
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class EmailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
