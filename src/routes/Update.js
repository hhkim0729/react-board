import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import useInputs from '../useInputs';

const Update = memo(({ updaeListItem, history, location }) => {
  const { item } = location.state;
  const [state, onChangeInput] = useInputs({
    title: item.title,
    content: item.content,
  });
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
      item.title = title;
      item.content = content;
      updaeListItem(item);
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
      <h1>update</h1>
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

export default Update;
