import React from 'react';
import { cn } from '@bem-react/classname';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import './MovieComments.css';

const MovieComments = ({ title }) => {
  const movieCommentsCss = cn('MovieComments');
  return (
    <div className={movieCommentsCss()}>
      <AddComment title={title} />
      <CommentList />
    </div>
  );
};

export default MovieComments;
