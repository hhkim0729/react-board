import React, { useReducer, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './routes/List';
import Write from './routes/Write';
import Update from './routes/Update';
import Detail from './routes/Detail';
import { boardReducer, GET_LOCAL_STORAGE } from './reducers/boardReducer';
import './Board.css';

const initialState = {
  list: [],
  id: 0,
  menu: 'List',
};

const Board = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
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
    <div className="Board">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="menu">
          <h1>{menu}</h1>
        </div>
        <div className="btn-write">
          <Link to="/write">write</Link>
        </div>
        <div className="wrap">
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
            render={(routeProps) => (
              <Update dispatch={dispatch} {...routeProps} />
            )}
          />
          <Route
            path="/detail/:id"
            render={(routeProps) => (
              <Detail dispatch={dispatch} {...routeProps} />
            )}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Board;
