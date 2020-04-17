import { Component, OnInit } from '@angular/core';
import { LinkPaginacion, MetadatoPaginacion } from 'src/app/models/model';
import { ITemplate } from '../template/template.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent implements OnInit {
  templates: ITemplate[];
  linksPaginacion: LinkPaginacion;
  metadatosPaginacion: MetadatoPaginacion;
  cantidadPorPagina = '25';
  cantidadesPorPagina = ['10', '25', '50', 'Todos'];
  loading = true;

  constructor(
    public router: Router
  ) // public servicioPlantilla: PlantillasService,
  // public alerta: AlertasService
  {}

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

    // this.obtenerPlantillas('');
  }

  obtenerPlantillas(ruta?: string) {
    /*
    this.servicioPlantilla.obtenerPlantillasConPaginacion(ruta).subscribe(
      (data) => {
        this.plantillas = data['templates'];
        if (data['links'] && data['meta']) {
          this.linksPaginacion = data['links'];
          this.metadatosPaginacion = data['meta'];
        }

        this.cantidadPlantillas = this.plantillas.length;
        this.cargando = false;
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          `Ha ocurrido un error listando las plantillas (${error})`
        );
      }
    );
    */
  }

  cambiarPaginacion() {
    let ruta = this.metadatosPaginacion.ruta;

    ruta =
      this.cantidadPorPagina === 'Todos'
        ? ruta + '?per_page=' + this.metadatosPaginacion.total + '&page=1'
        : ruta + '?per_page=' + this.cantidadPorPagina + '&page=1';

    this.obtenerPlantillas(ruta);
  }

  cambiarPagina(ruta: string) {
    this.obtenerPlantillas(ruta);
  }

  editar(template: ITemplate) {
    this.router.navigate(['/', 'correos', 'plantillas', template.id]);
  }

  eliminar(template: ITemplate) {
    /*
    this.servicioPlantilla.eliminar(plantilla.id).subscribe(
      (data) => {
        this.obtenerPlantillas('');
        this.alerta.mostrarNotificacion(
          'success',
          'Plantilla eliminada exitosamente'
        );
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          'Ha ocurrido un error eliminando una plantilla. Verifique que no se encuentre asociada a un Correo'
        );
      }
    );
    */
  }
}
