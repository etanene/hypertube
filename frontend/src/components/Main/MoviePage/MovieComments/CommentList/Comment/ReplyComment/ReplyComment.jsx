import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import './ReplyComment.css';

const ReplyComment = ({ cls, dispatch }) => {
  const [comment, setComment] = useState('');
  const commentCss = cn('ReplyComment');
  const addComment = () => {
    dispatch({
      type: 'ADD_COMMENT',
      comment: {
        username: 'Maxik',
        time: Date.now() / 1000,
        comment,
        avatar: '/image.png',
      },
    });
    setComment('');
  };
  return (
    <div className={cls('ReplyComment')}>
      <textarea
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
