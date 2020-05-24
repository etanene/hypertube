import React from 'react';
import { cn } from '@bem-react/classname';

import './Input.css';

const inputCss = cn('input');

function Input(props) {
  const {
    size = 's',
    type = 'text',
    name,
    placeholder,
    value = '',
    children,
    error,
    className,
    onChange = () => {},
  } = props;

  function handleChange(event) {
    const { name: targetName, value: targetValue } = event.target;

    onChange(targetName, targetValue);
  }

  return (
    <div className={inputCss({}, [className])}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={inputCss('input-tag', { size, error })}
        onChange={handleChange}
      />
      <span className={inputCss('message')}>{error && children}</span>
    </div>
  );
}

export default Input;
