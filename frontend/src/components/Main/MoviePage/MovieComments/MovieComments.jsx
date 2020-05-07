import React, { useReducer } from 'react';
import { cn } from '@bem-react/classname';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import commentsReducer from '../../../../reducers/comments';
import './MovieComments.css';

const MovieComments = ({ title }) => {
  const comment = {
    username: 'Max',
    time: '1588843759',
    comment: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    avatar: '/image.png',
  };
  const movieCommentsCss = cn('MovieComments');
  const [comments, dispatch] = useReducer(commentsReducer, [comment]);
  return (
    <div className={movieCommentsCss()}>
      <AddComment title={title} dispatch={dispatch} />
      <CommentList comments={comments} cls={movieCommentsCss} />
    </div>
  );
};

export default MovieComments;
