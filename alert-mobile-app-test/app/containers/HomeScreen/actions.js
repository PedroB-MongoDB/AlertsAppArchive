/*
 *
 * HomeScreen actions
 *
 */

export function loginUser(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function realmConnection(realmUser) {
  return {
    type: 'REALM_CONNECTION_REQUEST',
    payload: { realmUser },
  };
}
