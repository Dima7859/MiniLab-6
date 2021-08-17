import { 
  createBoardsColumns,
  renameColumn,
  createTaskColumns,
  updateTaskNumber,
  deleteTask,
  deleteBoards,
  deleteColumn,
  renameBoard,
  updateConditionBoard,
  getUsers,
  updatePartnersBoard
} from '../api/api-handlers';
import { ERROR_MESSAGES } from '../components/error-messages';
import { LocalStorageService } from './ls-service';
import { contentNameValidator, contentTaskValidator, emailValidator } from './validators';
import { openBoardNameMenu, openModalInputMenu, validContentOnblur, validContentOninput } from './menuMainPage';
import { showErrorNotification } from './error-handlers';
import { drag, dragDrop, dragEnd, dragEnter, dragOver } from './dragAndDrop';
import { hideBlockSpinner, showBlockSpinner } from '../components/spinner/spinner';

export const boardContentHendler = ( boardContent, status ) => {
  LocalStorageService.setBoardData(boardContent);
  const userMenuBoards = document.getElementById('userMenuBoards');
  const blockBoardContent = document.getElementById('blockBoardContent');
  const title = document.createElement('div');
  const nameBoard = document.createElement('div');
  const settingBoard = document.createElement('div');
  const settingMenu = document.createElement('div');
  const btnInviteBoard = document.createElement('div');
  const btnDeleteBoard = document.createElement('div');
  const btnRenameBoard = document.createElement('div');
  const btnClosedBoard = document.createElement('div');
  const allColumns = document.createElement('div');
  const createBlockColumn = document.createElement('div');
  const modelInvitePartner = document.getElementById('modelInvitePartner');
  const inputInvitePartner = document.getElementById('inputInvitePartner');
  const btnInvitePartner = document.getElementById('btnInvitePartner');
  const btnClosedInvitePartner = document.getElementById('btnClosedInvitePartner');
  const modelRenameBoard = document.getElementById('modelRenameBoard');
  const inputRenameBoard = document.getElementById('inputRenameBoard');
  const btnModalRenameBoard = document.getElementById('btnModalRenameBoard');
  const btnModalClosedRenameBoard =document.getElementById('btnModalClosedRenameBoard');
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
  let taskNumber = 0;
  const arrNamesColumns = [];
  const arrTaskContent = [];

  btnInvitePartner.setAttribute('disabled', true);
  btnModalRenameBoard.setAttribute('disabled', true);
  btnCreateColumn.setAttribute('disabled', true);
  btnRenameColumn.setAttribute('disabled', true);
  btnCreateTask.setAttribute('disabled', true);

  const clearBoardContent = () => {
    while (blockBoardContent.firstChild) {
    blockBoardContent.removeChild(blockBoardContent.firstChild);
    };
  }

  clearBoardContent();

  if (boardContent.AllTaskNumber) {
    taskNumber = boardContent.AllTaskNumber;
    taskNumber++;
  } else taskNumber++;

  inputCreateColumn.oninput = () => validContentOninput(inputCreateColumn, btnCreateColumn, contentNameValidator, 'columError');
  inputCreateColumn.onblur = () => validContentOnblur(inputCreateColumn, btnCreateColumn, contentNameValidator, 'columError', ERROR_MESSAGES.nameContent);
  inputRenameBoard.oninput = () => validContentOninput(inputRenameBoard, btnModalRenameBoard, contentNameValidator, 'renameErrorBoard');
  inputRenameBoard.onblur = () => validContentOnblur(inputRenameBoard, btnModalRenameBoard, contentNameValidator, 'renameErrorBoard', ERROR_MESSAGES.nameContent);
  inputInvitePartner.oninput = () => validContentOninput(inputInvitePartner, btnInvitePartner, emailValidator, 'inviteError');
  inputInvitePartner.onblur = () => validContentOnblur(inputInvitePartner, btnInvitePartner, emailValidator, 'inviteError', ERROR_MESSAGES.email);
  inputRenameColumn.oninput = () => validContentOninput(inputRenameColumn, btnRenameColumn, contentNameValidator, 'renameErrorColumn');
  inputRenameColumn.onblur = () => validContentOnblur(inputRenameColumn, btnRenameColumn, contentNameValidator, 'renameErrorColumn', ERROR_MESSAGES.nameContent);
  inputCreateTask.oninput = () => validContentOninput(inputCreateTask, btnCreateTask, contentTaskValidator, 'taskError');
  inputCreateTask.onblur = () => validContentOnblur(inputCreateTask, btnCreateTask, contentTaskValidator, 'taskError', ERROR_MESSAGES.taskContent);

  title.className = 'boardsContent__title';
  nameBoard.className = 'boardsContent__title__nameBoards';
  settingBoard.className = 'boardsContent__title__settingBoards';
  settingMenu.className = 'boardsContent__title__menuSetting';
  btnInviteBoard.className = 'boardsContent__title__menuSetting__functional';
  btnDeleteBoard.className = 'boardsContent__title__menuSetting__functional';
  btnRenameBoard.className = 'boardsContent__title__menuSetting__functional';
  btnClosedBoard.className = 'boardsContent__title__menuSetting__functional';
  allColumns.className = 'boardsContent__allColumns';
  createBlockColumn.className = 'boardsContent__allColumns__overflowBlock__createColumn';
  nameBoard.innerText = boardContent.name ;
  btnInviteBoard.innerText = 'To invite';
  btnRenameBoard.innerText = 'Rename';
  btnDeleteBoard.innerText = 'Delete';
  createBlockColumn.innerText = '+ Create column';

  status === 'Active' ? btnClosedBoard.innerText = 'Closed Board' : btnClosedBoard.innerText = 'Active Board';

  if (status !== 'Active') {
    createBlockColumn.classList.add('disabledButton');
    btnRenameBoard.classList.add('disabledButton');
  }

  blockBoardContent.append(title, allColumns);
  title.append(nameBoard, settingBoard, settingMenu);
  settingMenu.append(btnInviteBoard, btnRenameBoard, btnDeleteBoard, btnClosedBoard);

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
    const btnDeleteColumn = document.createElement('div');
    const createTask = document.createElement('div');
    const overflowBlock = document.createElement('div');
    const columnId = item.id;

    arrNamesColumns.push(item.name);

    itemContent.forEach( item => {
      if (item.content) {
        taskArr.push(item);
        arrTaskContent.push(item.content);
      };
    })

    btnDeleteColumn.innerText = 'Delete';
    rename.innerText = 'Rename';
    titleColumn.innerText = item.name;
    createTask.innerText = '+ Create Task';
    rename.setAttribute('columnKey', columnId);
    btnDeleteColumn.setAttribute('columnKey', columnId);
    createTask.setAttribute('columnKey', columnId);
    taskStorage.setAttribute('columnKey', columnId);
    overflowBlock.className = 'boardsContent__allColumns__overflowBlock';
    rename.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting__functional';
    btnDeleteColumn.className = 'boardsContent__allColumns__overflowBlock__column__heder__menuSetting__functional';
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
    menuSettingColumn.append(rename, btnDeleteColumn);

    if (status !== 'Active') {
      createTask.classList.add('disabledButton');
      rename.classList.add('disabledButton');
    }

    taskStorage.addEventListener('dragstart', () => {
      LocalStorageService.setIdColumn(taskStorage.getAttribute('columnKey'));
    })

    taskStorage.ondragover = dragOver;
    taskStorage.ondragenter = dragEnter;
    taskStorage.ondrop = dragDrop;

    taskArr.forEach( item => {
      const task = document.createElement('div');
      const taskNumber = document.createElement('div');
      const btnDeleteTask = document.createElement('div');

      task.innerText = item.content;
      btnDeleteTask.innerText = "\u2716";
      task.draggable = true ;
      task.setAttribute('id', item.id);
      btnDeleteTask.setAttribute('idTask', item.id);
      btnDeleteTask.setAttribute('idColumn', columnId);
      task.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage__task';
      taskNumber.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage__task__number';
      btnDeleteTask.className = 'boardsContent__allColumns__overflowBlock__column__taskStorage__task__btnDelete';
      taskNumber.innerText = item.taskNumber;
      task.ondragstart = drag;
      task.ondragend = dragEnd;
      taskStorage.append(task);
      task.append(taskNumber, btnDeleteTask);

      btnDeleteTask.onclick = () => {
        showBlockSpinner();
        deleteTask(btnDeleteTask.getAttribute('idColumn'), btnDeleteTask.getAttribute('idTask'));
      };
    })

    taskStorage.append(createTask);

    settingBoard.onclick = () => {
      openModalInputMenu(settingMenu);
    };

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
    };

    btnDeleteColumn.onclick = () => {
      showBlockSpinner();
      openSettingColumn();
      deleteColumn(btnDeleteColumn.getAttribute('columnKey'));
    };

    createTask.onclick = () => {
      LocalStorageService.setIdColumn(createTask.getAttribute('columnKey'));
      openModalInputMenu(modelCreateTask);
    }

  });

  btnInviteBoard.onclick = () => {
    openModalInputMenu(modelInvitePartner);
    openModalInputMenu(settingMenu);
  }

  btnInvitePartner.onclick = async () => {
    let user;

    showBlockSpinner();

    await getUsers()
      .then(result => {

        const transformedUserArr = Object.keys(result.data).map( key => ({
          ...result.data[key],
          key: key
        }));

        transformedUserArr.forEach(item => {
          if ( item.email === inputInvitePartner.value) {
            user = item;
          };
        })
      })

      if (user !== undefined) {
        await updatePartnersBoard( LocalStorageService.getIdBoard(), user.key );
        inputInvitePartner.value = null;
        openModalInputMenu(modelInvitePartner);
      } else showErrorNotification('EMAIL_NOT_FOUND');

    hideBlockSpinner();
  }

  btnClosedInvitePartner.onclick = () => {
    openModalInputMenu(modelInvitePartner);
    inputInvitePartner.value = null;
  };

  btnDeleteBoard.onclick = () => {
    showBlockSpinner();
    openModalInputMenu(settingMenu);
    clearBoardContent();
    deleteBoards();
    openBoardNameMenu(userMenuBoards);
  };

  btnRenameBoard.onclick = () => {
    openModalInputMenu(modelRenameBoard);
    openModalInputMenu(settingMenu);
  };

  btnClosedBoard.onclick = () => {
    showBlockSpinner();
    openModalInputMenu(settingMenu);
    clearBoardContent();
    status === 'Active' ? updateConditionBoard('Closed') :  updateConditionBoard('Active');
    openBoardNameMenu(userMenuBoards);
  }

  btnModalClosedRenameBoard.onclick = () => openModalInputMenu(modelRenameBoard);

  btnModalRenameBoard.onclick = () => {
    showBlockSpinner();
    renameBoard(inputRenameBoard.value);
    openModalInputMenu(modelRenameBoard);
    inputRenameBoard.value = null;
  }

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
      createTaskColumns(LocalStorageService.getIdColumn(), inputCreateTask.value.trim(), taskNumber);
      updateTaskNumber(taskNumber);
      openModalInputMenu(modelCreateTask);
      inputCreateTask.value = null;
    } else showErrorNotification('repetition');
  }

  allColumns.append(createBlockColumn);
};
