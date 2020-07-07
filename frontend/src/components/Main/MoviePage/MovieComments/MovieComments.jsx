import React, { useReducer, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import commentsReducer from '../../../../reducers/comments';
import CommentsContext from '../../../../context/commentsContext';
import useGetComments from '../../../../services/useGetComments';
import './MovieComments.css';

const MovieComments = ({ title, imdbId }) => {
  const { comment } = useGetComments(imdbId);
  const [comments, dispatch] = useReducer(commentsReducer, comment);
  const movieCommentsCss = cn('MovieComments');
  useEffect(() => {
    dispatch({ type: 'LOAD_COMMENTS', comments: comment });
  }, [comment]);
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
