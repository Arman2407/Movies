import React from 'react';
import PropTypes from 'prop-types';
import ErrorMes from '../../errorMes/errorMes';
import Spinner from '../../spinner/spinner';
import Card from '../card/card';

import './description-movie.css';

function DeskriptionMovies({
  title,
  image,
  releaseDate,
  overview,
  loading,
  error,
  voteAverage,
  onPostRate,
  id,
  genres,
  genreIds,
  rating,
}) {
  const alertError = error ? <ErrorMes /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Card
      title={title}
      image={image}
      releaseDate={releaseDate}
      overview={overview}
      error={error}
      id={id}
      voteAverage={voteAverage}
      genres={genres}
      genreIds={genreIds}
      onPostRate={onPostRate}
      rating={rating}
    />
  ) : null;

  return (
    <div className="card">
      {alertError}
      {spinner}
      {content}
    </div>
  );
}

DeskriptionMovies.defaultProps = {
  error: false,
  id: 0,
  rating: 0,
  image: null,
  releaseDate: '',
};

DeskriptionMovies.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  image: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  id: PropTypes.number,
  voteAverage: PropTypes.number.isRequired,
  onPostRate: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  rating: PropTypes.number,
};

export default DeskriptionMovies;
