import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import './Comment.css';
import moment from 'moment';
import ReplyComment from './ReplyComment/ReplyComment';

const Comment = ({ comment, dispatch }) => {
  const commentCss = cn('Comment');
  const { i18n } = useTranslation();
  const date = moment.unix(comment.time).locale(i18n.language).format('D MMMM YYYY HH:mm');
  const [hiddenReplyField, setHiddenReplyField] = useState(true);
  return (
    <div className={commentCss()}>
      <div className={commentCss('Header')}>
        <img className={commentCss('Avatar')} src={comment.avatar} alt="user avatar" />
        <div className={commentCss('UserInfo')}>
          <span className={commentCss('Username')}>{comment.username}</span>
          <span className={commentCss('Timestamp')}>{date}</span>
        </div>
      </div>
      <div className={commentCss('Block')}>
        <span className={commentCss('Text')}>{comment.comment}</span>
      </div>
      <button
        className={commentCss('ReplyButton')}
        onClick={() => {
          setHiddenReplyField((isHidden) => !isHidden);
        }}
      >
        {hiddenReplyField ? 'Ответить' : 'Скрыть'}
      </button>
      {!hiddenReplyField && <ReplyComment cls={commentCss} dispatch={dispatch} />}
    </div>
  );
};

export default Comment;
