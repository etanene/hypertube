import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './Logo.css';

const Logo = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const logoCss = cn('Logo');

  return (
    <div
      role="button"
      tabIndex={0}
      className={cls}
      onClick={() => {
        scroll.scrollToTop();
      }}
      onKeyDown={(e) => {
        if (e.code === 'KeyW') {
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
