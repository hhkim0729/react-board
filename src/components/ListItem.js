import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { INCREASE_VIEWS } from '../Board';

const ListItem = memo(({ item, dispatch }) => {
  const { id, title, date, views } = item;

  const onClickItem = useCallback(
    (id) => () => {
      dispatch({ type: INCREASE_VIEWS, id });
    },
    [dispatch]
  );

  return (
    <div>
      <div>
        <Link onClick={onClickItem(id)} to={`/detail/${id}`}>
          {title}
        </Link>
        {date} {views}
      </div>
    </div>
  );
});

export default ListItem;
