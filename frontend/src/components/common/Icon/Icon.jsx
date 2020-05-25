import React from 'react';
import { cn } from '@bem-react/classname';

import './Icon.css';

const iconCss = cn('icon');

function Icon(props) {
  const {
    icon = '',
    size = 'm',
    viewBox = '',
    fill = null,
  } = props;

  return (
    <svg viewBox={viewBox} className={iconCss({ size, fill })}>
      <path d={icon} />
    </svg>
  );
}

export default Icon;
