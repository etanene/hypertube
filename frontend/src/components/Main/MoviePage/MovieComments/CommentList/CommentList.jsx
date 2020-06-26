import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import Comment from './Comment/Comment';
import CommentsContext from '../../../../../context/commentsContext';
import getTreeFromArray from '../../../../../lib/getTreeFromArray';
import './CommentList.css';

const CommentList = ({ cls }) => {
  const { t } = useTranslation();
  const { comments } = useContext(CommentsContext);
  const commentListCss = cn('CommentList');
  const tree = getTreeFromArray(comments);
  return (
    <div className={cls('CommentList')}>
      <span name="scroll-to-element" className={commentListCss('CommentNumber')}>
        {`${t('movie.movieComments.comments')} (${comments.length})`}
      </span>
      {tree.map((rootComment) => (
        <Comment comment={rootComment} key={rootComment.id} isRoot />
      ))}
    </div>
  );
};

export default CommentList;
