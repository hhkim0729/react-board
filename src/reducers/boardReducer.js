export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const CHANGE_MENU = 'CHANGE_MENU';

export const boardReducer = (state, action) => {
  switch (action.type) {
    case GET_LOCAL_STORAGE: {
      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      const localId = localStorage.getItem('id');
      const id = localId ? parseInt(localId) : 0;
      return {
        ...state,
        list,
        id,
      };
    }
    case ADD_ITEM: {
      const list = [...state.list, action.item];
      const id = state.id + 1;
      return {
        ...state,
        list,
        id,
      };
    }
    case UPDATE_ITEM: {
      const list = state.list.map((item) =>
        item.id === action.item.id ? action.item : item
      );
      return {
        ...state,
        list,
      };
    }
    case DELETE_ITEM: {
      const list = state.list.filter((item) => item.id !== action.id);
      return {
        ...state,
        list,
      };
    }
    case INCREASE_VIEWS: {
      const list = state.list.map((item) =>
        item.id === action.id ? { ...item, views: item.views + 1 } : item
      );
      return {
        ...state,
        list,
      };
    }
    case CHANGE_MENU: {
      return {
        ...state,
        menu: action.menu,
      };
    }
    default:
      return { ...state };
  }
};
