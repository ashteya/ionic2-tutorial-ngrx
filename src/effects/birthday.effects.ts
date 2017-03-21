
import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { BirthdayService } from '../services/birthday.service';
import { Birthday } from '../models/birthday';
import { BirthdayActions } from '../actions/birthday.actions';

@Injectable()
export class BirthdayEffects {

    constructor(
        private actions$: Actions,
        private db: BirthdayService,
        private birthdayActions: BirthdayActions
    ) { }
  
    @Effect() addBirthday$ = this.actions$
        .ofType(BirthdayActions.ADD_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.add(birthday));
    
    @Effect() updateBirthday$ = this.actions$
        .ofType(BirthdayActions.UPDATE_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.update(birthday));
    
    @Effect() deleteBirthday$ = this.actions$
        .ofType(BirthdayActions.DELETE_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.delete(birthday));


    allBirthdays$ = this.db.getAll()
        .map(birthdays => this.birthdayActions.loadBirthdaysSuccess(birthdays));

    changedBirthdays$ = this.db.getChanges()
        .map(change => {
            if (change._deleted) {
                return this.birthdayActions.deleteBirthdaySuccess(change._id);
            } 
                else {
                    return this.birthdayActions.addUpdateBirthdaySuccess(change);
                }
            });

    @Effect() getBirthdays$ = Observable.concat(this.allBirthdays$, this.changedBirthdays$);        
}