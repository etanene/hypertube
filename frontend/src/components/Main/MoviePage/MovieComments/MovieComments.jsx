import React, { useReducer, useEffect, useContext } from 'react';
import { cn } from '@bem-react/classname';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import MovieInfoContext from '../../../../context/MovieInfoContext';
import CommentsContext from '../../../../context/commentsContext';
import commentsReducer from '../../../../reducers/comments';
import useGetComments from '../../../../services/useGetComments';
import './MovieComments.css';

const MovieComments = ({ imdbId }) => {
  const { comment } = useGetComments(imdbId);
  const [comments, dispatch] = useReducer(commentsReducer, comment);
  const movieCommentsCss = cn('MovieComments');
  const { YTSInfo, OMDBInfo } = useContext(MovieInfoContext);
  const title = OMDBInfo ? OMDBInfo.Title : YTSInfo.title;
  useEffect(() => {
    dispatch({ type: 'LOAD_COMMENTS', comments: comment });
  }, [comment]);
  return (
    <CommentsContext.Provider value={{ dispatch, comments, imdbId }}>
      <div className={movieCommentsCss()}>
        <AddComment title={title} />
        <CommentList cls={movieCommentsCss} />
      </div>
    </CommentsContext.Provider>
  );
};

export default MovieComments;
