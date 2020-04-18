import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITemplate } from './template/template.component';
import { environment } from 'src/environments/environment.prod';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LinkPaginacion, MetadatoPaginacion } from 'src/app/models/model';


@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  saveOrUpdate(template: ITemplate) {
    if (template.id) {
      return this.http
        .put(`${environment.url}/templates/${template.id}`, {
          description: template.description,
          styles: template.styles,
          footer: template.footer,
        })
        .pipe(
          map((respuesta: any) => respuesta['data']),
          catchError(this.handleError())
        );
    } else {
      return this.http
        .post(`${environment.url}/templates`, {
          description: template.description,
          styles: template.styles,
          footer: template.footer,
        })
        .pipe(
          map((respuesta: any) => respuesta['data']),
          catchError(this.handleError())
        );
    }
  }

  delete(id: number) {
    return this.http.delete(`${environment.url}/templates/${id}`);
  }

  templateById(id: number) {
    return this.http
      .get<ITemplate[]>(`${environment.url}/templates/${id}`)
      .pipe(
        map((respuesta: any) => respuesta['data']),
        catchError(this.handleError())
      );
  }

  getTemplatesWithPag(ruta: string): Observable<any> {
    if (ruta === '') {
      ruta = `${environment.url}/templates`;
    }

    return this.http.get(ruta).pipe(
      map((data: any) => {
        const result = {
          templates: Array<ITemplate>(),
          links: null,
          meta: null,
        };

        if (data) {
          data['data'].forEach((plantilla: ITemplate) => {
            result['templates'].push(plantilla);
          });

          if (data['links'] && data['meta']) {
            result.links = new LinkPaginacion(
              data['links'].first,
              data['links'].last,
              data['links'].prev,
              data['links'].next
            );

            result.meta = new MetadatoPaginacion(
              data['meta'].current_page,
              data['meta'].last_page,
              data['meta'].per_page,
              data['meta'].total,
              data['meta'].path,
              data['meta'].from,
              data['meta'].to
            );
          }
        }
        return result;
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.log('HTTP 404 Not found error');
        return of(result as T);
      } else {
        return throwError(error.message);
      }
    };
  }
}
