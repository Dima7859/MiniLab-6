import { updateBoards } from '../api/api-handlers';
import { checkAgreement } from './agreementUser';
import { setUserInfo } from './components';
import { menuHederHendler } from './heder';
import { LocalStorageService } from './ls-service';
import { openMenu } from './menuMainPage';


export const mainPageHandler = async () => {
  setUserInfo();
  checkAgreement();
  if (LocalStorageService.getIdBoard()) {
    await updateBoards();
  };
  openMenu();
  menuHederHendler();
};
