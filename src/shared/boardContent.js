import { createBoardsColumns, renameColumn, createTaskColumns } from '../api/api-handlers';
import { ERROR_MESSAGES } from '../components/error-messages';
import { LocalStorageService } from './ls-service';
import { contentNameValidator, contentTaskValidator } from './validators';
import { openModalInputMenu, validContentOnblur, validContentOninput } from './menuMainPage';
import { showErrorNotification } from './error-handlers';
import { drag, dragDrop, dragEnd, dragEnter, dragOver } from './dragAndDrop';

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
  const arrNamesColumns = [];
  const arrTaskContent = [];

  btnCreateColumn.setAttribute('disabled', true);
  btnRenameColumn.setAttribute('disabled', true);
  btnCreateTask.setAttribute('disabled', true);

  while (blockBoardContent.firstChild) {
    blockBoardContent.removeChild(blockBoardContent.firstChild);
  };

  inputCreateColumn.oninput = () => validContentOninput(inputCreateColumn, btnCreateColumn, contentNameValidator, 'columError');
  inputCreateColumn.onblur = () => validContentOnblur(inputCreateColumn, btnCreateColumn, contentNameValidator, 'columError', ERROR_MESSAGES.nameContent);
  inputRenameColumn.oninput = () => validContentOninput(inputRenameColumn, btnRenameColumn, contentNameValidator, 'renameError');
  inputRenameColumn.onblur = () => validContentOnblur(inputRenameColumn, btnRenameColumn, contentNameValidator, 'renameError', ERROR_MESSAGES.nameContent);
  inputCreateTask.oninput = () => validContentOninput(inputCreateTask, btnCreateTask, contentTaskValidator, 'taskError');
  inputCreateTask.onblur = () => validContentOnblur(inputCreateTask, btnCreateTask, contentTaskValidator, 'taskError', ERROR_MESSAGES.taskContent);


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
    const taskStorage = document.createElement('div');
    const menuSettingColumn = document.createElement('div');
    const rename = document.createElement('div');
    const createTask = document.createElement('div');
    const overflowBlock = document.createElement('div');

    arrNamesColumns.push(item.name);

    itemContent.forEach( item => {
      if (item.content) {
        taskArr.push(item);
        arrTaskContent.push(item.content);
      };
    })

    rename.innerText = 'Rename';
    titleColumn.innerText = item.name;
    createTask.innerText = '+ Create Task';
    rename.setAttribute('columnKey', item.id);
    createTask.setAttribute('columnKey', item.id);
    taskStorage.setAttribute('columnKey', item.id);
    overflowBlock.className = 'boardsContent__allColumns__overflowBlock';
    rename.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting__functional'
    blockColumn.className = 'boardsContent__allColumns__overflowBlock__column';
    divHederColum.className = 'boardsContent__allColumns__overflowBlock__column__heder';
    settingColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__setting';
    titleColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__title';
    menuSettingColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting';
    taskStorage.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage';
    createTask.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage__createTask';
    createTask.draggable = false ;
    allColumns.append(overflowBlock);
    overflowBlock.append(blockColumn);
    blockColumn.append(divHederColum, taskStorage);
    divHederColum.append(titleColumn, settingColumn, menuSettingColumn);
    menuSettingColumn.append(rename);

    taskStorage.addEventListener('dragstart', () => {
      LocalStorageService.setIdColumn(taskStorage.getAttribute('columnKey'));
    })

    taskStorage.ondragover = dragOver;
    taskStorage.ondragenter = dragEnter;
    taskStorage.ondrop = dragDrop;

    taskArr.forEach( item => {
      const task = document.createElement('div');

      task.innerText = item.content;
      task.draggable = true ;
      task.setAttribute('id', item.id);
      task.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage__task';
      task.ondragstart = drag;
      task.ondragend = dragEnd;
      taskStorage.append(task);
    })

    taskStorage.append(createTask);

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
      openModalInputMenu(modelRenameColumn);
      openSettingColumn();
    }

    createTask.onclick = () => {
      LocalStorageService.setIdColumn(createTask.getAttribute('columnKey'));
      openModalInputMenu(modelCreateTask);
    }

  });

  btnClosedCreateTask.onclick = () => {
    openModalInputMenu(modelCreateTask);
    LocalStorageService.removeIdColumn();
    inputCreateTask.value = null;
  }

  btnClosedRenameColumn.onclick = () => {
    openModalInputMenu(modelRenameColumn);
    LocalStorageService.removeIdColumn();
    inputRenameColumn.value = null;
  }

  btnClosedCreateColumn.onclick = () => {
    openModalInputMenu(modelCreateColumn);
    inputCreateColumn.value = null;
  }

  createBlockColumn.onclick = () => {
    openModalInputMenu(modelCreateColumn);
  }

  btnCreateColumn.onclick = () => {
    let check = 0;

    arrNamesColumns.forEach(item => {
      if (item === inputCreateColumn.value) {
        check++;
      };
    });

    if (check === 0) {
      createBoardsColumns(boardContent.key, inputCreateColumn.value);
      inputCreateColumn.value = null;
      openModalInputMenu(modelCreateColumn);
    } else showErrorNotification('repetition');
  }

  btnRenameColumn.onclick = () => {
    let check = 0;

    arrNamesColumns.forEach(item => {
      if (item === inputRenameColumn.value) {
        check++;
      };
    });

    if (check === 0) {
      renameColumn(LocalStorageService.getIdColumn(), inputRenameColumn.value);
      openModalInputMenu(modelRenameColumn);
      inputRenameColumn.value = null;
    } else showErrorNotification('repetition');
  }

  btnCreateTask.onclick = () => {
    let check = 0;

    arrTaskContent.forEach(item => {
      if (item === inputCreateTask.value) {
        check++;
      };
    });

    if (check === 0) {
      createTaskColumns(LocalStorageService.getIdColumn(), inputCreateTask.value.trim());
      openModalInputMenu(modelCreateTask);
      inputCreateTask.value = null;
    } else showErrorNotification('repetition');
  }

  allColumns.append(createBlockColumn);
};
