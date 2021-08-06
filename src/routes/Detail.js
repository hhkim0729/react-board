import React, { useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { getLocalItem, DELETE_ITEM, CHANGE_MENU } from '../Board';

const Detail = memo(({ dispatch, match, history }) => {
  const item = getLocalItem(parseInt(match.params.id));

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Detail' });
  }, [dispatch]);

  const onClickDelete = useCallback(() => {
    if (item) {
      dispatch({ type: DELETE_ITEM, item: item.id });
      history.push('/');
    }
  }, [dispatch, history, item]);

  return (
    <div>
      {item ? (
        <div>
          <div>{item.title}</div>
          <div>
            {item.date} {item.views}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{item.content}</div>
          <Link to={`/update/${item.id}`}>수정</Link>
          <button onClick={onClickDelete}>삭제</button>
          <Link to="/">목록</Link>
        </div>
      ) : (
        <div>
          not found <Link to="/">list</Link>
        </div>
      )}
    </div>
  );
});

export default Detail;
