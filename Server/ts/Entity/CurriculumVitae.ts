import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import ExtractedTermOrExpression from "./ExtractedTermOrExpression.js";

@Entity("Curriculum_vitae")
export default class CurriculumVitae {
  @PrimaryGeneratedColumn({ type: "integer" })
  curriculum_vitae_identity!: number;

  @Column({ type: "date" })
  production_date!: Date;

  @Column({ type: "string", length: 100 })
  production_place!: string;

  @Column({ type: "string", length: 100 })
  surname!: string;

  @Column({ type: "string", length: 100 })
  forname!: string;

  @Column({ type: "date", nullable: true })
  birth_date!: Date;

  @Column({ type: "string", length: 13, nullable: true })
  identity_number!: string;

  @Column({ type: "string", length: 2, nullable: true })
  checksum!: string;

  @Column({ type: "string", length: 100 })
  mobile_phone!: string;

  @Column({ type: "string", length: 100 })
  e_mail!: string;

  @Column({ type: "blob" })
  audio!: Buffer;

  @Column({ type: "blob" })
  video!: Buffer;

  @OneToMany(() => ExtractedTermOrExpression, (term) => term.curriculumVitae)
  extractedTermsOrExpressions!: ExtractedTermOrExpression[];
}
