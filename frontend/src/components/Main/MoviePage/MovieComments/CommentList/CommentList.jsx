import React from 'react';
import { cn } from '@bem-react/classname';

const CommentList = () => {
  const commentListCss = cn('CommentList');
  return (
    <div className={commentListCss()}>
      Comment list
    </div>
  );
};

export default CommentList;
