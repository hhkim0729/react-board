import React, { useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import List from './routes/List';
import Write from './routes/Write';
import Update from './routes/Update';
import Detail from './routes/Detail';

const initialState = {
  list: [],
  id: 0,
  menu: 'List',
};

export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const CHANGE_MENU = 'CHANGE_MENU';

const reducer = (state, action) => {
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

export const getLocalItem = (id) => {
  const localList = localStorage.getItem('list');
  const list = localList ? JSON.parse(localList) : [];
  const listItem = list.find((item) => item.id === id);
  return listItem;
};

const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { list, id, menu } = state;
  const isMount = useRef(true);

  useEffect(() => {
    if (!isMount.current) {
      localStorage.setItem('list', JSON.stringify(list));
      localStorage.setItem('id', id);
    }
  }, [id, list]);

  useEffect(() => {
    dispatch({ type: GET_LOCAL_STORAGE });
    isMount.current = false;
  }, []);

  return (
    <BrowserRouter>
      <h1>{menu}</h1>
      <Route
        path="/"
        exact={true}
        render={() => <List list={list} dispatch={dispatch} />}
      />
      <Route
        path="/write"
        render={(routeProps) => (
          <Write id={id} dispatch={dispatch} {...routeProps} />
        )}
      />
      <Route
        path="/update/:id"
        render={(routeProps) => <Update dispatch={dispatch} {...routeProps} />}
      />
      <Route
        path="/detail/:id"
        render={(routeProps) => <Detail dispatch={dispatch} {...routeProps} />}
      />
    </BrowserRouter>
  );
};

export default Board;
