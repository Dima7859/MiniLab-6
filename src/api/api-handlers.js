require('firebase/auth')
import firebase from 'firebase/app';
import axios from 'axios';

import { authUrl, API_CONFIG, dataBaceUrl, resetPasswordUrl } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';
import { routes } from '../shared/constants/routes';
import { closedBlockSpinner, openBlockSpinner } from '../components/profile/profile';
import { boardContentHendler } from '../shared/boardContent';


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
        const { idToken: token, localId } = response.data;
        LocalStorageService.setToken(token);
        LocalStorageService.setUID(localId);
        getUser().then( () => window.location.href = routes.home);
      }
    });
}

export const getUser = () => {
  return axios.get(`${dataBaceUrl}/miniLabUsers.json`)
    .then( response => {
      if (response) {
        const transformedUsers = 
          Object.keys(response.data).map( key => ({...response.data[key], id: key}));
        const user = transformedUsers.find( user => user.uuid === LocalStorageService.getUID());
        LocalStorageService.setPersonalData(user);
      }
    })
}

export const getUserById = id => axios.get(`${dataBaceUrl}/users/${id}.json`);

export const getUsers = () => {
  return axios.get(`${dataBaceUrl}/miniLabUsers.json`)
    .then( response => {
      if (response) {
        return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
      }
    });
};

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;
      LocalStorageService.setUID(uid);
    });
}

export const createUser = user => {
  const { name, email, Agreement } = user;

  return axios.post(`${dataBaceUrl}/miniLabUsers.json`, {
    name,
    email,
    Agreement,
    uuid: LocalStorageService.getUID()
  });
}

export const signUp = async user => {
  const { password, email } = user;

  try {
    await openBlockSpinner();
    await createAuthData(email, password);
    await createUser(user);
    await signIn(email, password);
    await closedBlockSpinner();
  } catch (error) {
    closedBlockSpinner();
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

export const updateUserAgreement = ( newAgreement ) => {
  return axios.patch(`${dataBaceUrl}/miniLabUsers/${LocalStorageService.getPersonalData().id}.json`,{
    Agreement: newAgreement
  })
    .then( result => result);
}

export const getBoards = async () => {
  return axios.get(`${dataBaceUrl}/miniLabBoards.json`)
    .then( response => response);
};

export const updateBoards = async () => {
  return axios.get(`${dataBaceUrl}/miniLabBoards.json`)
  .then( result => {
    const transformedUserArr = Object.keys(result.data).map( key => ({
      ...result.data[key],
      key: key
    }));

    transformedUserArr.forEach( item => {
      if ( item.key === LocalStorageService.getIdBoard()) {
        boardContentHendler(item);
      };
    });
  });
};

export const createBoardsColumns = (idBoard, name) => {
  axios.post(`${dataBaceUrl}/miniLabBoards/${idBoard}/columns.json`, {
    name
  })
    .then( () => updateBoards());
};

export const createBoards = ( name ) => {
  return axios.post(`${dataBaceUrl}/miniLabBoards.json`, {
    name,
    member :{
      creator: LocalStorageService.getPersonalData().email,
    },
    creatorId: LocalStorageService.getPersonalData().id,
    condition : 'active'
  })
    .then( res => {
      createBoardsColumns(res.data.name, 'To do');
      createBoardsColumns(res.data.name, 'Done');
      createBoardsColumns(res.data.name, 'Doing');
      return res
    });
};

export const renameColumn = ( id, newName ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${id}.json`,{
    name: newName
  })
    .then( result => updateBoards());
}

export const createTaskColumns = (id, content) => {
  axios.post(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${id}.json`, {
    content
  })
    .then( () => updateBoards());
};

initApi();
