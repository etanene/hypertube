import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import Comment from './Comment/Comment';
import './CommentList.css';

const CommentList = ({ comments, cls }) => {
  const { t } = useTranslation();
  const commentListCss = cn('CommentList');
  const compare = (first, second) => (first.time > second.time ? -1 : 1);
  return (
    <div className={cls('CommentList')}>
      <span
        className={commentListCss('CommentNumber')}
      >
        {`${t('movie.movieComments.comments')} (${comments.length})`}
      </span>
      {comments.sort(compare).map((comment) => (
        <Comment comment={comment} key={comment.time} />))}
    </div>
  );
};

export default CommentList;
