import React from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import './AddComment.css';

const AddComment = ({ title }) => {
  const addCommentCss = cn('AddComment');
  const { t } = useTranslation();
  return (
    <div className={addCommentCss()}>
      <span className={addCommentCss('Message')}>{`${t('movie.movieComments.leaveComment')} ${title}!`}</span>
      <br />
      <div className={addCommentCss('TextareaBox')}>
        <textarea className={addCommentCss('Textarea')} name="comment" cols="150" rows="5"> </textarea>
        <button className={addCommentCss('Button')}>{t('movie.movieComments.leaveCommentButton')}</button>
      </div>
    </div>
  );
};

export default AddComment;
