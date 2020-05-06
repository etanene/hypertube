import React, { useContext, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useTranslation } from 'react-i18next';
import MovieSearchContext from '../../../context/movieSearchContext';

const SearchForm = (props) => {
  const searchCss = cn('Search');
  const { cls } = props;
  const [search, setSearch] = useState('');
  const { dispatch } = useContext(MovieSearchContext);
  const { t } = useTranslation();

  const applySearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'REPLACE_QUERY', query: { query_term: search } });
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
            setSearch(e.target.value);
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
