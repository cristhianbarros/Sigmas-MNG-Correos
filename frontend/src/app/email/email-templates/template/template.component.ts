import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../template.service';

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
  btnAccept = 'Save';
  action = 'save';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.templateId = parseInt(paramMap.get('id'), 0);
        if (!isNaN(this.templateId)) {
          this.templateService
            .templateById(this.templateId)
            .subscribe((template) => {
              this.buildForm(template);
              this.loading = false;
              this.btnAccept = 'Update';
              this.action = 'update';
            });
        } else {
          this.templateId = null;
        }
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
    this.save(this.form);
  }

  save(form: FormGroup) {
    const params = {
      id: this.templateId,
      description: form.get('description').value,
      styles: form.get('styles').value,
      footer: form.get('footer').value,
    };

    this.templateService.saveOrUpdate(params).subscribe(
      (response: ITemplate) => {
        this.router.navigate([
          '/',
          'email',
          'templates',
          'list',
          'templates',
        ]);
      },
      (error) => {}
    );
  }

  get isFormValid() {
    return this.form.valid;
  }
}
