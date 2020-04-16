export class Esquema {
  constructor(public id: number, public name: string) {}
}

export class Modulo {
  constructor(
    public id: number,
    public name: string,
    public level: number,
    public module: Modulo
  ) {}
}

export class Permiso {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public module: Modulo
  ) {}
}

export class Rol {
  constructor(public id: number, public name: string) {}
}

export class Usuario {
  constructor(public id: number, public name: string, public cedula: string) {}
}

export class LinkPaginacion {
  constructor(
    public primero: string,
    public ultimo: string,
    public anterior: string,
    public siguiente: string
  ) {}
}

export class MetadatoPaginacion {
  constructor(
    public paginaActual: number,
    public ultimaPagina: string,
    public cantidadPorPagina: string,
    public total: string,
    public ruta: string,
    public desde: string,
    public hasta: string
  ) {}
}

export class Asociacion {
  constructor(
    public idRol: number,
    public idPermiso: number,
    public idEsquema: number
  ) {}
}
