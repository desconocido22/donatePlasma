import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {
  public formGroup: FormGroup;
  loading: boolean;
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
