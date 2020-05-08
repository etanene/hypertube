import React from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { cn } from '@bem-react/classname';
import './MovieScrollUp.css';

const MovieScrollUp = () => {
  const scrollUpCss = cn('ScrollUp');
  const iconCss = cn('material-icons');
  return (
    <div
      className={scrollUpCss()}
      tabIndex={0}
      role="button"
      onClick={() => {
        scroll.scrollToTop();
      }}
      onKeyDown={(e) => {
        if (e.code === 'KeyW') {
          scroll.scrollToTop();
        }
      }}
    >
      <span className={iconCss({}, ['ScrollUp-Icon'])}>
        double_arrow
      </span>
    </div>
  );
};

export default MovieScrollUp;
