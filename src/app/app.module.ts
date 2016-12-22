import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BirthdaysReducer } from '../reducers/birthdays.reducer';
import { BirthdayActions } from '../actions/birthday.actions';
import { BirthdayEffects } from '../effects/birthday.effects';

import { BirthdayService } from '../services/birthday.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ birthdays: BirthdaysReducer }),
    EffectsModule.run(BirthdayEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BirthdayActions, BirthdayService]
})
export class AppModule {}
