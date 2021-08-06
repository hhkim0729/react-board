import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '../components/ListItem';

const List = ({ list, increaseViews }) => {
  return (
    <div>
      <h1>list</h1>
      <div>제목 날짜 조회수</div>
      {list.map((item) => {
        return (
          <ListItem key={item.id} item={item} increaseViews={increaseViews} />
        );
      })}
      <Link to="/write">write</Link>
    </div>
  );
};

export default List;
