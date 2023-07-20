import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetProfilesService {

  constructor(private http: HttpClient) { }

  getDataFromJson() {
   return this.http.get<any>('assets/profileData/profileEngine.json').pipe(
      data => {
        return data;
      })
  }
}
