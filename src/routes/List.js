import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { CHANGE_MENU } from '../Board';
import ListItem from '../components/ListItem';

const List = memo(({ list, dispatch }) => {
  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'List' });
  }, [dispatch]);

  return (
    <div>
      <div>제목 날짜 조회수</div>
      {list.map((item) => {
        return <ListItem key={item.id} item={item} dispatch={dispatch} />;
      })}
      <Link to="/write">write</Link>
    </div>
  );
});

export default List;
