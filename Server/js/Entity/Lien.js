var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import ExtractedTermOrExpression from "./ExtractedTermOrExpression.js";
let Lien = class Lien {
    lien_identity;
    extracted_term_or_expression_identity;
    skill_or_job;
    is_skill;
    extractedTermOrExpression;
};
__decorate([
    PrimaryGeneratedColumn({ type: "integer" }),
    __metadata("design:type", Number)
], Lien.prototype, "lien_identity", void 0);
__decorate([
    Column({ type: "integer" }),
    __metadata("design:type", Number)
], Lien.prototype, "extracted_term_or_expression_identity", void 0);
__decorate([
    Column({ type: "varchar", length: 250 }),
    __metadata("design:type", String)
], Lien.prototype, "skill_or_job", void 0);
__decorate([
    Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], Lien.prototype, "is_skill", void 0);
__decorate([
    ManyToOne(() => ExtractedTermOrExpression, (term) => term.matches),
    JoinColumn({ name: "extracted_term_or_expression_identity" }),
    __metadata("design:type", ExtractedTermOrExpression)
], Lien.prototype, "extractedTermOrExpression", void 0);
Lien = __decorate([
    Entity("Lien")
], Lien);
export default Lien;
