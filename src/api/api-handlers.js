import fierbase from 'firebase/app';
import axios from 'axios';
import { authUrl, API_CONFIG, dataBaceUrl, resetPasswordUrl } from './api-config';
import { showErrorNotification, showErrorRegisterNotification } from '../shared/error-handlers';
import { getUserKey } from '../shared/ls-service';

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

export const createdUser = async (name, email, password, Agreement ) => {
  return await fierbase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      axios.post(`${dataBaceUrl}/miniLabUsers.json`, {
        name,
        email,
        Agreement
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

export const getUsers = async () => {
  return axios.get(`${dataBaceUrl}/miniLabUsers.json`)
    .then( response => response)
    .catch( err => console.log(err));
};

export const updateUserAgreement = ( newAgreement ) => {
  return axios.patch(`${dataBaceUrl}/miniLabUsers/${getUserKey()}.json`,{
    Agreement: newAgreement
  })
    .then( result => console.log(result));
}

initApi();
