import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipientService} from '../../../../core/donate/services/recipient.service';
import {RecipientModel} from '../../../../core/donate/models/recipient.model';
import {bloodTypes, cities} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'kt-receptors',
  templateUrl: './receptors.component.html',
  styleUrls: ['./receptors.component.scss']
})
export class ReceptorsComponent implements OnInit {
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private recipientService: RecipientService
  ) {
    this.initRegisterFormGroup();

  }

  ngOnInit(): void {
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
