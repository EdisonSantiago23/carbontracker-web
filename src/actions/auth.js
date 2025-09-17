import * as actionTypes from './actionTypes';
import { Auth } from "@services";
const inicio = user => {
    return {
        type: actionTypes.INITIALISE,
        payload: {
            isAuthenticated: false,
            isInitialised: false,
            user: null,
        },
    };
};

const onLogin = user => {
    return {
        type: actionTypes.LOGIN,
        payload: {
            user,
        },
    };
};


export const authenticationEmailAndPassword = (email, password, fnLogin, fnError) => dispatch => {
     Auth.loginWithEmailAndPassword(email, password)
      .then((userCredential) => {
        fnLogin(userCredential)
      })
      .catch((error) => {
        fnError(error)
        dispatch(inicio);
       
      });
};

