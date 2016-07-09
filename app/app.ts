import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {provideStore} from '@ngrx/store';
import {runEffects} from '@ngrx/effects';

import {BirthdayActions} from './actions/birthday.actions';
import {BirthdaysReducer} from './reducers/birthdays.reducer';
import {BirthdayEffects} from './effects/birthday.effects';
import {BirthdayService} from './services/birthday.service';
import {HomePage} from './pages/home/home';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(
  MyApp,
  [
    provideStore({ birthdays: BirthdaysReducer }),
    runEffects([BirthdayEffects]),
    BirthdayService,
    BirthdayActions
  ]);
