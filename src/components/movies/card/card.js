import React from 'react';
import PropTypes from 'prop-types';
import noImage from '../../../image/noImage.png';
import StarRate from '../../starRate/starRate';

import './card.css';

function Card({ title, image, releaseDate, overview, voteAverage, onPostRate, id, genres, genreIds, rating }) {
  const posterUrl = 'https://image.tmdb.org/t/p/w500';

  const genreFilter = genres.filter((genre) => genreIds.some((elem) => elem === genre.id));

  const genre = genreFilter.map((el) => (
    <button key={Math.floor(Math.random() * 3000)} type="button" className="button-mr">
      {el.name}
    </button>
  ));

  const buttonFake = (
    <button type="button" aria-label="fake">
      No genre
    </button>
  );

  let classNames = 'circle';

  if (voteAverage < 3) {
    classNames += ' color-red';
  }
  if (voteAverage >= 3 && voteAverage < 5) {
    classNames += ' color-orange';
  }
  if (voteAverage >= 5 && voteAverage < 7) {
    classNames += ' color-yellow';
  }
  if (voteAverage >= 7) {
    classNames += ' color-lime';
  }

  return (
    <>
      <div className="card-img">
        <img src={!image ? noImage : posterUrl + image} alt="poster" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <span className="card-title">{title}</span>
          <div className={classNames}>
            <span className="circle-rate">{voteAverage}</span>
          </div>
        </div>
        <div className="card-date">
          <span>{releaseDate}</span>
        </div>
        <div className="card-genre">{genre.length === 0 ? buttonFake : genre}</div>
        <div className="card-text">
          <p>{`${overview.slice(0, 95)}...`}</p>
        </div>
        <div className="star">
          <StarRate onPostRate={onPostRate} id={id} rating={rating} />
        </div>
      </div>
    </>
  );
}

Card.defaultProps = {
  image: null,
  title: null,
};

Card.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  voteAverage: PropTypes.number.isRequired,
  onPostRate: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  rating: PropTypes.number.isRequired,
};

export default Card;
