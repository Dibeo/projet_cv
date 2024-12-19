import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import ExtractedTermOrExpression from "./ExtractedTermOrExpression.js";

@Entity("Lien")
export default class Lien {
  @PrimaryGeneratedColumn({ type: "integer" })
  lien_identity!: number;

  @Column({ type: "integer" })
  extracted_term_or_expression_identity!: number;

  @Column({ type: "string", length: 250 })
  skill_or_job!: string;

  @Column({ type: "boolean" })
  is_skill!: boolean;

  @ManyToOne(() => ExtractedTermOrExpression, (term) => term.matches)
  @JoinColumn({ name: "extracted_term_or_expression_identity" })
  extractedTermOrExpression!: ExtractedTermOrExpression;
}
