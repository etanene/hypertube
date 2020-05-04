import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  const { cls } = props;
  const linkCss = cn('Link');
  const logoCss = cn('Logo');

  return (
    <div className={cls}>
      <Link className={logoCss('Link', [linkCss()])} to="/">
        Hypertube
      </Link>
    </div>
  );
};

export default Logo;
