import React from 'react';
import { cn } from '@bem-react/classname';

const Logo = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const logoCss = cn('Logo');

  return (
    <div className={cls}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className={logoCss('Link', [linkCss()])}>
        Hypertube
      </a>
    </div>
  );
};

export default Logo;
