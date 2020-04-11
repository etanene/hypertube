import React from 'react';
import { cn } from '@bem-react/classname';

import './Footer.css';

const footerCss = cn('footer');

function Footer(props) {
  const { className } = props;

  return (
    <footer className={footerCss(null, [className])}>
      footer
    </footer>
  );
}

export default Footer;
