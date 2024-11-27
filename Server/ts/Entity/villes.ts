import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("villes")
export default class Ville {
  @PrimaryColumn({ length: 8 })
  codV!: string;

  @Column({ type: "text", nullable: false })
  nomV!: string;
}