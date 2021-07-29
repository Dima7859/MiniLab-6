import { getBoards } from '../api/api-handlers';
import { clearLookBoards } from '../components/profile/profile';
import { getUserEmail } from './ls-service';


export const viewingBoardsUser = condition => {
  const lookBoardsActive = document.getElementById('lookBoardsActive');
  const lookBoardsClosed = document.getElementById('lookBoardsClosed');
  const activeUserBoard = [];

  clearLookBoards();

  getBoards()
  .then(result => {

    const transformedUserArr = Object.keys(result.data).map( key => ({
      ...result.data[key],
      key: key
    }));

    transformedUserArr.forEach( item => {
      const emailUser = item.email.toLowerCase();
      if (emailUser === getUserEmail() || item.email === getUserEmail()) {
        activeUserBoard.push(item);
      };
    });

    activeUserBoard.forEach( item => {
      if (condition === item.condition) {
        const div = document.createElement('div');
        div.className = 'mainPage__menuBoards__functional__boards__name';
        div.innerText = item.name;
        div.setAttribute('boardKey', item.key);
        condition === 'active' ? lookBoardsActive.append(div) : lookBoardsClosed.append(div);
      }
    })
  });
};

