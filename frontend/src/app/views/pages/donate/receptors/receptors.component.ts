import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'kt-receptors',
  templateUrl: './receptors.component.html',
  styleUrls: ['./receptors.component.scss']
})
export class ReceptorsComponent implements OnInit {
  public formGroup: FormGroup;
  public list = [
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'a-negativo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'a-positivo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'ab-positivo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'ab-negativo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'b-positivo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },
    {
      id: 1,
      full_name: 'Test 01',
      phone: '123123',
      cell: '123123',
      email: '123123@123123.com',
      city_name: 'Cochabamba',
      blood_type: 'b-negativo',
      compatible: ['a-positivo', 'b-positivo', 'a-negativo', 'b-negativo', 'ab-positivo', 'ab-negativo']
    },

  ];
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
        blood_type: ['', Validators.compose([])],
        city: ['', Validators.compose([])],
      }
    );
  }
}
