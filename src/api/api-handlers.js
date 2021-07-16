import fierbase from 'firebase/app';
import axios from 'axios';
import { authUrl, API_CONFIG, dataBaceUrl } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';

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
  await axios.post(`${dataBaceUrl}/miniLabUsers.json`, {
    name,
    email,
  })
    .then( response => response);

  return await fierbase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => response)
    .catch(err => console.log(err))
};

initApi();
