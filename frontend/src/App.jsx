import React from 'react';
import { cn } from '@bem-react/classname';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

const appCss = cn('app');

function App() {
  return (
    <div className={appCss()}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
