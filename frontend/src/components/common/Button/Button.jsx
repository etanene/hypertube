import React from 'react';
import { cn } from '@bem-react/classname';

import './Button.css';

const buttonCss = cn('Button');

function Button(props) {
  const {
    type = 'button',
    children,
    className,

    onClick = () => {},
  } = props;

  return (
    <button
      type={type}
      className={buttonCss(null, [className])}

      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
