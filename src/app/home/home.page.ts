import { Component, OnInit } from '@angular/core';
import { GetProfilesService } from '../get-profiles.service'
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  profileDatasFromServer: any;
  profileData: any;
  openProfile = false;
  constructor(private profileSvc: GetProfilesService
  ) { }

  ngOnInit(): void {
    this.getInitialData()
  }

  getInitialData() {
    this.profileSvc.getDataFromJson().pipe(
      take(1),
      tap(data => {
        this.profileDatasFromServer = data
      })
    ).subscribe()
  }


  NavigateToProfile(id: any) {
    this.profileData = this.profileDatasFromServer.find((res: any) => res.id === id);
    this.openProfile = true
  }

  removeProfile(index: any) {
    this.profileDatasFromServer.splice(index, 1)
  }
}
