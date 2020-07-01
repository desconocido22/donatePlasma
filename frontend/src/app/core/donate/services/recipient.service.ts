import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RecipientModel} from '../models/recipient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  private tempRefObj = new RecipientModel();
  constructor(
      private http: HttpClient
  ) { }



  public getAllPublic(): Observable<RecipientModel[]> {
    return this.http.get<RecipientModel[]>(environment.api_url + 'recipient/public')
        .pipe(
            retry(2),
            map((response: any) => {
                const list = [];
                Object.keys(response.recipients).forEach((item,key) => {
                    response.recipients[key].compatible = [1,2,3,4,5,6,7,8];
                    list.push(Object.assign(new RecipientModel(), response.recipients[key]))
                });
                return list;
            })
        );
  }

  public get(recipientId: number): Observable<RecipientModel> {
    return this.http.get<RecipientModel>(environment.api_url + 'recipient/' + recipientId)
        .pipe(
            retry(2),
            map((response: any) => Object.assign(new RecipientModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public post(recipient: any): Observable<RecipientModel> {
    const body = {};
    body[this.tempRefObj.getPrefix()] = recipient;
    return this.http.post<RecipientModel>(environment.api_url + 'recipient', body)
        .pipe(
            map((response: any) => Object.assign(new RecipientModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public put(recipient: RecipientModel): Observable<RecipientModel> {
    const body = {};
    body[this.tempRefObj.getPrefix()] = recipient;
    return this.http.put<RecipientModel>(environment.api_url + 'recipient/' + recipient.id, body)
        .pipe(
            map((response: any) => Object.assign(new RecipientModel(), response[this.tempRefObj.getPrefix()]))
        );
  }

  public delete(recipient: RecipientModel): Observable<RecipientModel> {
    return this.http.delete<RecipientModel>(environment.api_url + 'recipient/' + recipient.id)
        .pipe(
            retry(2),
            map(response => recipient)
        );
  }

  public getManagement() {
    return this.http.get<[]>(environment.api_url + 'recipient')
        .pipe(
            retry(2),
            map((response: any) => response.recipients)
        );
  }

  public verify(recipientId: number, isVerify: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `recipient/${recipientId}/verify`,
        { verified: isVerify })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }

  public setPublic(recipientId: number, isPublic: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `recipient/${recipientId}/public`,
        { public: isPublic })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }


  public setActivate(recipientId: number, isActivate: boolean): Observable<boolean> {
    return this.http.patch<boolean>(environment.api_url + `recipient/${recipientId}/activate`,
        { activate: isActivate })
        .pipe(
            retry(2),
            map((response: any) => response.ok)
        );
  }

}
