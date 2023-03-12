import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, NgModel, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

type Compte = {
  id: number;
  ordre: number;
  annee: number
  trimestre: number
  nature: number
  montant: number
  reference: string
  nom: string
};

type TrimestreData = {
  trim: Compte;
  trimestre: string;
  compte: Compte[];
  totalRetrait: number;
  totalDepot: number;
  sousTotal: number;
}
type AnneeData = {
  annee: string;
  trimestre: TrimestreData[];
  totalRetrait: number;
  totalDepot: number;
  totalAnnuel: number;
}
type ModelData = {
  annee: AnneeData[];
  totalRetrait: number;
  totalDepot: number;
  totalGeneral: number;
}

const userTemplate = {} as Compte;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestA2Six';
  data: Compte[] = [];
  comptes: Compte[] = [];
  trimestrDatas: TrimestreData[] = [];
  anneeDatas: AnneeData[] = [];
  tableElement: ModelData[] = [];
  medalRefD: any;
  medalRefR: any;
  @ViewChild("modalDepot") modalDepot: ElementRef | undefined;
  @ViewChild("modalRetrait") modalRetrait: ElementRef | undefined;

  editFormDepot = new FormGroup({
    trimestre: new FormControl(userTemplate.trimestre,{validators: Validators.required}),
    annee: new FormControl(userTemplate.annee,{validators: Validators.required}),
    nature: new FormControl(userTemplate.nature),
    montant: new FormControl(userTemplate.montant,{validators: Validators.required}),
    reference: new FormControl(userTemplate.reference,{validators: Validators.required}),
    nom: new FormControl(userTemplate.nom, {validators: Validators.required})
  });
  editFormRetrait = new FormGroup({
    trimestre: new FormControl(userTemplate.trimestre,{validators: Validators.required}),
    annee: new FormControl(userTemplate.annee,{validators: Validators.required}),
    nature: new FormControl(userTemplate.nature),
    montant: new FormControl(userTemplate.montant,{validators: Validators.required}),
    reference: new FormControl(userTemplate.reference,{validators: Validators.required}),
    nom: new FormControl(userTemplate.nom, {validators: Validators.required})
  });

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.http.get<Compte[]>('./assets/Test_pratique_exercice4.json').subscribe(res => {
      this.data = res
      // this.data.forEach((value, index, array) => {
      //   for (let i = 1; i <array.length; i++){
      //     if (value!.annee === array[i].annee){
      //       const modData = {} as ModelData
      //       const anneer = {} as AnneeData;
      //       if (value.trimestre === array[i]!.trimestre){
      //         const trimm = {} as TrimestreData
      //         // value.ordre = trimm.compte.length + 1;
      //         anneer.annee = String(`${value.annee}`);
      //         trimm.trimestre = String(`${value.trimestre}T${value.annee}`);
      //         this.comptes.push(value);
      //         trimm.compte = this.comptes;
      //         if (value.nature === 1){
      //           trimm.totalDepot = trimm.totalDepot + value.montant
      //         }else {
      //           trimm.totalRetrait = trimm.totalRetrait + value.montant
      //         }
      //         trimm.sousTotal = trimm.totalDepot - trimm.totalRetrait;
      //         this.trimestrDatas.push(trimm);
      //       }else {
      //         const trimm = {} as TrimestreData
      //         anneer.annee = String(`${value.annee}`);
      //         trimm.trimestre = String(`${value.trimestre}T${value.annee}`);
      //         this.comptes.push(value);
      //         trimm.compte = this.comptes;
      //         if (value.nature === 1){
      //           trimm.totalDepot = trimm.totalDepot + value.montant
      //         }else {
      //           trimm.totalRetrait = trimm.totalRetrait + value.montant
      //         }
      //         trimm.sousTotal = trimm.totalDepot - trimm.totalRetrait;
      //         this.trimestrDatas.push(trimm);
      //       }
      //       this.trimestrDatas.forEach(v => anneer.totalDepot = anneer.totalDepot + v.totalDepot)
      //       this.trimestrDatas.forEach(v => anneer.totalRetrait = anneer.totalRetrait + v.totalRetrait)
      //       anneer.totalAnnuel = anneer.totalDepot - anneer.totalRetrait
      //       anneer.trimestre = this.trimestrDatas
      //       this.anneeDatas.push(anneer)
      //       modData.annee = this.anneeDatas;
      //
      //       modData.totalDepot = modData.totalDepot + anneer.totalDepot
      //       modData.totalRetrait = modData.totalRetrait + anneer.totalRetrait
      //       modData.totalGeneral = modData.totalDepot - modData.totalRetrait
      //     }
      //     else {
      //       const modData = {} as ModelData
      //       const anneer = {} as AnneeData;
      //       if (array[index]!.trimestre === array[i]!.trimestre){
      //         const trimm = {} as TrimestreData
      //         anneer.annee = String(`${value.annee}`);
      //         trimm.trimestre = String(`${value.trimestre}T${value.annee}`);
      //         this.comptes.push(value);
      //         trimm.compte = this.comptes;
      //         if (value.nature === 1){
      //           trimm.totalDepot = trimm.totalDepot + value.montant
      //         }else {
      //           trimm.totalRetrait = trimm.totalRetrait + value.montant
      //         }
      //         trimm.sousTotal = trimm.totalDepot - trimm.totalRetrait;
      //         this.trimestrDatas.push(trimm);
      //       }else {
      //         const trimm = {} as TrimestreData
      //         anneer.annee = String(`${value.annee}`);
      //         trimm.trimestre = String(`${value.trimestre}T${value.annee}`);
      //         this.comptes.push(value);
      //         trimm.compte = this.comptes;
      //         if (value.nature === 1){
      //           trimm.totalDepot = trimm.totalDepot + value.montant
      //         }else {
      //           trimm.totalRetrait = trimm.totalRetrait + value.montant
      //         }
      //         trimm.sousTotal = trimm.totalDepot - trimm.totalRetrait;
      //         this.trimestrDatas.push(trimm);
      //       }
      //       this.trimestrDatas.forEach(v => anneer.totalDepot = anneer.totalDepot + v.totalDepot)
      //       this.trimestrDatas.forEach(v => anneer.totalRetrait = anneer.totalRetrait + v.totalRetrait)
      //       anneer.totalAnnuel = anneer.totalDepot - anneer.totalRetrait
      //       anneer.trimestre = this.trimestrDatas
      //       this.anneeDatas.push(anneer)
      //       modData.annee = this.anneeDatas;
      //
      //       modData.totalDepot = modData.totalDepot + anneer.totalDepot
      //       modData.totalRetrait = modData.totalRetrait + anneer.totalRetrait
      //       modData.totalGeneral = modData.totalDepot - modData.totalRetrait
      //
      //       this.tableElement.push(modData);
      //     }
      //   }
      //
      // })
      // alert(this.trimestrDatas.length)
      // console.log(this.tableElement)
    })
  }

  showModalDepot(): void{
    this.medalRefD = this.modalService.open(this.modalDepot, {size: 'lg', backdrop: 'static'})
    this.medalRefD.result.then( (rs: any) => {
      if (rs !== 'close'){
        this.comptes.push(rs);
      }
    })
  }

  showModalRetrait(): void{
    this.medalRefR = this.modalService.open(this.modalRetrait, {size: 'lg', backdrop: 'static'})
    this.medalRefR.result.then( (rs: any) => {
      if (rs !== 'close'){
        this.comptes.push(rs);
      }
    })
  }

  closeD(): void {
    this.medalRefD.close('close')
  }
  closeR(): void {
    this.medalRefR.close('close')
  }

  saveDepot(): void {
    const depot = this.editFormDepot.getRawValue();
    depot.nature = 1;
    this.http.post<Compte>('./assets/Test_pratique_exercice4.json', depot).subscribe(res => {
      this.medalRefD.close(res);
    })
  }

  saveRetrait(): void {
    const retrait = this.editFormRetrait.getRawValue();
    retrait.nature = 2;
    this.http.post<Compte>('./assets/Test_pratique_exercice4.json', retrait).subscribe(res => {
      this.medalRefR.close(res);
    })
  }
}
