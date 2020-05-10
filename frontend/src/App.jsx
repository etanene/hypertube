import React from 'react';
import { cn } from '@bem-react/classname';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import RegForm from './components/RegForm';
import './App.css';

const appCss = cn('app');

function App() {
  return (
    <div className={appCss()}>
      <Header />
      <Switch>
        <Route path="/signup">
          <RegForm />
        </Route>
      </Switch>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
