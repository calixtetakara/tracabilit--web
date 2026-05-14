export const STORAGE_KEYS = {
  USERS: 'cc_users',
  LOTS: 'cc_lots',
};

export const getUsers = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
export const setUsers = (users) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

export const getLots = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.LOTS) || '[]');
export const setLots = (lots) => localStorage.setItem(STORAGE_KEYS.LOTS, JSON.stringify(lots));