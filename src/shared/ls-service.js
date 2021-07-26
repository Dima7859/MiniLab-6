export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getUserName = () => localStorage.getItem('userName');
export const setUserName = userName => localStorage.setItem('userName', userName);
export const removeUserName = () => localStorage.removeItem('userName');

export const getUserEmail = () => localStorage.getItem('userEmail');
export const setUserEmail = userEmail => localStorage.setItem('userEmail', userEmail);
export const removeUserEmail = () => localStorage.removeItem('userEmail');


export const getUserKey = () => localStorage.getItem('userKey');
export const setUserKey = userKey => localStorage.setItem('userKey', userKey);
export const removeUserKey = () => localStorage.removeItem('userKey');
