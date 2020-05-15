import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import { scroller } from 'react-scroll';
import './AddComment.css';

const AddComment = ({ title, dispatch }) => {
  const addCommentCss = cn('AddComment');
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
    dispatch({
      type: 'ADD_COMMENT',
      comment: {
        username: 'Maxik',
        time: Date.now() / 1000,
        comment,
        avatar: '/image.png',
      },
    });
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
