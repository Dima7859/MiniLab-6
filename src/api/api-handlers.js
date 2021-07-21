import fierbase from 'firebase/app';
import axios from 'axios';
import { authUrl, API_CONFIG, dataBaceUrl, resetPasswordUrl } from './api-config';
import { showErrorNotification, showErrorRegisterNotification } from '../shared/error-handlers';

require('firebase/auth')

export const initApi = () => {
  fierbase.initializeApp(API_CONFIG);
};

export const signIn = (email, password) => {
  return axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true
  })
    .then( response => response)
    .catch(err => {
      showErrorNotification(err);
    });
};

export const createdUser = async (name, email, password ) => {
  return await fierbase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      axios.post(`${dataBaceUrl}/miniLabUsers.json`, {
        name,
        email,
      })
        .then( res => res);
      return  response
    })
    .catch(err => showErrorRegisterNotification(err));
};

export const resetPassword = ( email ) => {
  return axios.post(resetPasswordUrl, {
    requestType:"PASSWORD_RESET",
    email
  })
    .then( response => response)
    .catch(err => {
      showErrorNotification(err);
    });
}

initApi();
