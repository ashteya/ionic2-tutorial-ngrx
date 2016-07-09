import {Injectable} from '@angular/core';
import {Effect, StateUpdates, toPayload} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/rx';

import {AppState} from '../services/appstate';
import {BirthdayService} from '../services/birthday.service';
import {Birthday} from '../models/birthday';
import {BirthdayActions} from '../actions/birthday.actions';

@Injectable()
export class BirthdayEffects {

    constructor(
        private updates$: StateUpdates<AppState>,
        private store: Store<AppState>,
        private db: BirthdayService,
        private birthdayActions: BirthdayActions
    ) { }


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

    @Effect() addBirthday$ = this.updates$
        .whenAction(BirthdayActions.ADD_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.add(birthday));

    @Effect() updateBirthday$ = this.updates$
        .whenAction(BirthdayActions.UPDATE_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.update(birthday));

    @Effect() deleteBirthday$ = this.updates$
        .whenAction(BirthdayActions.DELETE_BIRTHDAY)
        .map<Birthday>(toPayload)
        .mergeMap(birthday => this.db.delete(birthday));
}