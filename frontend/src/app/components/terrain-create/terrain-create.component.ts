import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-terrain-create',
  templateUrl: './terrain-create.component.html',
  styleUrls: ['./terrain-create.component.css'],
})

export class TerrainCreateComponent implements OnInit {
  submitted = false;
  terrainForm: FormGroup;
  TerrainState: any = ['Actif', 'Inactif'];
  TerrainType: any = ['Couvert', 'Non couvert'];
  TerrainSurface: any = ['Gazon naturel', 'Tarton', 'Gazon artificiel G1','Gazon artificiel G2',
    'Gazon artificiel G3','Gazon artificiel G4','Gazon artificiel G5'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.terrainForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      state: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      type: [''],
      surface: ['', [Validators.required]],
      capacity:['', [Validators.required, Validators.min(6) , Validators.max(22)]],
      location: [''],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.terrainForm.get('state').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.terrainForm.controls;
  }

  //Send e-mail create terrain
  /*sendEmailCTerrain(data:any){
    nodemailerdemo.transport.sendM
    console.log("test")
  }*/

  onSubmit() {
    this.submitted = true;
    if (!this.terrainForm.valid) {
      return false;
    } else {
      return this.apiService.createTerrain(this.terrainForm.value).subscribe({
        complete: () => {
          console.log('Terrain successfully created!')
            this.ngZone.run(() => this.router.navigateByUrl('/terrains-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
