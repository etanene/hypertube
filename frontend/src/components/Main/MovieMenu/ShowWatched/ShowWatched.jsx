import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import './ShowWatched.css';
import { useTranslation } from 'react-i18next';

const ShowWatched = (props) => {
  const { cls } = props;
  const checkboxCss = cn('Checkbox');
  const showWatchedCss = cn('ShowWatched');
  const iconCss = cn('material-icons');
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const handleCheckShowWatched = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className={cls('ShowWatched', [showWatchedCss()])}>
      <span className={showWatchedCss('Text')}>{t('main.menu.showWatched')}</span>
      <span
        role="button"
        tabIndex={0}
        className={showWatchedCss('Checkbox', [checkboxCss()])}
        onClick={handleCheckShowWatched}
        onKeyDown={(e) => {
          if (e.code === 'KeyW') {
            handleCheckShowWatched();
          }
        }}
      >
        {checked && (
          <i className={iconCss({}, [showWatchedCss('Icon')])}>
            done
          </i>
        )}
      </span>
    </div>
  );
};

export default ShowWatched;
