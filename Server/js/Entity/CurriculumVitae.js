var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from "typeorm";
import ExtractedTermOrExpression from "./ExtractedTermOrExpression.js";
let CurriculumVitae = class CurriculumVitae {
    curriculum_vitae_identity;
    production_date;
    production_place;
    surname;
    forname;
    birth_date;
    identity_number;
    checksum;
    mobile_phone;
    e_mail;
    audio;
    video;
    extractedTermsOrExpressions;
};
__decorate([
    PrimaryGeneratedColumn({ type: "integer" }),
    __metadata("design:type", Number)
], CurriculumVitae.prototype, "curriculum_vitae_identity", void 0);
__decorate([
    Column({ type: "date" }),
    __metadata("design:type", Date)
], CurriculumVitae.prototype, "production_date", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "production_place", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "surname", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "forname", void 0);
__decorate([
    Column({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], CurriculumVitae.prototype, "birth_date", void 0);
__decorate([
    Column({ type: "varchar", length: 13, nullable: true }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "identity_number", void 0);
__decorate([
    Column({ type: "varchar", length: 2, nullable: true }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "checksum", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "mobile_phone", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "e_mail", void 0);
__decorate([
    Column({ type: "blob" }),
    __metadata("design:type", Buffer)
], CurriculumVitae.prototype, "audio", void 0);
__decorate([
    Column({ type: "blob" }),
    __metadata("design:type", Buffer)
], CurriculumVitae.prototype, "video", void 0);
__decorate([
    OneToMany(() => ExtractedTermOrExpression, (term) => term.curriculumVitae),
    __metadata("design:type", Array)
], CurriculumVitae.prototype, "extractedTermsOrExpressions", void 0);
CurriculumVitae = __decorate([
    Entity("Curriculum_vitae")
], CurriculumVitae);
export default CurriculumVitae;
