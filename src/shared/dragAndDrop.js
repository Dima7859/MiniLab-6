import { deleteTask, dragAndDropTask } from '../api/api-handlers';
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

export const dragDrop = function ( event ) {
  const taskId = event.dataTransfer.getData('id');
  const content = document.getElementById(taskId).innerText;
  const primaryColumnId = LocalStorageService.getIdColumn();
  const columnId = this.getAttribute('columnKey');
  this.prepend(document.getElementById(taskId));
  dragAndDropTask(columnId, taskId, content);
  deleteTask(primaryColumnId, taskId);
};
