import {Component, OnInit, ViewChild} from '@angular/core';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'kt-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public coolModalOption: SweetAlertOptions;
  public suggestModalOption: SweetAlertOptions;
  @ViewChild('coolModal', {static: false}) private coolModal: SwalComponent;
  @ViewChild('suggestModal', {static: false}) private suggestModal: SwalComponent;
  public coolFormGroup: FormGroup;
  public suggestFormGroup: FormGroup;
  constructor(
      private fb: FormBuilder,
  ) {
    this.initRegisterFormGroup();
  }

  ngOnInit(): void {
    this.coolModalOption = {
      title: 'Reclutate!',
      type: 'success',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Quiero ayudar',
      focusCancel: true,
      showLoaderOnConfirm: true,
      preConfirm: () => this.sendCool()
    };

    this.suggestModalOption = {
      title: 'Ayudanos a Mejorar!',
      type: 'success',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      focusCancel: true,
      showLoaderOnConfirm: true,
      preConfirm: () => this.sendSuggest()
    };
  }


  /**
   * Modal for Delete Obj
   * @param event
   */
  public openCoolModal(event) {
    this.coolModal.fire().then((result) => {
      if (result.value) {
        // emit remove elemnt after delete
        // this.updateListRequest(this.vehicleSelected);
      }
    });
  }

  /**
   * Modal for Delete Obj
   * @param event
   */
  public openSuggestModel(event) {
    this.suggestModal.fire().then((result) => {
      if (result.value) {
        // emit remove elemnt after delete
        // this.updateListRequest(this.vehicleSelected);
      }
    });
  }

  public initRegisterFormGroup() {
    this.coolFormGroup = this.fb.group(
        {
          alias: ['', Validators.compose([Validators.required])],
          comment: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
        }
    );
    this.suggestFormGroup = this.fb.group(
        {
          alias: ['Anónimo', Validators.compose([])],
          comment: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
        }
    );

  }

  sendCool() {
    const controls = this.coolFormGroup.controls;
    // check form
    if (this.coolFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      return false;
    }
  }

  sendSuggest() {
    const controls = this.suggestFormGroup.controls;
    // check form
    if (this.suggestFormGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      return false;
    }
  }
  public isControlHasErrorCool(controlName: string, validationType: string): boolean {
    const control = this.coolFormGroup.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  public isControlHasErrorSuggest(controlName: string, validationType: string): boolean {
    const control = this.suggestFormGroup.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
}
