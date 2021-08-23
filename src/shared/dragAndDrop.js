import { deleteTask, dragAndDropTask, getDataDragAndDropTask } from '../api/api-handlers';
import { showBlockSpinner } from '../components/spinner/spinner';
import { LocalStorageService } from './ls-service';

export const drag = function (event) {
  event.dataTransfer.setData('id', event.target.id);
  setTimeout(() => {
    this.classList.add('hide');
  }, 0)
}

export const dragEnd = function () {
  this.classList.remove('hide');
};

export const dragOver = function (event) {
  event.preventDefault();
};

export const dragEnter = function (event) {
  event.preventDefault();
};

export const dragDrop = async function ( event ) {
  const taskId = event.dataTransfer.getData('id');
  const primaryColumnId = LocalStorageService.getIdColumn();
  const columnId = this.getAttribute('columnKey');
  if (primaryColumnId !== columnId) {
    this.prepend(document.getElementById(taskId));
    showBlockSpinner();
    await getDataDragAndDropTask(primaryColumnId, taskId)
      .then( response => {
        dragAndDropTask(columnId, taskId, response.data.content, response.data.taskNumber, response.data.responsibleTask, response.data.deadline )
      })
    deleteTask(primaryColumnId, taskId);
  }
};
