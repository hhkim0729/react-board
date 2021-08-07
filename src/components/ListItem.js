import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { INCREASE_VIEWS } from '../reducers/boardReducer';
import './ListItem.css';

const ListItem = memo(({ item, dispatch }) => {
  const { id, title, date, views } = item;

  const onClickItem = useCallback(
    (id) => () => {
      dispatch({ type: INCREASE_VIEWS, id });
    },
    [dispatch]
  );

  return (
    <div className="ListItem">
      <div className="title">
        <Link onClick={onClickItem(id)} to={`/detail/${id}`}>
          {title}
        </Link>
      </div>
      <div className="date">{date}</div>
      <div className="views">{views}</div>
    </div>
  );
});

export default ListItem;
