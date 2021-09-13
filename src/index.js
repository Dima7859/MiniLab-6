import './components/styles/style.scss';
import { paths, routes } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { LocalStorageService } from './shared/ls-service';
import { signUpHendler } from './components/sign-up/sign-up';
import { resetPasswordHandler } from './components/resetPassword/resetPassword';
import { mainPageHandler } from './shared/mainPage';
import { profileHandler } from './components/profile/profile';



window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );
  const token = LocalStorageService.getToken();

  switch (pathname) {
    case paths.home:
      if (!token) {
        window.location.href = routes.startPage;
      }
      mainPageHandler()
      break;
    case paths.profile:
      if (!token) {
        window.location.href = routes.startPage;
      }
      profileHandler();
      break;
    case paths.sign_in:
      signInHandler();
      break;
    case paths.sign_up:
      signUpHendler();
      break;
    case paths.resetPassword:
      resetPasswordHandler();
      break;
    default:
      break;
  };
};
