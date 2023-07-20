import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { GetProfilesService } from 'src/app/get-profiles.service';


@Component({
  selector: 'app-view-screen',
  templateUrl: './view-screen.component.html',
  styleUrls: ['./view-screen.component.scss'],
})
export class ViewScreenComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private profileSvc: GetProfilesService) { }

  profileDatasFromServer: any
  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params => {
        const receivedData = params['profileId'];
        return this.profileSvc.getDataFromJson().pipe(
          tap(data => {
            this.profileDatasFromServer = data[receivedData]
          })
        )
      })
    ).subscribe();
  }

  backToProfile() {
    this.router.navigate(['']);
  }
}
