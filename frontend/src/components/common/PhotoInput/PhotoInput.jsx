import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';

import CloseButton from '../CloseButton';
import Icon from '../Icon';
import { ICONS } from '../../../constants';
import './PhotoInput.css';

const photoInputCss = cn('PhotoInput');

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
    <div className={photoInputCss('Photo')}>
      <CloseButton onClick={handleDelete} className={photoInputCss('CloseButton')} />
      <img name={name} src={file} alt="img" className={photoInputCss('Img')} />
      <input id={photoInputCss('FileInput')} src={file} type="file" name={name} onChange={handleChange} className={photoInputCss('Input')} />
    </div>
  ) : (
    <div className={photoInputCss('Card')}>
      <Icon fill="grey" size="l" viewBox="0 0 315 315" icon={ICONS.ADD} />
      <span>{t('regform.photo.placeholder')}</span>
      <input id={photoInputCss('FileInput')} type="file" name={name} onChange={handleChange} className={photoInputCss('Input')} />
    </div>
  );

  return (
    <div className={photoInputCss({ error: !file && error }, [className])}>
      <label htmlFor={photoInputCss('FileInput')}>
        <div className={photoInputCss('Layer')}>
          {content}
        </div>
      </label>
    </div>
  );
}

export default PhotoInput;
