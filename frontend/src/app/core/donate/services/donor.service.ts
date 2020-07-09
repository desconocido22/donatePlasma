import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map, retry} from 'rxjs/operators';
import {DonorModel} from '../models/donor.model';
import {RecipientModel} from "../models/recipient.model";

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private tempRefObj = new DonorModel();
  constructor(
      private http: HttpClient
  ) { }

  public getAllPublic(): Observable<DonorModel[]> {
      return this.http.get<DonorModel[]>(environment.api_url + 'donor/public')
          .pipe(
              retry(2),
              map((response: any) => {
                  const list = [];
                  Object.keys(response.donors).forEach((item,key) => {
                      list.push(Object.assign(new DonorModel(), response.donors[key]))
                  });
                  return list;
              })
          );
  }

  public getCanReceiveFrom(bloodType: number): Observable<[]> {
    return this.http.get<[]>(environment.api_url_match + `can-donate-to/${bloodType}`)
      .pipe(
        retry(2),
        map((response: any) => {
          return response.compatible_types
        })
      );
  }

  public get(donorId: number): Observable<DonorModel> {
    return this.http.get<DonorModel>(environment.api_url + 'donor/' + donorId)
        .pipe(
            retry(2),
            map((response: any) => Object.assign(new DonorModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public post(donor: any): Observable<DonorModel> {
    const body = {};
    body[this.tempRefObj.getPrefix()] = donor;
    return this.http.post<DonorModel>(environment.api_url + 'donor', body)
        .pipe(
            map((response: any) => Object.assign(new DonorModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public put(donor: DonorModel): Observable<DonorModel> {
    const body = {};
    body[this.tempRefObj.getPrefix()] = donor;
    return this.http.put<DonorModel>(environment.api_url + 'donor/' + donor.id, body)
        .pipe(
            map((response: any) => Object.assign(new DonorModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public delete(donor: DonorModel): Observable<DonorModel> {
    return this.http.delete<DonorModel>(environment.api_url + 'donor/' + donor.id)
        .pipe(
            retry(2),
            map(response => donor)
        );
  }

  public getManagement() {
    return this.http.get<[]>(environment.api_url + 'donor')
        .pipe(
            retry(2),
            map((response: any) => response.donors)
        );
  }
  
  public verify(donorId: number, isVerify: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `donor/${donorId}/verify`,
        { verified: isVerify })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }

  public setPublic(donorId: number, isPublic: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `donor/${donorId}/public`,
        { public: isPublic })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }


  public setActivate(donorId: number, isActivate: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `donor/${donorId}/activate`,
        { activate: isActivate })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }

}
