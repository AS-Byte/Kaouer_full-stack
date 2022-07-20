import {Component, NgZone, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Terrain} from "../../../model/Terrain";

@Component({
  selector: 'app-centre-create',
  templateUrl: './centre-create.component.html',
  styleUrls: ['./centre-create.component.css']
})
export class CentreCreateComponent implements OnInit {
  centreForm:FormGroup
  Gouvernorat: string[] =[ 'Ariana','Béja','Ben Arous','Bizerte','Gabès','Gafsa','Jendouba','Kairouan','Kasserine',
    'Kébili','Kef','Mahdia','Manouba','Médenine','Monastir','Nabeul','Sfax','Sidi Bouzid','Siliana','Sousse','Tataouine'
    ,'Tozeur','Tunis','Zaghouan']

   apiService: ApiService;
   submitted= false;
  terrainName:string[]
  terrain:Terrain;

  constructor( public fb: FormBuilder,
               private router: Router,
               private ngZone: NgZone,
               apiService: ApiService
  ) {
    this.apiService = apiService;
    this.mainForm();}

  ngOnInit(): void {
    this.getTerrainName(this.terrainName)
  }

  private mainForm() {
    this.centreForm=this.fb.group({
      cname: ['', [Validators.required]],
      cemail: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      gouvernorat:[this.Gouvernorat],
      cphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      clocation: [''],
      terrain:[]



    });


  }
  getTerrainName(name:any){
    name=this.apiService.getTerrains()
    console.log(name,"name")

  }
  get myForm() {
    return this.centreForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.centreForm.valid) {
      console.log('Champ invalid!')
      return false;

    } else {
      return this.apiService.createCentre(this.centreForm.value).subscribe({
        complete: () => {
          console.log('Terrain successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/centres-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
