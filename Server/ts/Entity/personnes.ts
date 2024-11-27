import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import Ville from "./villes.js";

@Entity("personnes")
export default class Personne {
  @PrimaryColumn({ length: 8 })
  codP!: string;

  @Column({ type: "text", nullable: false })
  nom!: string;

  @Column({ type: "text", nullable: false })
  prenom!: string;

  @Column({type: "text"})
  tel!: string;

  @Column({type: "text"})
  mail!: string;

  @Column({type:"text"})
  nomRue!: string;

  @Column({type: "text", length: 5})
  codePos!: string;

  @Column({type:"integer"})
  numAdd!: number;
  
  @ManyToOne(() => Ville)
  @JoinColumn({ name: "codV" })
  ville!: Ville;
}