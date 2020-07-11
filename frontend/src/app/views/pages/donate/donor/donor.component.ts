import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bloodTypes, cities} from "../../../../../environments/environment";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from 'sweetalert2';
import {DonorService} from "../../../../core/donate/services/donor.service";
import {DonorModel} from "../../../../core/donate/models/donor.model";
import {Router} from "@angular/router";
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'kt-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {
  @ViewChild('coolModal', {static: false}) private coolModal: SwalComponent;
  public coolModalOption: SweetAlertOptions;

  @ViewChild('failModal', {static: false}) private failModal: SwalComponent;
  public failModalOption: SweetAlertOptions;

  @ViewChild('tcModal', {static: false}) private tcModal: SwalComponent;
  public tcModalOption: SweetAlertOptions;

  public formGroup: FormGroup;
  public bloodTypes = bloodTypes;
  public cities = cities;
  public loading: boolean;
  public disabledAcceptTandC = true;
  public receptors: any[];
  public bloodTypeSelected: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private donorService: DonorService
  ) {
    this.initRegisterFormGroup();
  }

  ngOnInit(): void {
    this.coolModalOption = {
      title: 'Gracias!',
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

    this.tcModalOption = {
      title: 'Términos y condiciones',
      type: 'info',
      showCloseButton: false,
      showConfirmButton: true
    };
  }



  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
      {
        blood_type_id: ['', Validators.compose([Validators.required])],
        name: ['', Validators.compose([])],
        cell: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.email])],
        city_id: ['', Validators.compose([])],
        public: [true, Validators.compose([])],
        tandc: ['', Validators.compose([Validators.required, Validators.requiredTrue])]
      }
    );
  }

  public getReceptors(option: MatSelectChange) {
    this.bloodTypeSelected = option.value;
    this.donorService.getCanReceiveFrom(option.value).subscribe(
      (possibleDonors) => {
        this.receptors = possibleDonors;
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
    this.donorService.post(postObj).subscribe(
        (donor: DonorModel) => {
          this.coolModal.fire().then((result) => {
            if (result.value) {
            }
          });
          this.loading = false;
          this.formGroup.reset();
          const queryParams = {
            bt: postObj.blood_type_id,
          };
          if (postObj.city_id && postObj.city_id !== 0) {
            // @ts-ignore
            queryParams.city = postObj.city_id
          }
          this.router.navigate(['/receptores'], {queryParams});
        },
        error => {
          this.failModal.fire().then((result) => {
            if (result.value) {
            }
          });
        }
    );
  }

  checkCAndT($event: MatCheckboxChange) {
    this.disabledAcceptTandC = $event.checked;
  }

  public openTCModal() {
    this.tcModal.fire().then((result) => {
      if (result.value) {

      }
    });
  }
}
