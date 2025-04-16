// /types/index.d.ts

export interface IPesan {
    id?: number;              
    nama: string;
    email: string;
    pesan: string;
    dibuatPada?: Date;
  }
  
  export interface IProyek {
    id?: number;
    judul: string;
    deskripsi: string;
    footer: string;
    linkSitus: string;
    linkGithub: string;
    dibuatPada?: Date;
  }
  
  export interface IKeahlian {
    id?: number;
    judul: string;
    deskripsi: string;
    konten: string;
    footer: string;
    ikon: string;             
    progres: number;          
    dibuatPada?: Date;
  }
  