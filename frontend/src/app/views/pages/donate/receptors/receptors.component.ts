import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipientService} from '../../../../core/donate/services/recipient.service';
import {RecipientModel} from '../../../../core/donate/models/recipient.model';
import {bloodTypes, cities} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {SweetAlertOptions} from 'sweetalert2';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {DonorService} from '../../../../core/donate/services/donor.service';

@Component({
  selector: 'kt-receptors',
  templateUrl: './receptors.component.html',
  styleUrls: ['./receptors.component.scss']
})
export class ReceptorsComponent implements OnInit {
  @ViewChild('coolModal', {static: false}) private coolModal: SwalComponent;
  public coolModalOption: SweetAlertOptions;

  @ViewChild('failModal', {static: false}) private failModal: SwalComponent;
  public failModalOption: SweetAlertOptions;

  public formGroup: FormGroup;
  public list: Observable<RecipientModel[]>;
  public bloodTypes = bloodTypes;
  public cities = cities;
  public loading: boolean;
  public page = 1;
  public size = 30;
  // Filters vars
  public query = '';
  public city = 0;
  public bloodType = 0;
  public total = 0;

  public donors = [];

  bloodTypeSelected = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private recipientService: RecipientService,
    private donorService: DonorService
  ) {
    this.initRegisterFormGroup();

  }

  ngOnInit(): void {
    this.coolModalOption = {
      title: '',
      showCloseButton: true,
      showConfirmButton: false
    };

    this.failModalOption = {
      title: 'Eliminar Receptor',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    };

    this.route.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        if (queryParams.bt) {
          this.bloodType = queryParams.bt;
          this.formGroup.patchValue({
            blood_type: this.bloodType
          });
        }
        if(queryParams.city) {
          this.city = queryParams.city;
          this.formGroup.patchValue({
            city: this.city
          });
        }
        this.getAll();
      });
    });
  }

  public deleteReceptor(receptorId: number) {
    this.failModal.fire().then((result) => {
      if (result.value) {
        this.recipientService.delete(receptorId).subscribe(
          (response) => {
            this.getAll();
          }
        );
      }
    });
  }

  public showDonors(bloodType: any) {
    this.donorService.getDonorsByBloodType(bloodType).subscribe(
      (list) => {
        this.donors = list;
        this.bloodTypeSelected = bloodType;
        this.coolModal.fire().then((result) => {
          if (result.value) {
          }
        });
      }
    );
  }


  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
      {
        blood_type: ['0', Validators.compose([])],
        city: ['0', Validators.compose([])],
        query: ['', Validators.compose([])]
      }
    );
  }
  setQuery(text) {
    this.query = text;
    this.getAll();
  }

  setCity(optionSelected: MatSelectChange) {
    // tslint:disable-next-line:radix
    this.city = parseInt(optionSelected.value);
    this.getAll();
  }

  setBloodType(optionSelected: MatSelectChange) {
    // tslint:disable-next-line:radix
    this.bloodType = parseInt(optionSelected.value);
    this.getAll();
  }

  private getAll() {
    this.list = this.recipientService.search(this.page, this.size, this.city, this.bloodType, this.query)
        .pipe(
            map( result => {
              this.total = result.total_records;
              console.log(this.total)
              return result.recipients;
            })
        );
  }

  updatePagination(pagination: any) {
    this.size = pagination.pageSize;
    this.page = pagination.pageIndex + 1;
    this.getAll();
  }
}
