export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);

export const getUserName = () => localStorage.getItem('userName');
export const setUserName = userName => localStorage.setItem('userName', userName);

export const getUserEmail = () => localStorage.getItem('userEmail');
export const setUserEmail = userEmail => localStorage.setItem('userEmail', userEmail);

export const getUserKey = () => localStorage.getItem('userKey');
export const setUserKey = userKey => localStorage.setItem('userKey', userKey);

export const getUserUid = () => localStorage.getItem('uid');
export const setUserUid = uid => localStorage.setItem('uid', uid);

export const clearStorage = () => localStorage.clear();
