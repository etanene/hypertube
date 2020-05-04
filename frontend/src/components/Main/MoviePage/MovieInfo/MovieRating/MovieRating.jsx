import React from 'react';
import { cn } from '@bem-react/classname';
import './MovieRating.css';

const MovieRating = ({ rating }) => {
  const percentage = parseFloat(rating) * 10;
  const mainCircleStrokeStyle = { strokeDashoffset: 440 - (440 * percentage) / 100 };
  const ratingBoxCss = cn('RatingBox');
  const circleBoxCss = cn('CircleBox');
  return (
    <div className={ratingBoxCss()}>
      <div className={ratingBoxCss('Percent')}>
        <svg className={circleBoxCss()}>
          <circle
            className={circleBoxCss('Circle', ['BackgroundCircle'])}
            cx={70}
            cy={70}
            r={70}
          />
          <circle
            style={mainCircleStrokeStyle}
            className={circleBoxCss('Circle', ['MainCircle'])}
            cx={70}
            cy={70}
            r={70}
          />
        </svg>
        <div className={ratingBoxCss('NumberBox')}>
          <h3 className="Number">
            {rating}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieRating;
