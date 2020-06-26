import React, { useReducer } from 'react';
import { cn } from '@bem-react/classname';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import commentsReducer from '../../../../reducers/comments';
import CommentsContext from '../../../../context/commentsContext';
import './MovieComments.css';

const MovieComments = ({ title }) => {
  const comment = [
    {
      id: 1,
      parentId: null,
      username: 'Max',
      time: '1588843759',
      comment: 'First comment',
      avatar: '/image.png',
    },
    {
      id: 2,
      parentId: 1,
      username: 'David',
      time: '1588843759',
      comment: 'Second comment, child of first',
      avatar: '/image.png',
    },
    {
      id: 3,
      parentId: 2,
      username: 'Mary',
      time: '1588843759',
      comment: 'Third comment, child of second',
      avatar: '/image.png',
    },
    {
      id: 4,
      parentId: 3,
      username: 'Mary',
      time: '1588843759',
      comment: 'Fourth comment, child of third',
      avatar: '/image.png',
    },
    {
      id: 5,
      parentId: 1,
      username: 'Alex',
      time: '1588843759',
      comment: 'Fifth comment, child of first',
      avatar: '/image.png',
    },
    {
      id: 6,
      parentId: null,
      username: 'Jim',
      time: '1588843759',
      comment: 'Sixth comment',
      avatar: '/image.png',
    },
  ];
  const movieCommentsCss = cn('MovieComments');
  const [comments, dispatch] = useReducer(commentsReducer, comment);
  return (
    <CommentsContext.Provider value={{ dispatch, comments }}>
      <div className={movieCommentsCss()}>
        <AddComment title={title} />
        <CommentList cls={movieCommentsCss} />
      </div>
    </CommentsContext.Provider>
  );
};

export default MovieComments;
