import React from 'react';
import { cn } from '@bem-react/classname';

import './Spinner.css';

const spinnerStyle = cn('spinner');

function Spinner() {
  return (
    <div className={spinnerStyle()} />
  );
}

export default Spinner;
