import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("competences")
export default class Competence {
  @PrimaryColumn({ length: 8 })
  codC!: string;

  @Column({ type: "text", nullable: false })
  intitule!: string;
}