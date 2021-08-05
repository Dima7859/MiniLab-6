import { getUser, updateUserAgreement } from '../api/api-handlers';
import { LocalStorageService } from './ls-service';

export const currentVersionAgreement = 1 ;

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
    newAgreement.href = '/src/asset/Doc/sadasd.pdf';
    newAgreement.innerText = 'The Agreement has been amended, read';
    newAgreement.target = '_blank';
    body.append(modalBlock);
    modalBlock.append(windowAgreement);
    windowAgreement.append(newAgreement);
    windowAgreement.append(btn);

    btn.onclick = async () => {
      modalBlock.style.display = 'none';
      await updateUserAgreement(currentVersionAgreement);
      await getUser();
    };
  }
};
