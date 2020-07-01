import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipientService} from "../../../../core/donate/services/recipient.service";
import {RecipientModel} from "../../../../core/donate/models/recipient.model";
import {bloodTypes, cities} from "../../../../../environments/environment";
import {Observable} from "rxjs";

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

  constructor(
    private fb: FormBuilder,
    private recipientService: RecipientService
  ) {
    this.initRegisterFormGroup();
  }

  ngOnInit(): void {
    this.list = this.recipientService.getAllPublic();
  }

  public initRegisterFormGroup() {
    this.formGroup = this.fb.group(
      {
        blood_type: ['', Validators.compose([])],
        city: ['', Validators.compose([])],
      }
    );
  }
}
