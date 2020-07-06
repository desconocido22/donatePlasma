import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bloodTypes, cities} from "../../../../../environments/environment";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";
import {RecipientService} from "../../../../core/donate/services/recipient.service";
import {RecipientModel} from "../../../../core/donate/models/recipient.model";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'kt-receptor',
  templateUrl: './receptor.component.html',
  styleUrls: ['./receptor.component.scss']
})
export class ReceptorComponent implements OnInit {
  public coolModalOption: SweetAlertOptions;
  public failModalOption: SweetAlertOptions;
  public formGroup: FormGroup;
  public bloodTypes = bloodTypes;
  public cities = cities;
  public loading: boolean;
  public donors: any[];
  public bloodTypeSelected: number;
  @ViewChild('coolModal', {static: false}) private coolModal: SwalComponent;
  @ViewChild('failModal', {static: false}) private failModal: SwalComponent;

  constructor(
      private fb: FormBuilder,
      private recipientService: RecipientService
  ) {
    this.initRegisterFormGroup();
  }

  ngOnInit(): void {
    this.coolModalOption = {
      title: 'No perdamos la esperanza!',
      type: 'success',
      showCloseButton: false,
      showConfirmButton: false,
      timer: 5000
    };

    this.failModalOption = {
      title: ':( Algo salio mal',
      type: 'error',
      showCloseButton: false,
      showConfirmButton: false,
      timer: 10000
    };
  }

  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
        {
          blood_type_id: ['', Validators.compose([Validators.required])],
          name: ['', Validators.compose([])],
          cell_phones: ['', Validators.compose([Validators.required])],
          email: ['', Validators.compose([Validators.email])],
          city_id: ['', Validators.compose([Validators.required])],
          public: [true, Validators.compose([])]
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
    const controls = this.formGroup.controls;
    // check form
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const postObj = this.formGroup.getRawValue();
    this.recipientService.post(postObj).subscribe(
        (donor: RecipientModel) => {
          this.coolModal.fire().then((result) => {
            if (result.value) {
            }
          });
          this.loading = false;
          this.formGroup.reset();
        },
        error => {
          this.failModal.fire().then((result) => {
            if (result.value) {
            }
          });
        }
    );
  }


  public getDonors(option: MatSelectChange) {
    this.bloodTypeSelected = option.value;
    this.recipientService.getCanReceiveFrom(option.value).subscribe(
        (possibleDonors) => {
          console.log(possibleDonors)
          this.donors = possibleDonors;
        }
    );
  }
}
