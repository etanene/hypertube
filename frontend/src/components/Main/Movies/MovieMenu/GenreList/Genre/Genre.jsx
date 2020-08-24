import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import GenresContext from '../../../../../../context/genresContext';
import MovieSearchContext from '../../../../../../context/movieSearchContext';
import './Genre.css';

const Genre = (props) => {
  const { genre, index } = props;
  const { type, name } = genre;
  const { dispatch, setPageNumber } = useContext(MovieSearchContext);
  const { setVisible, setGenreIndex } = useContext(GenresContext);
  const genreCss = cn('Genre');
  const handleChooseGenre = () => {
    setPageNumber(1);
    dispatch({ type: 'ADD_QUERY', query: { genre: type } });
    setGenreIndex(index);
    setVisible(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={genreCss()}
      onClick={handleChooseGenre}
    >
      <img src={`/genre_images/${type.toLowerCase()}.png`} alt="Genre poster" className={genreCss('Image')} />
      <span className={genreCss('Title')}>{name}</span>
    </div>
  );
};

export default Genre;
