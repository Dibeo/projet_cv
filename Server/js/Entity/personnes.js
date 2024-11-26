var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Ville from "./villes.js";
let Personne = class Personne {
    codP;
    nom;
    prenom;
    tel;
    mail;
    nomRue;
    codePos;
    numAdd;
    ville;
};
__decorate([
    PrimaryColumn({ length: 8 }),
    __metadata("design:type", String)
], Personne.prototype, "codP", void 0);
__decorate([
    Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Personne.prototype, "nom", void 0);
__decorate([
    Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Personne.prototype, "prenom", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], Personne.prototype, "tel", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], Personne.prototype, "mail", void 0);
__decorate([
    Column({ type: "text" }),
    __metadata("design:type", String)
], Personne.prototype, "nomRue", void 0);
__decorate([
    Column({ type: "text", length: 5 }),
    __metadata("design:type", String)
], Personne.prototype, "codePos", void 0);
__decorate([
    Column({ type: "integer" }),
    __metadata("design:type", Number)
], Personne.prototype, "numAdd", void 0);
__decorate([
    ManyToOne(() => Ville),
    JoinColumn({ name: "codV" }),
    __metadata("design:type", Ville)
], Personne.prototype, "ville", void 0);
Personne = __decorate([
    Entity("personnes")
], Personne);
export default Personne;
