import { getUser, updateUserAgreement } from '../api/api-handlers';
import { LocalStorageService } from './ls-service';

export const currentVersionAgreement = 1 ;
export const linkToAgreement = 'https://firebasestorage.googleapis.com/v0/b/dimade7859-test.appspot.com/o/Doc%2Fagreement.pdf?alt=media&token=7fc400df-2850-40ed-b1b4-f09fa5e440bc';

export const checkAgreement = () => {
  if (LocalStorageService.getPersonalData().Agreement !== currentVersionAgreement) {
    const body = document.getElementsByTagName('body')[0];
    const modalBlock = document.createElement('div');
    const windowAgreement = document.createElement('div');
    const newAgreement = document.createElement('a');
    const btn = document.createElement('button');

    modalBlock.className = 'mainPageModal';
    windowAgreement.className = 'mainPageModal__agreement';
    btn.className = 'mainPageModal__agreement__btn';
    btn.innerText = 'Familiarized';
    newAgreement.href = linkToAgreement;
    newAgreement.innerText = 'The Agreement has been amended, read';
    newAgreement.target = '_blank';
    body.append(modalBlock);
    modalBlock.append(windowAgreement);
    windowAgreement.append(newAgreement);
    windowAgreement.append(btn);

    btn.onclick = async () => {
      await updateUserAgreement(currentVersionAgreement);
      await getUser();
      modalBlock.remove();
    };
  }
};
