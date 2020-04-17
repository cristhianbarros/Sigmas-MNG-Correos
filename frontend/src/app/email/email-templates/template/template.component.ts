import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

export interface ITemplate {
  id: number;
  description: string;
  styles: string;
  footer: string;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  template: ITemplate;
  templateId = null;
  loading = true;
  form: FormGroup;
  btnAccept = 'Aceptar';
  action = 'guardar';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        /*
        this.plantillaId = parseInt(paramMap.get('plantillaId'), 0);
        if (!isNaN(this.plantillaId)) {
          this.plantillaService
            .plantilllaXId(this.plantillaId)
            .subscribe((plantilla) => {
              this.buildForm(plantilla);
              this.cargando = false;
              this.btnNombre = 'Actualizar';
              this.accion = 'actualizar';
            });
        } else {
          this.plantillaId = null;
        }
        */
      }
    });

    this.buildForm();
    this.loading = false;
  }

  buildForm(template?: ITemplate) {
    const description = template ? template.description : null;
    const styles = template ? template.styles : null;
    const footer = template ? template.footer : null;

    this.form = this.fb.group({
      description: [description],
      styles: [styles, Validators.required],
      footer: [footer, Validators.required],
    });
  }

  onSubmit() {
    this.guardar(this.form);
  }

  guardar(form: FormGroup) {
    const params = {
      id: this.templateId,
      description: form.get('description').value,
      styles: form.get('styles').value,
      footer: form.get('footer').value,
    };
    /*
    this.plantillaService.guardarOActualizar(params).subscribe(
      (response: IPlantilla) => {
        this.alerta.mostrarNotificacion(
          'success',
          'Plantilla guardada exitosamente'
        );
        this.router.navigate([
          '/',
          'correos',
          'plantillas',
          'listado',
          'plantillas',
        ]);
      },
      (error) => {
        this.alerta.mostrarNotificacion(
          'error',
          `Ha ocurrido un error al ${this.accion} una plantilla (${error})`
        );
      }
    );
    */
  }

  get isFormValid() {
    return this.form.valid;
  }
}
