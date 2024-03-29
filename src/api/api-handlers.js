require('firebase/auth')
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { authUrl, API_CONFIG, dataBaceUrl, resetPasswordUrl, resetEmailUrl } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { LocalStorageService } from '../shared/ls-service';
import { paths, routes } from '../shared/constants/routes';
import { boardContentHendler } from '../shared/boardContent';
import { hideBlockSpinner, showBlockSpinner } from '../components/spinner/spinner';
import { viewingBoardsUser } from '../shared/viewingBoards';
import { clearLookBoards, setUserInfo } from '../shared/components';
import { refreshFormPhoto } from '../components/profile/profile';



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
        const transformedUsers = Object.keys(response.data).map( key => ({...response.data[key], id: key}));
        const user = transformedUsers.find( user => user.uuid === LocalStorageService.getUID());
        LocalStorageService.setPersonalData(user);
      }
    })
}

export const getUserById = id => {
  return axios.get(`${dataBaceUrl}/miniLabUsers/${id}.json`)
    .then( response => response );
};

export const getUsers = () => {
  return axios.get(`${dataBaceUrl}/miniLabUsers.json`)
    .then( response => response);
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
    showBlockSpinner();
    await createAuthData(email, password);
    await createUser(user);
    await signIn(email, password);
  } catch (error) {
    hideBlockSpinner();
    showErrorNotification(error);
  }
  hideBlockSpinner();
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
        boardContentHendler(item, item.condition);
      };
    });
  });
};

export const createBoardsColumns = (idBoard, name) => {
  return axios.post(`${dataBaceUrl}/miniLabBoards/${idBoard}/columns.json`, {
    name
  })
    .then( () => updateBoards());
};

export const updatePartnersBoard = ( idBoard, partner) => {
  return axios.post(`${dataBaceUrl}/miniLabBoards/${idBoard}/partners.json`, {
    partner
  })
    .then( response => response);
};

export const createBoardsContent = name => {
  return axios.post(`${dataBaceUrl}/miniLabBoards.json`, {
    name,
    creatorId: LocalStorageService.getPersonalData().id,
    condition : 'Active'
  })
    .then( res => res);
};

export const createBoards = async name => {
  let idBoard;

  try {
    showBlockSpinner();
    await createBoardsContent(name)
      .then(res => {
        idBoard = res.data.name
      })
    await createBoardsColumns(idBoard, 'To do');
    await createBoardsColumns(idBoard, 'Done');
    await createBoardsColumns(idBoard, 'Doing');
    await updatePartnersBoard(idBoard, LocalStorageService.getPersonalData().id);
  } catch (error) {
    hideBlockSpinner();
    showErrorNotification(error);
  }
  hideBlockSpinner();
}

export const renameColumn = ( id, newName ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${id}.json`,{
    name: newName
  })
    .then( () => updateBoards());
}

export const createTaskColumns = (id, content, taskNumber, responsibleTask, deadline ) => {
  showBlockSpinner();
  axios.post(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${id}.json`, {
    content,
    taskNumber,
    responsibleTask,
    deadline
  })
    .then( async () => {
      await updateBoards();
      hideBlockSpinner();
    });
};

export const dragAndDropTask = ( idColumn, idTask, content, taskNumber, responsibleTask, deadline ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${idColumn}/${idTask}.json`,{
    content,
    taskNumber,
    responsibleTask,
    deadline
  })
}

export const deleteTask = (idColumn, idTask) => {
  axios.delete(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${idColumn}/${idTask}.json`)
    .then( async () => {
      await updateBoards();
      hideBlockSpinner();
    });
};

export const deleteBoards = () => {
  axios.delete(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}.json`)
    .then( async () => {
      LocalStorageService.removeIdBoard();
      LocalStorageService.removeIdColumn();
      LocalStorageService.removeBoardData();
      viewingBoardsUser('Active');
      setTimeout(() => hideBlockSpinner(),700);
    });
};

export const renameBoard = ( newName ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}.json`,{
    name: newName
  })
    .then( async () => {
      await updateBoards();
      viewingBoardsUser('Active');
      setTimeout(() => hideBlockSpinner(),700);
    });
}

export const deleteColumn = (idColumn) => {
  axios.delete(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${idColumn}.json`)
    .then( async () => {
      LocalStorageService.removeIdColumn();
      await updateBoards();
      setTimeout(() => hideBlockSpinner(),700);
    });
};

export const updateTaskNumber = ( newAllTaskNumber ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}.json`,{
    AllTaskNumber: newAllTaskNumber
  })
}

export const getDataDragAndDropTask = async (idColumn, idTask) => {
  return axios.get(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}/columns/${idColumn}/${idTask}.json`)
    .then( response => response);
};

export const updateConditionBoard = ( newCondition ) => {
  return axios.patch(`${dataBaceUrl}/miniLabBoards/${LocalStorageService.getIdBoard()}.json`,{
    condition: newCondition
  })
    .then( async () => {
      LocalStorageService.removeIdBoard();
      LocalStorageService.removeIdColumn();
      LocalStorageService.removeBoardData();
      clearLookBoards();
      setTimeout(() => hideBlockSpinner(),700);
    });
}

export const uploadPhoto = async (event, imgName) => {
  const user = LocalStorageService.getPersonalData();

  await firebase
    .storage()
    .ref(`photos/${imgName}`)
    .put(event.target.files[0])
    .catch( error => showErrorNotification(error));
  await firebase
    .storage()
    .ref(`photos/${imgName}`)
    .getDownloadURL()
    .then( url => user.photo = url)
    .catch( error => showErrorNotification(error));
  
  await updateUser(user).then( () => refreshFormPhoto());

  await firebase.storage().ref(`photos/${imgName}`).delete
}

export const updateUser = async user => 
  axios.put(`${dataBaceUrl}/miniLabUsers/${user.id}.json`, user)
    .then(() => {
      const pathname = Object.values(paths).find( path => path === window.location.pathname );
      LocalStorageService.setPersonalData(user);
      setUserInfo();
      if (pathname === paths.profile) {
        refreshFormPhoto();
      }
      hideBlockSpinner();
    });

export const resetEmail = ( email ) => {
  return axios.post (resetEmailUrl, {
    idToken: `${LocalStorageService.getToken()}`,
    email,
    returnSecureToken: true
  })
    .then( response => response )
    .catch(error => {
      hideBlockSpinner();
      showErrorNotification(error);
    });
}

initApi();
