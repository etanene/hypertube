import React from 'react';
import './HideTreeButton.css';

const HideTreeButton = ({ cls, hideTree }) => (
  <div className={cls('HideTreeBox')}>
    <div
      className={cls('HideTree')}
      onClick={() => hideTree(true)}
      role="button"
      tabIndex={0}
    />
  </div>
);

export default HideTreeButton;
