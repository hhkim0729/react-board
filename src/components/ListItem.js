import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ item, increaseViews }) => {
  const { id, title, date, views } = item;

  return (
    <div>
      <div>
        <Link
          onClick={increaseViews(id)}
          to={{
            pathname: `/detail/${id}`,
            state: {
              item,
            },
          }}
        >
          {title}
        </Link>
        {date} {views}
      </div>
    </div>
  );
};

export default ListItem;
