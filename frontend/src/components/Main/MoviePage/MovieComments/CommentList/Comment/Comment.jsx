import React, { useContext, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ReplyComment from './ReplyComment/ReplyComment';
import HideTreeButton from './HideTreeButton/HideTreeButton';
import CommentsContext from '../../../../../../context/commentsContext';
import './Comment.css';

const Comment = ({ comment, hidden = false }) => {
  const commentCss = cn('Comment');
  const { i18n } = useTranslation();
  const { dispatch } = useContext(CommentsContext);
  const date = moment.unix(comment.time).locale(i18n.language).format('D MMMM YYYY HH:mm');
  const [hiddenReplyField, setHiddenReplyField] = useState(true);
  const [hiddenTree, setHiddenTree] = useState(false);
  const changeHiddenReply = () => setHiddenReplyField((hiddenField) => !hiddenField);
  const changeHiddenTree = () => setHiddenTree((hiddenTreeState) => !hiddenTreeState);
  return (
    <div className={commentCss('Box')}>
      {!hidden && (
        <div className={commentCss()}>
          <div className={commentCss('Header')}>
            <img className={commentCss('Avatar')} src={comment.avatar} alt="user avatar" />
            <div className={commentCss('UserInfo')}>
              <span className={commentCss('Username')}>
                {comment.username}
              </span>
              <span className={commentCss('Timestamp')}>{date}</span>
            </div>
          </div>
          <div className={commentCss('Block')}>
            <span className={commentCss('Text')}>{comment.comment}</span>
          </div>
          <button className={commentCss('ReplyButton')} onClick={changeHiddenReply}>
            {hiddenReplyField ? 'Ответить' : 'Скрыть форму'}
          </button>
          {comment.children[0] && (
            <button className={commentCss('ReplyButton')} onClick={changeHiddenTree}>
              {hiddenTree ? 'Показать' : 'Скрыть ветвь'}
            </button>
          )}
          {!hiddenReplyField && (
            <ReplyComment
              setHidden={setHiddenReplyField}
              cls={commentCss}
              dispatch={dispatch}
              parentId={comment.id}
            />
          )}
          {!hiddenTree && comment.children[0] && (
            <div className={commentCss('TreeBox')}>
              <HideTreeButton cls={commentCss} hideTree={setHiddenTree} />
              <div>
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
