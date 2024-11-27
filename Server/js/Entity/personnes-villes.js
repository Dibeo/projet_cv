var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Personne from "./personnes.js";
import Ville from "./villes.js";
let PersonneCompetence = class PersonneCompetence {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PersonneCompetence.prototype, "id", void 0);
__decorate([
    OneToOne(() => Personne),
    __metadata("design:type", Personne)
], PersonneCompetence.prototype, "personne", void 0);
__decorate([
    OneToOne(() => Ville),
    __metadata("design:type", Ville)
], PersonneCompetence.prototype, "ville", void 0);
PersonneCompetence = __decorate([
    Entity("personne_competence")
], PersonneCompetence);
export default PersonneCompetence;
