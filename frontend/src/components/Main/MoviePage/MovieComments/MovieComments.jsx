import React, { useReducer, useEffect } from 'react';
import { cn } from '@bem-react/classname';
import superagent from 'superagent';
import CommentList from './CommentList/CommentList';
import AddComment from './AddComment/AddComment';
import commentsReducer, { setComments } from '../../../../reducers/comments';
import './MovieComments.css';

const MovieComments = ({ title, imdbID }) => {
  const movieCommentsCss = cn('MovieComments');
  const [comments, dispatch] = useReducer(commentsReducer, []);

  useEffect(() => {
    async function getComments() {
      const response = await superagent.get('/api/comment').query({ movieId: imdbID });
      console.log('response', response);
      const newComments = response.body.map((item) => ({
        username: item.user.username,
        avatar: `/api/public/photo/${item.user.photo}`,
        comment: item.text,
        time: new Date(item.createdAt),
      }));
      dispatch(setComments(newComments));
    }
    getComments();
  }, []);

  return (
    <div className={movieCommentsCss()}>
      <AddComment title={title} dispatch={dispatch} imdbID={imdbID} />
      <CommentList comments={comments} cls={movieCommentsCss} />
    </div>
  );
};

export default MovieComments;
