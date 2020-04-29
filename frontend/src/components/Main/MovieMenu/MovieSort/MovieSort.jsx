import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import './MovieSort.css';
import MoviesContext from '../../../../context/moviesContext';

const MovieSort = (props) => {
  const { cls } = props;
  const { t } = useTranslation();
  const iconCss = cn('material-icons');
  const movieSortCss = cn('MovieSort');
  const sortByParams = t('main.menu.movieSort', { returnObjects: true });

  const [sortBy, setSortBy] = useState(sortByParams[0].name);
  const [visible, setVisible] = useState(false);
  const { dispatch } = useContext(MoviesContext);

  const handleShowList = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
  }, [sortByParams]);

  return (
    <ul className={cls('MovieSort', [movieSortCss()])}>
      <li key={sortBy}>
        <div
          role="button"
          tabIndex={0}
          className={movieSortCss('Item')}
          onClick={handleShowList}
          onKeyDown={(e) => {
            if (e.code === 'KeyS') {
              handleShowList();
            }
          }}
        >
          <span className={movieSortCss('SortBy')}>{sortBy}</span>
          <i className={iconCss({}, [movieSortCss('Icon')])}>
            {visible ? 'arrow_drop_up' : 'arrow_drop_down'}
          </i>
        </div>
      </li>
      {visible && sortByParams
        .filter((sortByParam) => sortByParam.name !== sortBy)
        .map((sortByParam) => (
          <li key={sortByParam.name}>
            <div
              role="button"
              tabIndex={0}
              className={movieSortCss('Item')}
              onClick={() => {
                setSortBy(sortByParam.name);
                dispatch({ type: 'ADD_QUERY', query: { sort_by: sortByParam.type } });
                setVisible(false);
              }}
              onKeyDown={(e) => {
                if (e.code === 'KeyT') {
                  setSortBy(sortByParam.name);
                  dispatch({ type: 'ADD_QUERY', query: { sort_by: sortByParam.type } });
                  setVisible(false);
                }
              }}
            >
              <span className={movieSortCss('SortBy')}>{sortByParam.name}</span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MovieSort;
