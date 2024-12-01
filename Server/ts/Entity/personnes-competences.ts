import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import Personne from "./personnes.js";
import Competence from "./competences.js";

@Entity("personne_competence")
export default class PersonneCompetence {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Personne, { nullable: false })
  @JoinColumn({ name: "codP" })
  personne!: Personne;

  @ManyToOne(() => Competence, { nullable: false })
  @JoinColumn({ name: "codC" })
  competence!: Competence;

  @Column({ type: "int", nullable: false })
  timecode!: number; // Timecode en secondes pour cette compétence d'une personne
}
