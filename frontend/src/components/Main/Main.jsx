import React, { useEffect } from 'react';
import { cn } from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';

import filmsAction from '../../redux/films/action';

import Button from '../common/Button';
import './Main.css';

const mainCss = cn('main');

function Main(props) {
  const { className } = props;

  const dispatch = useDispatch();
  const films = useSelector((state) => state.films);

  console.log('films', films);

  useEffect(() => {
    dispatch(filmsAction.getFilms());
  }, []);

  return (
    <div className={mainCss(null, [className])}>
      main
      <Button>privet</Button>
    </div>
  );
}

export default Main;
