import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {Store} from '@ngrx/store';

import {AppState} from '../../services/appstate';
import {BirthdayActions} from '../../actions/birthday.actions';

@Component({
  templateUrl: 'build/pages/details/details.html',
})
export class DetailsPage {  
    public birthday;
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private store: Store<AppState>,
        private birthdayActions: BirthdayActions) {
    }

    ionViewLoaded() {
        this.birthday = this.navParams.get('birthday');

        if (!this.birthday) {
            this.birthday = {};
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.birthday.date.toISOString().slice(0, 10);
        }
    }

    save() {
        this.birthday.date = new Date(this.isoDate);

        if (this.isNew) {
            this.store.dispatch(this.birthdayActions.addBirthday(this.birthday));
        }
        else {
      	    this.store.dispatch(this.birthdayActions.updateBirthday(this.birthday));
        }

        this.dismiss();
    }

    delete() {
        this.store.dispatch(this.birthdayActions.deleteBirthday(this.birthday));
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.birthday);
    }
}