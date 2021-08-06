import React from 'react';
import { Link } from 'react-router-dom';

const Detail = ({ deleteListItem, location, history }) => {
  const { item } = location.state;
  const { id, title, content, date, views } = item;

  const onClickDelete = () => {
    deleteListItem(id);
    history.push('/');
  };

  return (
    <div>
      {item ? (
        <div>
          <h1>view</h1>
          <div>{title}</div>
          <div>
            {date} {views}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
          <Link
            to={{
              pathname: `/update/${id}`,
              state: { item },
            }}
          >
            수정
          </Link>
          <button onClick={onClickDelete}>삭제</button>
          <Link to="/">목록</Link>
        </div>
      ) : (
        <div>error</div>
      )}
    </div>
  );
};

export default Detail;
