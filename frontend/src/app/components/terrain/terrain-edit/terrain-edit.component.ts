import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Terrain } from 'src/app/model/Terrain';

@Component({
  selector: 'app-Terrain-edit',
  templateUrl: './terrain-edit.component.html',
  styleUrls: ['./terrain-edit.component.css'],
})

export class TerrainEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  TerrainState: any = ['Actif', 'Inactif'];
  TerrainType: any = ['Couvert', 'Non couvert'];
  TerrainSurface: any=['Gazon naturel', 'Tarton', 'Gazon artificiel G1', 'Gazon artificiel G2', 'Gazon artificiel G3', 'Gazon artificiel G4', 'Gazon artificiel G5'];



  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateTerrain();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getTerrain(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      location: [''],
      state: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      type: [''],
      surface: ['', [Validators.required]],
      capacity:['', [Validators.required, Validators.min(6) , Validators.max(22)]],


    });
  }

  // Choose options with select-dropdown
  updateProfile(e,name:string) {
    this.editForm.get(name).setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getTerrain(id) {
    this.apiService.getTerrain(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        location: data['location'],
        state: data['state'],
        type: data['type'],
        surface: data['surface'],
        capacity:data['capacity'],
        phone: data['phone'],
      });
    });
  }

  updateTerrain() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
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

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateTerrain(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/terrains-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
