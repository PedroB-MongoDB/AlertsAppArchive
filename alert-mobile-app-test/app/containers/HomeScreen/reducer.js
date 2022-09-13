import produce from 'immer';

export const initialState = {
  user: null,
  primaryRealm: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return {
          ...state,
        };
      case 'LOGIN_USER':
        draft.user = action.response;
        break;
      case 'REALM_CONNECTION':
        draft.primaryRealm = action.response
        break;
    }
  });

export default homeReducer;
