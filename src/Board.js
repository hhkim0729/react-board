import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import List from './routes/List';
import Write from './routes/Write';
import Update from './routes/Update';
import Detail from './routes/Detail';

const Board = () => {
  const [list, setList] = useState([]);
  const id = useRef(0);
  const isMount = useRef(true);

  useEffect(() => {
    if (!isMount.current) {
      localStorage.setItem('list', JSON.stringify(list));
      localStorage.setItem('id', id.current);
    }
  }, [list]);

  useEffect(() => {
    const localList = localStorage.getItem('list');
    if (localList) {
      setList(JSON.parse(localList));
    }
    const localId = localStorage.getItem('id');
    if (localId) {
      id.current = parseInt(localId);
    }
    isMount.current = false;
  }, []);

  const addListItem = useCallback((listItem) => {
    setList((prevList) => {
      return [...prevList, listItem];
    });
    id.current += 1;
  }, []);

  const updaeListItem = useCallback(
    (listItem) => {
      const { id, title, content, date, views } = listItem;
      const index = list.findIndex((item) => item.id === id);
      const newList = [...list];
      newList.splice(index, 1, {
        id,
        title,
        content,
        date,
        views,
      });
      setList(newList);
    },
    [list]
  );

  const deleteListItem = useCallback(
    (id) => {
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
    },
    [list]
  );

  const increaseViews = useCallback(
    (id) => () => {
      const index = list.findIndex((item) => item.id === id);
      const newList = [...list];
      newList[index].views += 1;
      setList(newList);
    },
    [list]
  );

  return (
    <BrowserRouter>
      <Route
        path="/"
        exact={true}
        render={() => <List list={list} increaseViews={increaseViews} />}
      />
      <Route
        path="/write"
        render={(routeProps) => (
          <Write addListItem={addListItem} id={id.current} {...routeProps} />
        )}
      />
      <Route
        path="/update/:id"
        render={(routeProps) => (
          <Update updaeListItem={updaeListItem} {...routeProps} />
        )}
      />
      <Route
        path="/detail/:id"
        render={(routeProps) => (
          <Detail deleteListItem={deleteListItem} {...routeProps} />
        )}
      />
    </BrowserRouter>
  );
};

export default Board;
