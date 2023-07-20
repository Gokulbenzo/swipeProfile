import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { ViewScreenComponent } from '../view-screen/view-screen/view-screen.component';
import {GetProfilesService} from '../get-profiles.service'
import { SwipeProfileComponent } from '../swipe-profile/swipe-profile.component';
import {HideElementDirective} from '../hide-element.directive'

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage, ViewScreenComponent, SwipeProfileComponent, HideElementDirective],
  providers: [GetProfilesService]
})
export class HomePageModule {}
