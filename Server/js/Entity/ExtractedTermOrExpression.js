var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, } from "typeorm";
import CurriculumVitae from "./CurriculumVitae.js";
import Lien from "./Lien.js";
let ExtractedTermOrExpression = class ExtractedTermOrExpression {
    extracted_term_or_expression_identity;
    extracted_term_or_expression;
    is_term;
    from;
    to;
    curriculum_vitae_identity;
    curriculumVitae;
    matches;
};
__decorate([
    PrimaryGeneratedColumn({ type: "integer" }),
    __metadata("design:type", Number)
], ExtractedTermOrExpression.prototype, "extracted_term_or_expression_identity", void 0);
__decorate([
    Column({ type: "varchar", length: 250 }),
    __metadata("design:type", String)
], ExtractedTermOrExpression.prototype, "extracted_term_or_expression", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], ExtractedTermOrExpression.prototype, "is_term", void 0);
__decorate([
    Column({ type: "time" }),
    __metadata("design:type", String)
], ExtractedTermOrExpression.prototype, "from", void 0);
__decorate([
    Column({ type: "time" }),
    __metadata("design:type", String)
], ExtractedTermOrExpression.prototype, "to", void 0);
__decorate([
    Column({ type: "integer" }),
    __metadata("design:type", Number)
], ExtractedTermOrExpression.prototype, "curriculum_vitae_identity", void 0);
__decorate([
    ManyToOne(() => CurriculumVitae, (cv) => cv.extractedTermsOrExpressions),
    JoinColumn({ name: "curriculum_vitae_identity" }),
    __metadata("design:type", CurriculumVitae)
], ExtractedTermOrExpression.prototype, "curriculumVitae", void 0);
__decorate([
    OneToMany(() => Lien, (lien) => lien.extractedTermOrExpression),
    __metadata("design:type", Array)
], ExtractedTermOrExpression.prototype, "matches", void 0);
ExtractedTermOrExpression = __decorate([
    Entity("Extracted_term_or_expression")
], ExtractedTermOrExpression);
export default ExtractedTermOrExpression;
