import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import CurriculumVitae from "./CurriculumVitae.js";
import Lien from "./Lien.js";

@Entity("Extracted_term_or_expression")
export default class ExtractedTermOrExpression {
  @PrimaryGeneratedColumn({ type: "integer" })
  extracted_term_or_expression_identity!: number;

  @Column({ type: "varchar", length: 250 })
  extracted_term_or_expression!: string;

  @Column({ type: "boolean" })
  is_term!: boolean;

  @Column({ type: "time" })
  from!: string;

  @Column({ type: "time" })
  to!: string;

  @Column({ type: "integer" })
  curriculum_vitae_identity!: number;

  @ManyToOne(() => CurriculumVitae, (cv) => cv.extractedTermsOrExpressions)
  @JoinColumn({ name: "curriculum_vitae_identity" })
  curriculumVitae!: CurriculumVitae;

  @OneToMany(() => Lien, (lien) => lien.extractedTermOrExpression)
  matches!: Lien[];
}
