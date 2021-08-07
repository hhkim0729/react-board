import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { CHANGE_MENU, UPDATE_ITEM } from '../reducers/boardReducer';
import useInputs from '../hooks/useInputs';
import { getLocalItem } from '../utils';
import Error from '../components/Error';
import './form.css';

const Update = memo(({ dispatch, match, history }) => {
  const item = getLocalItem(match.params.id);
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

  const onClickSubmit = () => {
    if (!title) {
      alert('Please enter a title.');
      inputTitle.current.focus();
    } else if (!content) {
      alert('Please enter the content.');
      inputContent.current.focus();
    } else {
      item.title = title;
      item.content = content;
      dispatch({ type: UPDATE_ITEM, item });
      history.push(`/detail/${item.id}`);
    }
  };

  return (
    <>
      {item ? (
        <div className="form">
          <div className="input-box">
            <input
              ref={inputTitle}
              placeholder="title"
              name="title"
              value={title}
              onChange={onChangeInput}
            />
          </div>
          <textarea
            className="textarea"
            ref={inputContent}
            placeholder="content"
            name="content"
            value={content}
            onChange={onChangeInput}
          />
          <div className="btn-box">
            <span onClick={onClickSubmit}>submit</span>
            <Link to="/">cancel</Link>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
});

export default Update;
