import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bloodTypes, cities, environment} from "../../../../../environments/environment";
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
  public pondFiles = [];
  public lastFileAdd = [];
  public pondOptions = this.optionsFile();
  @ViewChild('myPond', { static: false }) myPond: any;

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
          city_id: ['', Validators.compose([])],
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

  /**
   * Configuration uploader
   *  @return configuration filepond
   */
  public optionsFile() {
    const token = 123;
    return {
      class: 'poi-file_uploader',
      multiple: false,
      labelIdle: 'Arrastre y suelte los archivos aquí o puede  <a class="link"> buscarlos </a>',
      acceptedFileTypes: 'image/*',
      instantUpload: true,
      maxFileSize: '5MB',
      allowRevert: false,
      server: {
        headers: {
          Authorization: `Bearer ${token}`,
          token
        },
        // ADD endpoit for upload photo
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          formData.append('file', file, file.name);
          const request = new XMLHttpRequest();
          request.open('POST', environment.api_url + 'file/upload'); // FIXME DEFINED UPLAODER
          request.setRequestHeader('Authorization', `Bearer ${token}`);
          request.setRequestHeader('token', String(token));
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
          };
          request.onload = () => {
            this.requestOnLoad(load, request, error);
          };
          request.send(formData);
          return {
            abort: () => {
              request.abort();
              abort();
            }
          };
        },
        revert: false
      },
      onremovefile: (error, file) => {
        // Use this method for remove file after upload, remove from server
        console.log(error, file);
      }
    };
  }

  /**
   * Remove File after upload document
   * @param event filepond event
   */
  public processFile(event: any) {
  }

  private requestOnLoad(load: any, request: any, error: any) {
    if (request.status >= 200 && request.status < 300) {
      this.lastFileAdd.push(request.responseText);
      load(request.responseText);
    } else {
      error('El servicio no esta Disponible en este momento');
    }
  }
}
