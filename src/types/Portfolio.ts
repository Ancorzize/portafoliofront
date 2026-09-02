
export type DatosPersonales = {
  id?: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  ubicacion: string;
  profesion: string;
  sobreMi: string;
  fechaNacimiento: string;
};

export type ExperienciaLaboral = {
  id?: number;
  empresa: string;
  cargo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  actualmente: boolean;
  ubicacion: string;
  orden: number;
};

export type Estudio = {
  id?: number;
  institucion: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  actualmente: boolean;
  orden: number;
};

export type Tecnologia = {
  id?: number;
  nombre: string;
  tipo: string;
  nivel: string;
  descripcion: string;
  icono: string;
  orden: number;
};

export type RedSocial = {
  id?: number;
  nombre: string;
  url: string;
  icono: string;
  usuario: string;
  orden: number;
};

export type Foto = {
  id: number;
  nombre: string;
  tipo: string;
  contenidoBase64: string;
};
