import { createBoardsColumns, getBoardsInfo, renameColumn } from '../api/api-handlers';
import { LocalStorageService } from './ls-service';

export const boardContentHendler = boardContent => {
  LocalStorageService.setBoardData(boardContent);
  const blockBoardContent = document.getElementById('blockBoardContent');
  const title = document.createElement('div');
  const nameBoard = document.createElement('div');
  const settingBoard = document.createElement('div');
  const settingMenu = document.createElement('div');
  const allColumns = document.createElement('div');
  const boardNameColumnsArr = Object.keys(boardContent.columns).map( key => ({...boardContent.columns[key], id: key}));
  const createBlockColumn = document.createElement('div');
  const modelCreateColumn = document.getElementById('modelCreateColumn');
  const inputCreateColumn = document.getElementById('inputCreateColumn');
  const btnClosedCreateColumn = document.getElementById('btnClosedCreateColumn');
  const btnCreateColumn = document.getElementById('btnCreateColumn');

  const openCreateColumn = () => {
    const isClicked = modelCreateColumn.getAttribute('clicked');
    if (!isClicked) {
      modelCreateColumn.setAttribute('clicked', true);
      modelCreateColumn.style.display = 'flex';
    } else {
      modelCreateColumn.style.display = 'none';
      modelCreateColumn.removeAttribute('clicked');
    }
  }

  inputCreateColumn.oninput = () => {
    inputCreateColumn.value !== '' ? btnCreateColumn.removeAttribute('disabled') : btnCreateColumn.setAttribute('disabled', true);
  };

  createBlockColumn.onclick = () => {
    openCreateColumn();
  }

  btnClosedCreateColumn.onclick = () => {
    openCreateColumn();
  }

  btnCreateColumn.onclick = () =>{
    createBoardsColumns(boardContent.key, inputCreateColumn.value)
    inputCreateColumn.value = null;

    openCreateColumn();
  }

  while (blockBoardContent.firstChild) {
    blockBoardContent.removeChild(blockBoardContent.firstChild);
  };

  title.className = 'boardsContent__title';
  nameBoard.className = 'boardsContent__title__nameBoards';
  settingBoard.className = 'boardsContent__title__settingBoards';
  allColumns.className = 'boardsContent__allColumns';
  createBlockColumn.className = 'boardsContent__allColumns__createColumn';
  nameBoard.innerText = boardContent.name
  createBlockColumn.innerText = '+ Create column';

  blockBoardContent.append(title, allColumns);
  title.append(nameBoard, settingBoard);

  boardNameColumnsArr.forEach(item => {
    const blockColumn = document.createElement('div');
    const titleColumn = document.createElement('div');
    const settingColumn = document.createElement('div');
    const divHederColum = document.createElement('div');
    const menuSettingColumn = document.createElement('div');
    const rename = document.createElement('div');
    rename.innerText = 'Rename';
    rename.setAttribute('boardKey', item.id);
    titleColumn.innerText = item.name;
    blockColumn.className = 'boardsContent__allColumns__column';
    divHederColum.className = 'boardsContent__allColumns__column__heder';
    settingColumn.className = 'boardsContent__allColumns__column__heder__setting';
    titleColumn.className = 'boardsContent__allColumns__column__heder__title';
    menuSettingColumn.className = 'boardsContent__allColumns__column__heder__menuSetting';
    allColumns.append(blockColumn);
    blockColumn.append(divHederColum);
    divHederColum.append(titleColumn, settingColumn, menuSettingColumn);
    menuSettingColumn.append(rename);

    settingColumn.onclick = () => {
      const isClicked = menuSettingColumn.getAttribute('clicked');
      if (!isClicked) {
        menuSettingColumn.setAttribute('clicked', true);
        menuSettingColumn.style.display = 'flex';
      } else {
        menuSettingColumn.style.display = 'none';
        menuSettingColumn.removeAttribute('clicked');
      }
    }

  });
  allColumns.append(createBlockColumn);

};
