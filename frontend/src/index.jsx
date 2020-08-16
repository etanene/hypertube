import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './services/i18n';
import App from './App';
import './App.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<Loader type="Circles" color="#551A8B" />}>
      <App className="app" />
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root'),
);
