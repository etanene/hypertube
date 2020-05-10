import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import './Comment.css';
import moment from 'moment';

const Comment = ({ comment }) => {
  const commentCss = cn('Comment');
  const { i18n } = useTranslation();
  const date = moment.unix(comment.time).locale(i18n.language).format('D MMMM YYYY HH:mm');
  return (
    <div className={commentCss()}>
      <div>
        <img className={commentCss('Avatar')} src={comment.avatar} alt="user avatar" />
      </div>
      <div className={commentCss('Block')}>
        <div className={commentCss('Info')}>
          <span className={commentCss('Username')}>{comment.username}</span>
          <span className={commentCss('Timestamp')}>{date}</span>
        </div>
        <span className={commentCss('Text')}>{comment.comment}</span>
      </div>
    </div>
  );
};

export default Comment;
