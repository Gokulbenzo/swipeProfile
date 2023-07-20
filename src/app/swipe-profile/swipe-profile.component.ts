import { keyframes, transition, trigger, animate } from '@angular/animations';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { take, tap } from 'rxjs';
import * as kf from './keyframes';
import { GetProfilesService } from '../get-profiles.service';
import { Router } from '@angular/router';
import {HammerGestureConfig} from "@angular/platform-browser";
import { fromEvent } from "rxjs";
import {takeWhile} from "rxjs/operators"


@Component({
  selector: 'app-swipe-profile',
  templateUrl: './swipe-profile.component.html',
  styleUrls: ['./swipe-profile.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(600, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(650, keyframes(kf.swipeleft)))
    ])
  ]
})
export class SwipeProfileComponent implements AfterViewInit, OnDestroy {

  profileDatasFromServer: any;
  public index = 0;
  animationState = '';
  alive:boolean=true;

  constructor(
    private profileSvc: GetProfilesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getInitialData();
  }

  ngAfterViewInit() {
    this.getHammer();
  };

  getHammer() {
    const hammerConfig = new HammerGestureConfig();
    const hammer=hammerConfig.buildHammer(document.documentElement);
    fromEvent(hammer, "swipe").pipe(
      takeWhile(()=>this.alive))
      .subscribe((res: any) => {
        res.deltaX < 0 ? this.left() : this.right();
    });
  }

  startAnimation(state: string) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  right() {
    this.startAnimation('swiperight');
    alert('Intrested');
  }

  left() {
    this.startAnimation('swipeleft')
    alert('Not Intrested')
  }

  shortList() {
    this.startAnimation('swiperight');
    alert('ShortListed')

  }

  resetAnimationState(state: any) {
    if (state.totalTime) {
      this.animationState = '';
      this.index++;
      this.index >= 5 ? this.index = 0 : this.index;
    } else {
      this.animationState = '';
    }

  }

  getInitialData() {
    this.profileSvc.getDataFromJson().pipe(
      take(1),
      tap(data => {
        this.profileDatasFromServer = data
      })
    ).subscribe()
  }

  backToProfile() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}

