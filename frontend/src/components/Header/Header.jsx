import React from 'react';
import { cn } from '@bem-react/classname';
import SearchForm from './SearchForm/SearchForm';
import Logo from './Logo/Logo';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import Register from './Register/Register';
import Login from './Login/Login';
import './Header.css';

const Header = () => {
  const headerCss = cn('Header');
  const navCss = cn('Nav');

  return (
    <header className={headerCss()}>
      <nav className={headerCss('Nav', [navCss()])}>
        <Logo cls={navCss('Logo')} />
        <SearchForm cls={navCss('Search')} />
        <LangSwitcher cls={navCss('Lang')} />
        <Register cls={navCss('Register')} />
        <Login cls={navCss('Login')} />
      </nav>
    </header>
  );
};

export default Header;
