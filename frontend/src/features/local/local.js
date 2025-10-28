

export const setUserToLocal = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const getuserFromLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}


export const clearLocal = () => {
  localStorage.clear();
}

export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}

export const getCartsFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts ? JSON.parse(carts) : [];
}


export const removeCartsFromLocal = () => {
  localStorage.removeItem('carts');
}