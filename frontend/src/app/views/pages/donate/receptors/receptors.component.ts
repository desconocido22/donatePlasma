import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipientService} from "../../../../core/donate/services/recipient.service";
import {RecipientModel} from "../../../../core/donate/models/recipient.model";
import {bloodTypes, cities} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {tap} from "rxjs/operators";

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
  public city = 0;
  public bloodType = 0;

  public total = 0;

  constructor(
    private fb: FormBuilder,
    private recipientService: RecipientService
  ) {
    this.initRegisterFormGroup();

  }

  ngOnInit(): void {
    this.getAll();
  }

  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
      {
        blood_type: ['0', Validators.compose([])],
        city: ['0', Validators.compose([])],
      }
    );
  }

  setCity(optionSelected: MatSelectChange) {
    this.city = optionSelected.value;
    this.getAll();
  }

  setBloodType(optionSelected: MatSelectChange) {
    this.bloodType = optionSelected.value;
    this.getAll();
  }

  private getAll() {
    this.list = this.recipientService.search(this.page, this.size, this.city, this.bloodType)
        .pipe(
            tap( result => {
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
