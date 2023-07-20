import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewScreenComponent } from '../view-screen/view-screen/view-screen.component';
import {GetProfilesService} from '../get-profiles.service'
import { SwipeProfileComponent } from '../swipe-profile/swipe-profile.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ],
  declarations: [ViewScreenComponent, SwipeProfileComponent],
  providers: [GetProfilesService]
})
export class SwipeProfileModule {}
