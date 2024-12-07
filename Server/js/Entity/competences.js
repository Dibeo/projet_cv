var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column } from "typeorm";
let Competence = class Competence {
    codC;
    intitule;
};
__decorate([
    PrimaryColumn({ length: 8 }),
    __metadata("design:type", String)
], Competence.prototype, "codC", void 0);
__decorate([
    Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Competence.prototype, "intitule", void 0);
Competence = __decorate([
    Entity("competences")
], Competence);
export default Competence;
