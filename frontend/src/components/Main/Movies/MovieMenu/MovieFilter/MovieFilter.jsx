import React, { useContext } from 'react';
import Slider from 'rc-slider';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';
import MovieSearchContext from '../../../../../context/movieSearchContext';
import './MovieFilter.css';

const { createSliderWithTooltip } = Slider;
const SliderWithToolTip = createSliderWithTooltip(Slider);

const MovieFilter = () => {
  const { dispatch, setPageNumber } = useContext(MovieSearchContext);
  const filterCss = cn('Filter');
  const { t } = useTranslation();
  const onChange = (value) => {
    setPageNumber(1);
    dispatch({ type: 'ADD_QUERY', query: { minimum_rating: value } });
  };
  return (
    <div className={filterCss('Box')}>
      <span className={filterCss('Title')}>{t('main.menu.ratingFilter')}</span>
      <SliderWithToolTip
        defaultValue={0}
        min={0}
        max={10}
        marks={{ 0: '0', 10: '10' }}
        trackStyle={[{ backgroundColor: '#343434', height: '7px' }]}
        handleStyle={[{ borderColor: '#551A8B' }, { borderColor: '#551A8B' }]}
        railStyle={{ backgroundColor: '#551A8B', height: '7px' }}
        onAfterChange={onChange}
      />
    </div>
  );
};

export default MovieFilter;
