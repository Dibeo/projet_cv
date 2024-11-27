import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Personne from "./personnes.js";
import Ville from "./villes.js";

@Entity("personne_competence")
export default class PersonneCompetence {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Personne)
  personne!: Personne;

  @OneToOne(() => Ville)
  ville!: Ville;
}
