import './components/styles/style.scss';
import { paths, routes } from './shared/constants/routes';
import { signInHandler } from './components/sign-in/sign-in';
import { getToken, getUserEmail, setUserName, setUserKey, setUserUid } from './shared/ls-service';
import { signUpHendler } from './components/sign-up/sign-up';
import { resetPasswordHandler } from './components/resetPassword/resetPassword';
import { getUsers } from './api/api-handlers';
import { checkAgreement } from './shared/agreementUser';
import { mainPageHandler } from './shared/mainPage';
import { userNameAvatar } from './shared/heder';



window.onload = () => {

  const pathname = Object.values(paths).find( path => path === window.location.pathname );

  switch (pathname) {
    case paths.home:
      const token = getToken();

      if (!token) {
        window.location.href = routes.startPage;
      }
      getUsers()
        .then(result => {

          const transformedUserArr = Object.keys(result.data).map( key => ({
            ...result.data[key],
            key: key
          }));

          transformedUserArr.forEach( item => {
            const emailUser = item.email.toLowerCase();
            if (emailUser === getUserEmail() || item.email === getUserEmail()) {

              setUserName(item.name);
              setUserKey(item.key);
              setUserUid(item.uuid);
              checkAgreement(item);
            };
          });
          userNameAvatar();
        });
      mainPageHandler()
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
