import { checkAgreement } from './agreementUser';
import { menuHederHendler, userNameAvatar } from './heder';
import { openMenu } from './menuMainPage';


export const mainPageHandler = async () => {
  await userNameAvatar();
  checkAgreement();
  openMenu();
  menuHederHendler();
};
