import { resetEmail, updateUser, uploadPhoto } from '../../api/api-handlers';
import {
  logoutBtnHandler,
  openModalInputMenu,
  setUserInfo,
  validContentOnblur,
  validContentOninput
} from '../../shared/components';
import { routes } from '../../shared/constants/routes';
import { menuHederHendler } from '../../shared/heder';
import { LocalStorageService } from '../../shared/ls-service';
import { emailValidator, nameValidator } from '../../shared/validators';
import { ERROR_MESSAGES } from '../error-messages';
import { showBlockSpinner } from '../spinner/spinner';

export const profileHandler = () => {
  const btnBack = document.querySelector('.profile__header__btnBack');
  const photoFile = document.getElementById('photoFile');
  const modelChangeName = document.getElementById('modelChangeName');
  const openModalChangeName = document.getElementById('openModalChangeName');
  const inputChangeName = document.getElementById('inputChangeName');
  const btnClosedChangeName = document.getElementById('btnClosedChangeName');
  const btnChangeName = document.getElementById('btnChangeName');
  const modelChangeEmail = document.getElementById('modelChangeEmail');
  const openModalChangeEmail = document.getElementById('openModalChangeEmail');
  const inputChangeEmail = document.getElementById('inputChangeEmail');
  const btnClosedBtnChangeEmail = document.getElementById('btnClosedBtnChangeEmail');
  const btnChangeEmail = document.getElementById('btnChangeEmail');

  btnChangeName.setAttribute('disabled', true);
  btnChangeEmail.setAttribute('disabled', true);

  inputChangeName.oninput = () => validContentOninput(inputChangeName, btnChangeName, nameValidator, 'changeNameError');
  inputChangeName.onblur = () => validContentOnblur(inputChangeName, btnChangeName, nameValidator, 'changeNameError', ERROR_MESSAGES.name);
  inputChangeEmail.oninput = () => validContentOninput(inputChangeEmail, btnChangeEmail, emailValidator, 'changeEmailError');
  inputChangeEmail.onblur = () => validContentOnblur(inputChangeEmail, btnChangeEmail, emailValidator, 'changeEmailError', ERROR_MESSAGES.email);

  photoFile.oninput = event => {
    uploadPhoto(event, photoFile.value)
  }

  setUserInfo();
  menuHederHendler();
  logoutBtnHandler();
  refreshFormPhoto();

  btnBack.onclick = () => {
    window.location.href = routes.home;
  }

  openModalChangeName.onclick = () => {
    openModalInputMenu(modelChangeName);
  }

  btnClosedChangeName.onclick = () => {
    openModalInputMenu(modelChangeName);
    inputChangeName.value = null;
    btnChangeName.setAttribute('disabled', true);
  }

  openModalChangeEmail.onclick = () => {
    openModalInputMenu(modelChangeEmail);
  }

  btnClosedBtnChangeEmail.onclick = () => {
    openModalInputMenu(modelChangeEmail);
    inputChangeEmail.value = null;
    btnChangeEmail.setAttribute('disabled', true);
  }

  btnChangeName.onclick = () => {
    const user = LocalStorageService.getPersonalData();
    user.name = inputChangeName.value
    updateUser(user);
    inputChangeName.value = null;
    openModalInputMenu(modelChangeName);
  }

  btnChangeEmail.onclick = async () => {
    showBlockSpinner();
    await resetEmail(inputChangeEmail.value)
      .then( response => {
        const user = LocalStorageService.getPersonalData();
        user.email = response.data.email;
        LocalStorageService.setToken(response.data.idToken);
        updateUser(user);
      })
      inputChangeEmail.value = null;
      btnChangeEmail.setAttribute('disabled', true);
      openModalInputMenu(modelChangeEmail);
  }
}

export const refreshFormPhoto = () => {
  const photoBlock = document.querySelector('.profile__userInfo__photo__userAvatar');
  const userPhotoUrl = LocalStorageService.getPersonalData().photo;
  const currentName = document.querySelector('.profile__userInfo__date__control__currentName');
  const currentEmail = document.querySelector('.profile__userInfo__date__control__currentEmail');

  photoBlock.style.backgroundImage = userPhotoUrl ?
    `url("${userPhotoUrl}")` : `url("/src/asset/img/user.png")`;

  currentName.innerText = LocalStorageService.getPersonalData().name ;
  currentEmail.innerText = LocalStorageService.getPersonalData().email ;
}
