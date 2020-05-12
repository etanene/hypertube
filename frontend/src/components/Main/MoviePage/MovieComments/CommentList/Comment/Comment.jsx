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
    </div>
  );
};

export default Comment;
