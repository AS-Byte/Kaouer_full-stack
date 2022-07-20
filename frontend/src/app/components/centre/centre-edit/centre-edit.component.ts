import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-centre-edit',
  templateUrl: './centre-edit.component.html',
  styleUrls: ['./centre-edit.component.css']
})
export class CentreEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;

  constructor( public fb: FormBuilder,
               private actRoute: ActivatedRoute,
               private apiService: ApiService,
               private router: Router) { }

  ngOnInit(): void {
    this.updateCentre();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCentre(id);
    this.editForm = this.fb.group({
      cname: ['', [Validators.required]],
      cemail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      clocation: [''],
      cphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrain: [''],

    });
  }
  get myForm() {
    return this.editForm.controls;
  }

  private updateCentre() {
    this.editForm = this.fb.group({
      cname: ['', [Validators.required]],
      cemail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      cphone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrain: [],
     clocation: [''],

    });

  }

  private getCentre(id) {this.apiService.getCentre(id).subscribe((data) => {
    this.editForm.setValue({
      cname: data['cname'],
      cemail: data['cemail'],
      clocation: data['clocation'],
      terrain: data['terrain'],
      cphone: data['cphone'],
    });
  });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateCentre(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/centres-list');
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
