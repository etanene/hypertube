import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import MovieSearchContext from '../../../context/movieSearchContext';
import './SearchForm.css';

const SearchForm = (props) => {
  const searchCss = cn('Search');
  const { cls } = props;
  const [search, setSearch] = useState('');
  const { dispatch, setPageNumber } = useContext(MovieSearchContext);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();

  const applySearch = (e) => {
    e.preventDefault();
    setPageNumber(1);
    dispatch({ type: 'ADD_QUERY', query: { query_term: search, order_by: 'asc' } });
    if (pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <div className={searchCss({}, [cls])}>
      <form
        className={searchCss('Form')}
        onSubmit={applySearch}
      >
        <input
          className={searchCss('Input')}
          type="text"
          placeholder={t('header.search')}
          value={search}
          onChange={(e) => {
            if (e.target.value !== '<' && e.target.value !== '>') {
              setSearch(e.target.value);
            }
          }}
        />
        <button
          className={searchCss('Button')}
          type="submit"
        >
          <i className="material-icons">search</i>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
