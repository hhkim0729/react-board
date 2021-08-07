import React, { useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { CHANGE_MENU, DELETE_ITEM } from '../reducers/boardReducer';
import { getLocalItem } from '../utils';
import Error from '../components/Error';
import './Detail.css';

const Detail = memo(({ dispatch, match, history }) => {
  const item = getLocalItem(match.params.id);

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Detail' });
  }, [dispatch]);

  const onClickDelete = useCallback(() => {
    if (item) {
      dispatch({ type: DELETE_ITEM, id: item.id });
      history.push('/');
    }
  }, [dispatch, history, item]);

  return (
    <>
      {item ? (
        <div className="Detail">
          <div className="date">🗓 {item.date}</div>
          <div className="views">👁 {item.views}</div>
          <div className="title">
            <h2>{item.title}</h2>
          </div>
          <div className="content">{item.content}</div>
          <div className="btn-box">
            <Link to={`/update/${item.id}`}>🖋</Link>
            <Link to="/">list</Link>
            <span onClick={onClickDelete}>X</span>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
});

export default Detail;
