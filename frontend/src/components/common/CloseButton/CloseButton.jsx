import React from 'react';
import { cn } from '@bem-react/classname';

import './CloseButton.css';

const closebuttonCss = cn('close-button');

function CloseButton(props) {
  const {
    className,

    onClick = () => {},
  } = props;

  return (
    <button
      onClick={onClick}
      aria-label="x"
      className={closebuttonCss({}, [className])}
    />
  );
}

export default CloseButton;
