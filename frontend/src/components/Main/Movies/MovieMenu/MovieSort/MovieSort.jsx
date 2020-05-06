import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import './MovieSort.css';
import MovieSearchContext from '../../../../../context/movieSearchContext';

const MovieSort = (props) => {
  const { cls } = props;
  const { t } = useTranslation();
  const iconCss = cn('material-icons');
  const movieSortCss = cn('MovieSort');
  const sortByParams = t('main.menu.movieSort', { returnObjects: true });
  const [sortByIndex, setSortByIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const { dispatch } = useContext(MovieSearchContext);

  const handleShowList = () => {
    setVisible((prevVisible) => !prevVisible);
  };
  return (
    <ul className={cls('MovieSort', [movieSortCss()])}>
      <li key={sortByIndex}>
        <div
          role="button"
          tabIndex={sortByIndex}
          className={movieSortCss('Item')}
          onClick={handleShowList}
          onKeyDown={(e) => {
            if (e.code === 'KeyS') {
              handleShowList();
            }
          }}
        >
          <span className={movieSortCss('SortBy')}>{sortByParams[sortByIndex].name}</span>
          <i className={iconCss({}, [movieSortCss('Icon')])}>
            {visible ? 'arrow_drop_up' : 'arrow_drop_down'}
          </i>
        </div>
      </li>
      {visible && sortByParams
        .map((sortByParam, index) => (
          index !== sortByIndex && (
          <li key={sortByParam.name}>
            <div
              role="button"
              tabIndex={index}
              className={movieSortCss('Item')}
              onClick={() => {
                setSortByIndex(index);
                dispatch({ type: 'ADD_QUERY', query: { sort_by: sortByParam.type } });
                setVisible(false);
              }}
              onKeyDown={(e) => {
                if (e.code === 'KeyT') {
                  setSortByIndex(index);
                  dispatch({ type: 'ADD_QUERY', query: { sort_by: sortByParam.type } });
                  setVisible(false);
                }
              }}
            >
              <span className={movieSortCss('SortBy')}>{sortByParam.name}</span>
            </div>
          </li>
          )
        ))}
    </ul>
  );
};

export default MovieSort;
