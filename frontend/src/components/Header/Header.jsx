import React from 'react';
import { cn } from '@bem-react/classname';

import './Header.css';

const headerCss = cn('header');

function Header(props) {
  const { className } = props;

  return (
    <header className={headerCss(null, [className])}>
      header
    </header>
  );
}

export default Header;
