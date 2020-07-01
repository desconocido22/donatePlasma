import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bloodTypes, cities} from "../../../../../environments/environment";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";
import {RecipientService} from "../../../../core/donate/services/recipient.service";
import {DonorModel} from "../../../../core/donate/models/donor.model";
import {RecipientModel} from "../../../../core/donate/models/recipient.model";

@Component({
  selector: 'kt-receptor',
  templateUrl: './receptor.component.html',
  styleUrls: ['./receptor.component.scss']
})
export class ReceptorComponent implements OnInit {
  @ViewChild('coolModal', {static: false}) private coolModal: SwalComponent;
  public coolModalOption: SweetAlertOptions;

  @ViewChild('failModal', {static: false}) private failModal: SwalComponent;
  public failModalOption: SweetAlertOptions;

  public formGroup: FormGroup;
  public bloodTypes = bloodTypes;
  public cities = cities;
  public loading: boolean;

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
        name: ['', Validators.compose([Validators.required])],
        cell_phones: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        city_id: ['', Validators.compose([Validators.required])],
        public: ['', Validators.compose([])]
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

}
