import { Arbitre } from "./arbitre";

export class Championnat {
    _id!: string;
    nom!: string;
    typeChampionnat!: string;
    equipe!: string;
    terrain!: string;
    arbitre!: [Arbitre];
    score!: number;
    // field: any;
    // header: any;
    // static _id: any;
  }
  