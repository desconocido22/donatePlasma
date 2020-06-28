import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-receptor',
  templateUrl: './receptor.component.html',
  styleUrls: ['./receptor.component.scss']
})
export class ReceptorComponent implements OnInit {

  public formGroup: FormGroup;
  loading: boolean;
  public list = [
    { count: 3, type: 'a-positivo'}, 
    { count: 2, type: 'a-negativo'}, 
    { count: 1, type: 'b-positivo'},
    { count: 0, type: 'b-negativo'}, 
    { count: 1, type: 'ab-positivo'}, 
    { count: 5, type: 'ab-negativo'}, 
    { count: 3, type: 'o-positivo'}, 
    { count: 9999, type: 'o-negativo'}
  ];
  constructor(
    private fb: FormBuilder,
  ) {
    this.initRegisterFormGroup();
  }

  ngOnInit(): void {

  }

  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
      {
        blood_type: ['', Validators.compose([Validators.required])],
        full_name: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        city: ['', Validators.compose([Validators.required])],
        public_profile: ['', Validators.compose([Validators.required])]
      }
    );
  }

  public isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.formGroup.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  submit() {
    this.loading = true;
  }

}
