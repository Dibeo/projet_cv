import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne } from "typeorm";
import Ville from "./villes.js";

@Entity("personnes")
export default class Personne {
  @PrimaryColumn({ length: 8 })
  codP!: string;

  @Column({ type: "text", nullable: false })
  nom!: string;

  @Column({ type: "text", nullable: false })
  prenom!: string;

  @Column({type: "number", length: 11})
  tel!: number;

  @Column({type: "text"})
  mail!: string;

  @Column({type:"text"})
  nomRue!: string;

  @Column({type: "text", length: 5})
  codePos!: string;

  @Column({type:"number"})
  numAdd!: number;
  
  @OneToOne(() => Ville)
  ville!: Ville;
}