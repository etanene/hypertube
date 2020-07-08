import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import './ReplyComment.css';

const ReplyComment = (
  {
    cls,
    dispatch,
    parentId,
    setHidden,
  },
) => {
  const [comment, setComment] = useState('');
  const commentCss = cn('ReplyComment');
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, []);
  const addComment = () => {
    dispatch({
      type: 'ADD_COMMENT',
      comment: {
        login: 'Maxik',
        time: Date.now() / 1000,
        text: comment,
        photo: '/image.png',
        parent_id: parentId,
      },
    });
    setComment('');
    setHidden(true);
  };
  return (
    <div className={cls('ReplyComment')}>
      <textarea
        ref={input}
        className={commentCss('Textarea')}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        name="comment"
      />
      <button
        onClick={addComment}
        disabled={comment === ''}
        className={commentCss('Button')}
      >
        <span className="material-icons">
          arrow_right_alt
        </span>
      </button>
    </div>
  );
};

export default ReplyComment;
