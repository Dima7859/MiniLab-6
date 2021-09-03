export class LocalStorageService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static setPersonalData(user) {
    localStorage.setItem('personalData', JSON.stringify(user));
  }

  static getPersonalData() {
    return JSON.parse(localStorage.getItem('personalData'));
  }

  static setBoardData(board) {
    localStorage.setItem('boardData', JSON.stringify(board));
  }

  static getBoardData() {
    return JSON.parse(localStorage.getItem('boardData'));
  }

  static removeBoardData() {
    localStorage.removeItem('boardData');
  }

  static getUID() {
    return localStorage.getItem('uid');
  }

  static setUID(id) {
    localStorage.setItem('uid', id);
  }

  static getUserId() {
    return localStorage.getItem('userId');
  }

  static setUserId(id) {
    localStorage.setItem('userId', id);
  }

  static getIdBoard() {
    return localStorage.getItem('idBoard');
  }

  static setIdBoard(id) {
    localStorage.setItem('idBoard', id);
  }

  static removeIdBoard() {
    localStorage.removeItem('idBoard');
  }

  static getIdColumn() {
    return localStorage.getItem('idColumn');
  }

  static setIdColumn(id) {
    localStorage.setItem('idColumn', id);
  }

  static removeIdColumn() {
    localStorage.removeItem('idColumn');
  }

  static getIdTask() {
    return localStorage.getItem('idTask');
  }

  static setIdTask(id) {
    localStorage.setItem('idTask', id);
  }

  static removeIdTask() {
    localStorage.removeItem('idTask');
  }

  static clearStorage() {
    localStorage.clear();
  }
}
