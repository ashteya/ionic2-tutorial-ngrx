import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Birthday} from '../models/birthday';

@Injectable()
export class BirthdayActions {

    static ADD_BIRTHDAY = 'ADD_BIRTHDAY';
    addBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.ADD_BIRTHDAY,
            payload: birthday
        }
    }

    static UPDATE_BIRTHDAY = 'UPDATE_BIRTHDAY';
    updateBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.UPDATE_BIRTHDAY,
            payload: birthday
        }
    }

    static DELETE_BIRTHDAY = 'DELETE_BIRTHDAY';
    deleteBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.DELETE_BIRTHDAY,
            payload: birthday
        }
    }

    static LOAD_BIRTHDAYS_SUCCESS = 'LOAD_BIRTHDAYS_SUCCESS';
    loadBirthdaysSuccess(birthdays: Birthday[]): Action {
        return {
            type: BirthdayActions.LOAD_BIRTHDAYS_SUCCESS,
            payload: birthdays
        }
    }

    static ADD_UPDATE_BIRTHDAY_SUCCESS = 'ADD_UPDATE_BIRTHDAY_SUCCESS';
    addUpdateBirthdaySuccess(birthday: Birthday): Action {
        return {
            type: BirthdayActions.ADD_UPDATE_BIRTHDAY_SUCCESS,
            payload: birthday
        }
    }

    static DELETE_BIRTHDAY_SUCCESS = 'DELETE_BIRTHDAY_SUCCESS';
    deleteBirthdaySuccess(id: string): Action {
        return {
            type: BirthdayActions.DELETE_BIRTHDAY_SUCCESS,
            payload: id
        }
    }
}