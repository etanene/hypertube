import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import './GenreSearch.css';
import MovieSearchContext from '../../../../../context/movieSearchContext';
import GenresContext from '../../../../../context/genresContext';

const GenreSearch = (props) => {
  const { cls } = props;
  const {
    visible,
    setVisible,
    genreIndex,
    setGenreIndex,
  } = useContext(GenresContext);
  const { dispatch } = useContext(MovieSearchContext);
  const { t } = useTranslation();
  const genres = t('main.menu.genres', { returnObjects: true });
  const showGenreCss = cn('ShowGenre');
  const iconCss = cn('material-icons');

  const handleShowGenres = () => {
    setVisible((prevVisible) => !prevVisible);
  };
  const handleRemoveGenre = () => {
    dispatch({ type: 'ADD_QUERY', query: { genre: '' } });
    setGenreIndex(null);
  };

  return (
    <div
      className={cls('ShowGenre', [showGenreCss()])}
      onClick={handleShowGenres}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === 'KeyG') {
          handleShowGenres();
        }
      }}
    >
      {genreIndex !== null
        ? (
          <span className={showGenreCss('Text')}>
            {genres[genreIndex].name}
            <i
              role="button"
              tabIndex={0}
              className={iconCss({}, [showGenreCss('RemoveGenreIcon')])}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveGenre();
              }}
              onKeyDown={(e) => {
                if (e.code === 'KeyC') {
                  e.stopPropagation();
                  handleRemoveGenre();
                }
              }}
            >
              clear
            </i>
          </span>
        )
        : <span className={showGenreCss('Text')}>{t('main.menu.genreSearch')}</span>}
      <i className={iconCss({}, [showGenreCss('Icon')])}>
        {visible ? 'arrow_drop_up' : 'arrow_drop_down'}
      </i>
    </div>
  );
};

export default GenreSearch;
