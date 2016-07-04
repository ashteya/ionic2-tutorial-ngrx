import {ActionReducer, Action} from '@ngrx/store';
import {BirthdayActions} from '../actions/birthday.actions';

let nextId = 0;

export function BirthdaysReducer(state = [], action) {
    switch(action.type) {
        case BirthdayActions.ADD_BIRTHDAY:
            return [...state, Object.assign({}, action.payload, { id: nextId++ })];
        case BirthdayActions.UPDATE_BIRTHDAY:
            return state.map(birthday => {
                return birthday.id === action.payload.id ? Object.assign({}, birthday, action.payload) : birthday;
            });
        case BirthdayActions.DELETE_BIRTHDAY:
            return state.filter(birthday => birthday.id !== action.payload.id);
        default:
            return state;
    };
}