import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Genre from './Genre/Genre';
import './GenreList.css';
import GenresContext from '../../../../context/genresContext';

const GenreList = (props) => {
  const { cls } = props;
  const { visible } = useContext(GenresContext);
  const { t } = useTranslation();
  const genres = t('main.menu.genres', { returnObjects: true });

  return (
    visible
    && (
      <ul className={cls()}>
        {genres.map((genre, index) => (
          <li
            className={cls('Item')}
            key={genre.name}
          >
            <Genre genre={genre} index={index} />
          </li>
        ))}
      </ul>
    )
  );
};

export default GenreList;
