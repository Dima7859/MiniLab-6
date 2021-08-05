import { getBoards, getBoardsInfo } from '../api/api-handlers';
import { clearLookBoards } from '../components/profile/profile';
import { boardContentHendler } from './boardContent';
import { LocalStorageService } from './ls-service';


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
      if ( item.creatorId === LocalStorageService.getPersonalData().id) {
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

        div.onclick = () => {
          LocalStorageService.removeIdBoard();
          LocalStorageService.setIdBoard(div.getAttribute('boardKey'));

          getBoards()
            .then( result => {
              const transformedUserArr = Object.keys(result.data).map( key => ({
                ...result.data[key],
                key: key
              }));

              transformedUserArr.forEach( item => {
                if ( item.key === LocalStorageService.getIdBoard()) {
                  boardContentHendler(item);
                };
              });
            });
        }
      }
    })
  });
};
