import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './Logo.css';
import MovieSearchContext from '../../../context/movieSearchContext';

const Logo = (props) => {
  const { cls } = props;
  const { dispatch } = useContext(MovieSearchContext);
  const linkCss = cn('Link');
  const logoCss = cn('Logo');

  return (
    <div
      role="button"
      tabIndex={0}
      className={cls}
      onClick={() => {
        dispatch({ type: 'REPLACE_QUERY', query: { query_term: '' } });
        scroll.scrollToTop();
      }}
      onKeyDown={(e) => {
        if (e.code === 'KeyW') {
          dispatch({ type: 'REPLACE_QUERY', query: { query_term: '' } });
          scroll.scrollToTop();
        }
      }}
    >
      <Link
        className={logoCss('Link', [linkCss()])}
        to="/"
      />
    </div>
  );
};

export default Logo;
