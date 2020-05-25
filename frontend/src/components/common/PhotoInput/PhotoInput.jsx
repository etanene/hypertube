import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

import CloseButton from '../CloseButton';
import Icon from '../Icon';
import { ICONS } from '../../../constants';
import './PhotoInput.css';

const photoInputCss = cn('photo-input');

function PhotoInput(props) {
  const {
    name = '',
    className = null,
    error = false,
    onChange = () => {},
  } = props;

  const [file, setFile] = useState();
  const { t } = useTranslation();


  function handleChange(event) {
    const reader = new FileReader();
    const inputFile = event.target.files[0];

    reader.onloadend = () => {
      setFile(reader.result);
      onChange(name, reader.result);
    };
    reader.readAsDataURL(inputFile);
  }

  function handleDelete() {
    setFile(null);
  }

  const content = file ? (
    <div className={photoInputCss('photo')}>
      <CloseButton onClick={handleDelete} className={photoInputCss('close-button')} />
      <img name={name} src={file} alt="img" className={photoInputCss('img')} />
      <input id={photoInputCss('file-input')} src={file} type="file" name={name} onChange={handleChange} className={photoInputCss('input')} />
    </div>
  ) : (
    <div className={photoInputCss('card')}>
      <Icon fill="grey" size="l" viewBox="0 0 315 315" icon={ICONS.ADD} />
      <span>{t('regform.photo.placeholder')}</span>
      <input id={photoInputCss('file-input')} type="file" name={name} onChange={handleChange} className={photoInputCss('input')} />
    </div>
  );

  return (
    <div className={photoInputCss({ error: !file && error }, [className])}>
      <label htmlFor={photoInputCss('file-input')}>
        <div className={photoInputCss('layer')}>
          {content}
        </div>
      </label>
    </div>
  );
}

export default PhotoInput;
