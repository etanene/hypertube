import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ReplyComment from './ReplyComment/ReplyComment';
import HideTreeButton from './HideTreeButton/HideTreeButton';
import './Comment.css';

const Comment = ({ comment, hidden = false }) => {
  const commentCss = cn('Comment');
  const { i18n, t } = useTranslation();
  const date = moment(comment.created_at).locale(i18n.language).format('D MMMM YYYY HH:mm');
  const [hiddenReplyField, setHiddenReplyField] = useState(true);
  const [hiddenTree, setHiddenTree] = useState(false);
  const changeHiddenReply = () => setHiddenReplyField((hiddenField) => !hiddenField);
  const changeHiddenTree = () => setHiddenTree((hiddenTreeState) => !hiddenTreeState);
  return (
    <div className={commentCss('Box')}>
      {!hidden && (
        <div className={commentCss()}>
          <div className={commentCss('Header')}>
            <img className={commentCss('Avatar')} src={comment.photo} alt="user avatar" />
            <div className={commentCss('UserInfo')}>
              <span className={commentCss('Username')}>
                {comment.login}
              </span>
              <span className={commentCss('Timestamp')}>{date}</span>
            </div>
          </div>
          <div className={commentCss('Block')}>
            <span className={commentCss('Text')}>{comment.text}</span>
          </div>
          <button className={commentCss('ReplyButton')} onClick={changeHiddenReply}>
            {hiddenReplyField ? t('movie.movieComments.replyComment') : t('movie.movieComments.hideForm')}
          </button>
          {!hiddenReplyField && (
            <ReplyComment
              setHidden={setHiddenReplyField}
              cls={commentCss}
              parentId={comment.id}
            />
          )}
          {comment.children[0] && (
            <button className={commentCss('ReplyButton')} onClick={changeHiddenTree}>
              {hiddenTree ? `${t('movie.movieComments.showBranch')} (${comment.children.length})` : `${t('movie.movieComments.hideBranch')}`}
            </button>
          )}
          {!hiddenTree && comment.children[0] && (
            <div className={commentCss('TreeBox')}>
              <HideTreeButton cls={commentCss} hideTree={setHiddenTree} />
              <div className={commentCss('Tree')}>
                {comment.children.map((childComment) => (
                  <Comment comment={childComment} key={childComment.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
