import { updateBoards } from '../api/api-handlers';
import { checkAgreement } from './agreementUser';
import { menuHederHendler, userNameAvatar } from './heder';
import { LocalStorageService } from './ls-service';
import { openMenu } from './menuMainPage';


export const mainPageHandler = async () => {
  await userNameAvatar();
  checkAgreement();
  if (LocalStorageService.getIdBoard()) {
    await updateBoards();
  };
  openMenu();
  menuHederHendler();
};
