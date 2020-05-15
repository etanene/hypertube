import React from 'react';
import { cn } from '@bem-react/classname';
import { Link, useLocation } from 'react-router-dom';

import './NavLink.css';

const navLinkCss = cn('nav-link');

function NavLink(props) {
  const {
    to = '#',
    children,
    className,
  } = props;

  const location = useLocation();
  const isActive = location.pathname === to;
  const cls = isActive ? 'active' : '';

  return (
    <Link
      to={to}
      className={navLinkCss({ cls }, [className])}
    >
      {children}
    </Link>
  );
}

export default NavLink;
