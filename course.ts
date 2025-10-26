export class Course {
    id: number;
    nombre: string;
    canal: string;
    temporadas: number;
    descripcion: string;
    enlace: string;
    img: string;

  
    constructor(id: number, nombre: string, canal: string,temporadas: number, descripcion: string, enlace: string, img: string) {
        this.id = id;
        this.nombre = nombre;
        this.canal = canal;
        this.temporadas = temporadas;
        this.descripcion = descripcion;
        this.enlace = enlace;
        this.img = img;
    }
  }
  