import { Component, OnInit } from '@angular/core';
import { LinkPaginacion, MetadatoPaginacion } from 'src/app/models/model';
import { ITemplate } from '../template/template.component';
import { Router } from '@angular/router';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent implements OnInit {
  template: ITemplate;
  templates: ITemplate[];
  linksPaginacion: LinkPaginacion;
  metadatosPaginacion: MetadatoPaginacion;
  cantidadPorPagina = '25';
  cantidadesPorPagina = ['10', '25', '50', 'Todos'];
  loading = true;

  constructor(
    public router: Router,
    public templateService: TemplateService
  )
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

    this.getTemplates('');
  }

  getTemplates(ruta?: string) {
    this.templateService.getTemplatesWithPag(ruta).subscribe(
      (data) => {
        this.templates = data['templates'];
        if (data['links'] && data['meta']) {
          this.linksPaginacion = data['links'];
          this.metadatosPaginacion = data['meta'];
        }
        this.loading = false;
      },
      // TODO: Add error notification
      (error) => { }
    );
  }

  changePagination() {
    let ruta = this.metadatosPaginacion.ruta;

    ruta =
      this.cantidadPorPagina === 'Todos'
        ? ruta + '?per_page=' + this.metadatosPaginacion.total + '&page=1'
        : ruta + '?per_page=' + this.cantidadPorPagina + '&page=1';

    this.getTemplates(ruta);
  }

  changePage(ruta: string) {
    ruta = `${ruta}&per_page=${this.cantidadPorPagina}`;
    this.getTemplates(ruta);
  }

  edit(template: ITemplate) {
    this.router.navigate(['/', 'email', 'templates', template.id]);
  }

  showDeleteModal(template: ITemplate) {
    this.template = template;
  }

  delete() {
    if (this.template.id) {
      this.templateService.delete(this.template.id).subscribe(
        (data) => {
          this.getTemplates('');
          // TODO: Add save notification
        },
        // TODO: Add error notification
        (error) => {}
      );
    }
    this.template = null;
  }
}
