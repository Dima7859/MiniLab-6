import { menuHederHendler } from './heder';
import { openMenu } from './menuMainPage';

export const mainPageHandler = () => {
  openMenu();
  menuHederHendler();
};