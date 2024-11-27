import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Personne from "./personnes.js";
import Competence from "./competences.js";

@Entity("personne_competence")
export default class PersonneCompetence {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Personne)
  personne!: Personne;

  @OneToOne(() => Competence)
  competence!: Competence;

  @Column({ type: "int", nullable: false })
  timecode!: number; // Timecode en secondes pour cette compétence d'une personne
}
