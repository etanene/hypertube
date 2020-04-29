import React, { useContext } from 'react';
import { cn } from '@bem-react/classname';
import MoviesContext from '../../../../../context/moviesContext';
import GenresContext from '../../../../../context/genresContext';

const Genre = (props) => {
  const { genre } = props;
  const { type, name } = genre;
  const { dispatch } = useContext(MoviesContext);
  const { setVisible, setGenre } = useContext(GenresContext);
  const genreCss = cn('Genre');
  const handleChooseGenre = () => {
    dispatch({ type: 'ADD_QUERY', query: { genre: type } });
    setGenre(genre.name);
    setVisible(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={genreCss()}
      onClick={handleChooseGenre}
      onKeyDown={(e) => {
        if (e.code === 'KeyE') {
          handleChooseGenre();
        }
      }}
    >
      <img src="/sci-fi.png" alt="Genre poster" className={genreCss('Image')} />
      <span className={genreCss('Title')}>{name}</span>
    </div>
  );
};

export default Genre;
