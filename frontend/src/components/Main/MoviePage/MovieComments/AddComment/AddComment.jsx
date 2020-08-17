import React, { useState, useContext } from 'react';
import { cn } from '@bem-react/classname';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import CommentsContext from '../../../../../context/commentsContext';
import AuthContext from '../../../../../context/authContext';
import './AddComment.css';

const superagent = require('superagent');

const AddComment = ({ title }) => {
  const addCommentCss = cn('AddComment');
  const { dispatch, imdbId } = useContext(CommentsContext);
  const { stateAuthReducer } = useContext(AuthContext);
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  function scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }
  const addComment = () => {
    console.log(stateAuthReducer);
    dispatch({
      type: 'ADD_COMMENT',
      comment: {
        user_id: stateAuthReducer.user.userId,
        parent_id: null,
        login: stateAuthReducer.user.username,
        created_at: moment(),
        text: comment,
        photo: stateAuthReducer.user.photo,
      },
    });
    superagent.post('/api/comment/add').send({
      user_id: stateAuthReducer.user.userId,
      text: comment,
      movie_id: imdbId,
      parent_id: null,
    }).catch((e) => console.log(e));
    setComment('');
    scrollTo();
  };
  return (
    <div className={addCommentCss()}>
      <span className={addCommentCss('Message')}>{`${t('movie.movieComments.leaveComment')} ${title}!`}</span>
      <br />
      <div className={addCommentCss('TextareaBox')}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={addCommentCss('Textarea')}
          name="comment"
        />
        <button disabled={comment === ''} onClick={addComment} className={addCommentCss('Button')}>{t('movie.movieComments.leaveCommentButton')}</button>
      </div>
    </div>
  );
};

export default AddComment;
