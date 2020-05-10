import React from 'react';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';

import './Header.css';
import Button from '../common/Button';

const headerCss = cn('header');
const buttonCss = headerCss('button');

function Header(props) {
  const { className } = props;

  return (
    <header className={headerCss(null, [className])}>
      header
      <Link to="/signup">
        <Button className={buttonCss}>Sign up</Button>
      </Link>
    </header>
  );
}

export default Header;
