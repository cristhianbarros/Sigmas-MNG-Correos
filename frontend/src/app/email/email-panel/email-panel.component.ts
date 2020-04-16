import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmail } from '../email.component';
import { LinkPaginacion, MetadatoPaginacion } from 'src/app/models/model';

@Component({
  selector: 'app-email-panel',
  templateUrl: './email-panel.component.html',
  styleUrls: ['./email-panel.component.css'],
})
export class EmailPanelComponent implements OnInit {
  title: string;
  emails: any;
  emailsQuantity: number;
  linksPaginacion: LinkPaginacion;
  metadatosPaginacion: MetadatoPaginacion;
  cantidadPorPagina = '25';
  cantidadesPorPagina = ['10', '25', '50', 'Todos'];
  loading: boolean;
  state = 'send';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.linksPaginacion = {
      anterior: null,
      siguiente: null,
      primero: null,
      ultimo: null,
    };

    this.metadatosPaginacion = {
      cantidadPorPagina: null,
      paginaActual: null,
      ruta: null,
      total: null,
      ultimaPagina: null,
      desde: null,
      hasta: null,
    };

    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('state')) {
        const state = paramMap.get('state');

        switch (state) {
          case 'send':
            this.title = 'Sended';
            break;
          case 'queue':
            this.title = 'Queued';
            break;
          case 'no-send':
            this.title = 'No sended';
            break;
        }

        this.loading = false;
      }
    });
    this.emailsQuantity = 4;
    this.emails = [
      {
        id: 1237,
        from: {
          name: 'SIG+',
          email: 'sgp@ieb.com.co',
        },
        subject: 'Informe Tiempo Faltante Zapata Hernández Deisy Maribel',
        date: {
          date: '07 Apr',
          hour: '09:11 am',
        },
      },
      {
        id: 1238,
        from: {
          name: 'SIG+',
          email: 'sgp@ieb.com.co',
        },
        subject: 'Informe Tiempo Faltante Zapata Quiroz Ana María',
        date: {
          date: '07 Apr',
          hour: '09:11 am',
        },
      },
      {
        id: 1236,
        from: {
          name: 'SIG+',
          email: 'sgp@ieb.com.co',
        },
        subject: 'Informe Tiempo Faltante Zapata Giraldo Luis Alberto',
        date: {
          date: '07 Apr',
          hour: '09:11 am',
        },
      },
      {
        id: 1241,
        from: {
          name: 'SIG+',
          email: 'sgp@ieb.com.co',
        },
        subject: 'Informe Tiempo Faltante Zurita Obando Angie Marcela',
        date: {
          date: '07 Apr',
          hour: '09:11 am',
        },
      }
    ];
  }

  recargar() {
    this.loading = true;
    this.obtenerCorreos('', this.state);
  }

  obtenerCorreos(ruta?: string, state?: string) {
    /*
    this.servicioCorreo.obtenerCorreosConPaginacion(ruta, state).subscribe(
      (data) => {
        this.correos = data['emails'];
        if (data['links'] && data['meta']) {
          this.linksPaginacion = data['links'];
          this.metadatosPaginacion = data['meta'];
        }

        this.cantidadCorreos = this.correos.length;
        this.cargando = false;
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          `Ha ocurrido un error listando los correos (${error})`
        );
      }
    );
    */
  }

  cambiarPaginacion() {
    let ruta = this.metadatosPaginacion.ruta;

    ruta =
      this.cantidadPorPagina === 'Todos'
        ? `${ruta}?state=${this.state}&per_page=${this.metadatosPaginacion.total}&page=1`
        : `${ruta}?state=${this.state}&per_page=${this.cantidadPorPagina}&page=1`;

    localStorage.setItem('ruta', ruta);

    this.obtenerCorreos(ruta);
  }

  cambiarPagina(ruta: string) {
    const r = `${ruta}&state=${this.state}`;
    localStorage.setItem('ruta', r);
    this.obtenerCorreos(r);
  }

  detalleCorreo(correo: IEmail) {
    this.router.navigate(['/', 'correos', 'detalle', correo.id]);
  }

  eliminar(correo: IEmail) {
    /*
    this.servicioCorreo.eliminar(correo.id).subscribe(
      (data) => {
        const ruta = localStorage.getItem('ruta');
        this.obtenerCorreos(ruta, this.state);
        this.alerta.mostrarNotificacion(
          'success',
          'Correo eliminada exitosamente'
        );
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          'Ha ocurrido un error eliminando un correo. Verifique que no se encuentre asociado a una plantilla'
        );
      }
    );
    */
  }
}
