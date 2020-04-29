import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import './GenreSearch.css';
import GenresContext from '../../../../context/genresContext';
import MoviesContext from '../../../../context/moviesContext';

const GenreSearch = (props) => {
  const { cls } = props;
  const {
    visible,
    setVisible,
    genre,
    setGenre,
  } = useContext(GenresContext);
  const { dispatch } = useContext(MoviesContext);
  const { t } = useTranslation();
  const showGenreCss = cn('ShowGenre');
  const iconCss = cn('material-icons');

  const handleShowGenres = () => {
    setVisible((prevVisible) => !prevVisible);
  };
  const handleRemoveGenre = () => {
    dispatch({ type: 'ADD_QUERY', query: { genre: '' } });
    setGenre('');
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
      {genre
        ? (
          <span className={showGenreCss('Text')}>
            {genre}
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
      <i
        className={iconCss({}, [showGenreCss('Icon')])}
      >
        {visible ? 'arrow_drop_up' : 'arrow_drop_down'}
      </i>
    </div>
  );
};

export default GenreSearch;
