import * as api from '../api';
import {AUTH} from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        navigate('/');
    } catch (err) {
        console.log(err);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        navigate('/');
    } catch (err) {
        console.log(err);
    }
}
