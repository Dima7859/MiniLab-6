import { createBoardsColumns, renameColumn, createTaskColumns } from '../api/api-handlers';
import { LocalStorageService } from './ls-service';

export const boardContentHendler = boardContent => {
  LocalStorageService.setBoardData(boardContent);
  const blockBoardContent = document.getElementById('blockBoardContent');
  const title = document.createElement('div');
  const nameBoard = document.createElement('div');
  const settingBoard = document.createElement('div');
  const settingMenu = document.createElement('div');
  const allColumns = document.createElement('div');
  const createBlockColumn = document.createElement('div');
  const modelCreateColumn = document.getElementById('modelCreateColumn');
  const inputCreateColumn = document.getElementById('inputCreateColumn');
  const btnClosedCreateColumn = document.getElementById('btnClosedCreateColumn');
  const btnCreateColumn = document.getElementById('btnCreateColumn');
  const modelRenameColumn = document.getElementById('modelRenameColumn');
  const inputRenameColumn = document.getElementById('inputRenameColumn');
  const btnRenameColumn = document.getElementById('btnRenameColumn');
  const btnClosedRenameColumn = document.getElementById('btnClosedRenameColumn');
  const modelCreateTask = document.getElementById('modelCreateTask');
  const inputCreateTask = document.getElementById('inputCreateTask');
  const btnCreateTask = document.getElementById('btnCreateTask');
  const btnClosedCreateTask = document.getElementById('btnClosedCreateTask');
  const boardNameColumnsArr = Object.keys(boardContent.columns).map( key => ({...boardContent.columns[key], id: key}));

  btnCreateColumn.setAttribute('disabled', true);
  btnRenameColumn.setAttribute('disabled', true);
  btnCreateTask.setAttribute('disabled', true);

  while (blockBoardContent.firstChild) {
    blockBoardContent.removeChild(blockBoardContent.firstChild);
  };

  const openModalColumn = modalBlock => {
    const isClicked = modalBlock.getAttribute('clicked');
    if (!isClicked) {
      modalBlock.setAttribute('clicked', true);
      modalBlock.style.display = 'flex';
    } else {
      modalBlock.style.display = 'none';
      modalBlock.removeAttribute('clicked');
    }
  };

  title.className = 'boardsContent__title';
  nameBoard.className = 'boardsContent__title__nameBoards';
  settingBoard.className = 'boardsContent__title__settingBoards';
  allColumns.className = 'boardsContent__allColumns';
  createBlockColumn.className = 'boardsContent__allColumns__overflowBlock__createColumn';
  nameBoard.innerText = boardContent.name
  createBlockColumn.innerText = '+ Create column';

  blockBoardContent.append(title, allColumns);
  title.append(nameBoard, settingBoard);

  boardNameColumnsArr.forEach(item => {
    const taskArr = [];
    const itemContent = Object.keys(item).map( key => ({...item[key], id: key}));
    const blockColumn = document.createElement('div');
    const titleColumn = document.createElement('div');
    const settingColumn = document.createElement('div');
    const divHederColum = document.createElement('div');
    const menuSettingColumn = document.createElement('div');
    const rename = document.createElement('div');
    const createTask = document.createElement('div');
    const overflowBlock = document.createElement('div');

    itemContent.forEach( item => {
      if (item.content) {
        taskArr.push(item);
      };
    })

    rename.innerText = 'Rename';
    titleColumn.innerText = item.name;
    createTask.innerText = '+ Create Task';
    rename.setAttribute('columnKey', item.id);
    createTask.setAttribute('columnKey', item.id);
    overflowBlock.className = 'boardsContent__allColumns__overflowBlock';
    rename.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting__functional'
    blockColumn.className = 'boardsContent__allColumns__overflowBlock__column';
    divHederColum.className = 'boardsContent__allColumns__overflowBlock__column__heder';
    settingColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__setting';
    titleColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__title';
    menuSettingColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting';
    createTask.className = 'boardsContent__allColumns__overflowBlock__column__createTask';
    allColumns.append(overflowBlock);
    overflowBlock.append(blockColumn);
    blockColumn.append(divHederColum);
    divHederColum.append(titleColumn, settingColumn, menuSettingColumn);
    menuSettingColumn.append(rename);

    taskArr.forEach( item => {
      const task = document.createElement('div');

      task.innerText = item.content;
      task.setAttribute('columnKey', item.id);
      task.className = 'boardsContent__allColumns__overflowBlock__column__task';
      blockColumn.append(task);
    })

    blockColumn.append(createTask);

    const openSettingColumn = () => {
      const isClicked = menuSettingColumn.getAttribute('clicked');
      if (!isClicked) {
        menuSettingColumn.setAttribute('clicked', true);
        menuSettingColumn.style.display = 'flex';
      } else {
        menuSettingColumn.style.display = 'none';
        menuSettingColumn.removeAttribute('clicked');
      }
    }

    settingColumn.onclick = () => {
      openSettingColumn();
    }

    rename.onclick = () => {
      LocalStorageService.setIdColumn(rename.getAttribute('columnKey'));
      openModalColumn(modelRenameColumn);
      openSettingColumn();
    }

    createTask.onclick = () => {
      LocalStorageService.setIdColumn(createTask.getAttribute('columnKey'));
      openModalColumn(modelCreateTask);
    }

  });

  btnClosedCreateTask.onclick = () => {
    openModalColumn(modelCreateTask);
    LocalStorageService.removeIdColumn();
  }

  btnClosedRenameColumn.onclick = () => {
    openModalColumn(modelRenameColumn);
    LocalStorageService.removeIdColumn();
  }

  createBlockColumn.onclick = () => {
    openModalColumn(modelCreateColumn);
  }

  btnClosedCreateColumn.onclick = () => {
    openModalColumn(modelCreateColumn);
  }

  btnCreateColumn.onclick = () =>{
    createBoardsColumns(boardContent.key, inputCreateColumn.value)
    inputCreateColumn.value = null;
    openModalColumn(modelCreateColumn);
  }

  btnRenameColumn.onclick = () => {
    renameColumn(LocalStorageService.getIdColumn(), inputRenameColumn.value);
    openModalColumn(modelRenameColumn);
    inputRenameColumn.value = null;
  }

  btnCreateTask.onclick = () => {
    createTaskColumns(LocalStorageService.getIdColumn(), inputCreateTask.value);
    openModalColumn(modelCreateTask);
    inputCreateTask.value = null;
  }

  inputCreateColumn.oninput = () => {
    inputCreateColumn.value !== '' ? btnCreateColumn.removeAttribute('disabled') : btnCreateColumn.setAttribute('disabled', true);
  };

  inputRenameColumn.oninput = () => {
    inputRenameColumn.value !== '' ? btnRenameColumn.removeAttribute('disabled') : btnRenameColumn.setAttribute('disabled', true);
  };

  inputCreateTask.oninput = () => {
    inputCreateTask.value !== '' ? btnCreateTask.removeAttribute('disabled') : btnCreateTask.setAttribute('disabled', true);
  };

  allColumns.append(createBlockColumn);
};
