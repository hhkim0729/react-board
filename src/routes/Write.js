import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import useInputs from '../useInputs';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDay()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Write = memo(({ addListItem, id, history }) => {
  const item = {};
  const [state, onChangeInput] = useInputs({ title: '', content: '' });
  const { title, content } = state;
  const inputTitle = useRef(null);
  const inputContent = useRef(null);

  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!title) {
      alert('제목을 입력해주세요.');
      inputTitle.current.focus();
    } else if (!content) {
      alert('내용을 입력해주세요.');
      inputContent.current.focus();
    } else {
      item.id = id;
      item.title = title;
      item.content = content;
      item.date = formatDate(new Date());
      item.views = 0;
      addListItem(item);
    }
    history.push({
      pathname: `/detail/${item.id}`,
      state: {
        item,
      },
    });
  };

  return (
    <div>
      <h1>write</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputTitle}
          placeholder="title"
          name="title"
          value={title}
          onChange={onChangeInput}
        />
        <textarea
          ref={inputContent}
          placeholder="content"
          name="content"
          value={content}
          onChange={onChangeInput}
        />
        <button type="submit">submit</button>
        <Link to="/">cancel</Link>
      </form>
    </div>
  );
});

export default Write;
