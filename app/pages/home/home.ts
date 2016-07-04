import {Component, ChangeDetectionStrategy} from "@angular/core";  
import {Modal, NavController} from 'ionic-angular';  
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/rx';

import {AppState} from '../../services/appstate';
import {Birthday} from '../../models/birthday';
import {DetailsPage} from '../details/details';  

@Component({
  templateUrl: 'build/pages/home/home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {  
    public birthdays: Observable<Birthday[]>;

    constructor(
        private nav: NavController,
        private store: Store<AppState>) {
    }

    ionViewLoaded() {
        this.birthdays = this.store.select(state => state.birthdays);
    }

    showDetail(birthday) {
        let modal = Modal.create(DetailsPage, { birthday: birthday });
        this.nav.present(modal);

        modal.onDismiss(() => {

        });
    }
}