import React, { useState, useContext } from 'react';
import { cn } from '@bem-react/classname';
import superagent from 'superagent';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import MovieSearchContext from '../../../../../context/movieSearchContext';
import { addComment } from '../../../../../reducers/comments';

import './AddComment.css';

const AddComment = ({ title, dispatch, imdbID }) => {
  const addCommentCss = cn('AddComment');
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const { user } = useContext(MovieSearchContext);


  function scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }

  const handleAddComment = async () => {
    try {
      await superagent.post('/api/comment').send({ movieId: imdbID, userId: user.id, text: comment });
      dispatch(addComment({
        username: user.username,
        time: Date.now() / 1000,
        comment,
        avatar: user.photo,
      }));
      setComment('');
      scrollTo();
    } catch (err) {
      console.log('err', err);
    }
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
        <button disabled={comment === ''} onClick={handleAddComment} className={addCommentCss('Button')}>{t('movie.movieComments.leaveCommentButton')}</button>
      </div>
    </div>
  );
};

export default AddComment;
