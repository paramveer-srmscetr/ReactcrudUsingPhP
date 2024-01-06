// authStatus.js
let isAuthenticated = false;

export const setAuthenticationStatus = (status) => {
  isAuthenticated = status;
};

export const getAuthenticationStatus = () => {
  return isAuthenticated;
};

export const logout = () => {
  isAuthenticated = false;
};