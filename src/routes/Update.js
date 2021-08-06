import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { getLocalItem, UPDATE_ITEM, CHANGE_MENU } from '../Board';
import useInputs from '../useInputs';

const Update = memo(({ dispatch, match, history }) => {
  const item = getLocalItem(parseInt(match.params.id));
  const [state, onChangeInput] = useInputs({
    title: item ? item.title : '',
    content: item ? item.content : '',
  });
  const { title, content } = state;
  const inputTitle = useRef(null);
  const inputContent = useRef(null);

  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: 'Update' });
    if (inputTitle.current) {
      inputTitle.current.focus();
    }
  }, [dispatch]);

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
      dispatch({ type: UPDATE_ITEM, item });
    }
    history.push(`/detail/${item.id}`);
  };

  return (
    <div>
      {item ? (
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
      ) : (
        <div>
          not found <Link to="/">list</Link>
        </div>
      )}
    </div>
  );
});

export default Update;
