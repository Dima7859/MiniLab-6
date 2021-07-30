require('firebase/auth')
import firebase from 'firebase/app';
import axios from 'axios';

import { authUrl, API_CONFIG, dataBaceUrl, resetPasswordUrl } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { getUserKey, getUserEmail, setUserUid, getUserUid, setToken, setUserEmail } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';


export const initApi = () => {
  firebase.initializeApp(API_CONFIG);
};

export const signIn = (email, password) => {
  return axios.post(authUrl, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token } = response.data;
        setToken(token);
        setUserEmail(email);
        window.location.href = routes.home;
      }
    });
}

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;
      setUserUid(uid);
    });
}

export const createUser = user => {
  const { name, email, Agreement } = user;

  return axios.post(`${dataBaceUrl}/miniLabUsers.json`, {
    name,
    email,
    Agreement,
    uuid: getUserUid()
  });
}

export const signUp = async user => {
  const { password, email } = user;

  try {
    await createAuthData(email, password);
    await createUser(user);
    await signIn(email, password);
  } catch (error) {
    showErrorNotification(error);
  }
}

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
    .then( response => response);
};

export const updateUserAgreement = ( newAgreement ) => {
  return axios.patch(`${dataBaceUrl}/miniLabUsers/${getUserKey()}.json`,{
    Agreement: newAgreement
  })
    .then( result => result);
}

export const createBoards = ( name ) => {
  return axios.post(`${dataBaceUrl}/miniLabBoards.json`, {
    name,
    email: getUserEmail(),
    key: getUserKey(),
    condition : 'active'
  })
    .then( res => res);
};

export const getBoards = async () => {
  return axios.get(`${dataBaceUrl}/miniLabBoards.json`)
    .then( response => response);
};

initApi();
