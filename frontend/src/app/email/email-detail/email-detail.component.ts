import { Component, OnInit } from '@angular/core';
import { IEmail } from '../email.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

declare var $: any;

export interface IModalParams {
  title: string;
  msj: string;
  action: string;
  buttons: { accept: string; cancel: string };
}

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css'],
})
export class EmailDetailComponent implements OnInit {
  email: IEmail;
  url: string;
  urlSafe: SafeResourceUrl;
  cargando = false;

  modalParams: IModalParams;

  modalParamsEliminar = {
    title: 'Eliminar Correo',
    msj: 'Realmente desear eliminar este correo ?',
    action: 'eliminar',
    buttons: {
      accept: 'Eliminar',
      cancel: 'Cancelar',
    },
  };

  modalParamsReenviar = {
    title: 'Reenviar Correo',
    msj: 'Realmente desear reenviar este correo ?',
    action: 'reenviar',
    buttons: {
      accept: 'Reenviar',
      cancel: 'Cancelar',
    },
  };
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.modalParams = {
      title: '',
      msj: '',
      action: '',
      buttons: {
        accept: '',
        cancel: '',
      },
    };

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        const id = parseInt(paramMap.get('id'));
        /*
        this.email = {
          id: 1237,
          from: { name: 'SIG+', email: 'sgp@ieb.com.co' },
          subject:
            'Informe Tiempo Faltante Zapata Hern\u00e1ndez Deisy Maribel',
          attachments: [],
          address: [
            {
              name: 'Cristhian Andr\u00e9s Barros Zambrano',
              email: 'cristhian.barros@ieb.com.co',
            },
          ],
          bcc: [],
          cc: [],
          date: { date: '07 Apr', hour: '09:11 am' },
          errors: [],
          state: 'send',
          template: { id: 1 },
        };
        */

        this.url = `${environment.url}/ehtmls/${id}`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        /*
         this.servicioCorreo.correoXId(id).subscribe((email) => {
           this.email = email;
           this.url = `${environment.productionUrl}/ehtmls/${id}`;
           this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
             this.url
           );
           this.cargando = false;
         });
         */
      }
    });
  }

  get showAddressTab() {
    return this.email.address.length;
  }

  get showCcTab() {
    return this.email.cc.length;
  }

  get showBccTab() {
    return this.email.bcc.length;
  }

  get showAttachmentsTab() {
    return this.email.attachments.length;
  }

  get showErrorsTab() {
    return this.email.errors.length;
  }

  getSantizeUrl(emailId: number, attachmentId: string) {
    const url = `${environment.url}/emails/${emailId}/attachments/${attachmentId}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showModal(modalParams: IModalParams) {
    this.modalParams = modalParams;
  }

  modalActions(action: string, correo: IEmail) {
    $('#modalDefault').modal('hide');
    switch (action) {
      case 'eliminar':
        this.eliminar(correo);
        break;
      case 'reenviar':
        this.reenviar(correo);
        break;
      default:
        break;
    }
  }

  reenviar(email: IEmail) {
    /*
    this.servicioCorreo.reenviarCorreoPlantilla(email).subscribe(
      (data) => {
        this.alerta.mostrarNotificacion(
          'success',
          'El correo ha sido reenviado con exito'
        );

        this.router.navigate(['/', 'correos', 'panel', email.state]);
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          'Ha ocurrido un error reenviando el correo.'
        );
      }
    );
    */
  }

  eliminar(email: IEmail) {
    /*
    this.servicioCorreo.eliminarCorreoPlantilla(email).subscribe(
      (data) => {
        this.alerta.mostrarNotificacion(
          'success',
          'Correo eliminada exitosamente'
        );

        this.router.navigate(['/', 'correos', 'panel', email.state]);
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          'Ha ocurrido un error eliminando un correo. Verifique que no se encuentre asociado a una plantilla.'
        );
      }
    );
    */
  }
}
