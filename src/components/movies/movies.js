/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import DeskriptionMovies from './descriptionMovie/description-movie';

import './movies.css';

function Movies({ movieData, loading, error, anError, onPostRate, genres }) {
  const moviesAll = movieData.map((item) => {
    const releaseDate = item.release_date === '' ? 'No release date' : item.release_date;
    return (
      <DeskriptionMovies
        {...item}
        loading={loading}
        error={error}
        genres={genres}
        key={item.id}
        anError={anError}
        onPostRate={onPostRate}
        image={item.poster_path}
        title={item.original_title}
        rating={item.rating}
        releaseDate={releaseDate}
        overview={item.overview}
        voteAverage={item.vote_average}
        genreIds={item.genre_ids}
      />
    );
  });

  function NoResults() {
    return <div className="results-wrapper">No results</div>;
  }
  const noContentMessege = moviesAll.length === 0 && !loading && !error ? <NoResults /> : null;

  return (
    <div className="movies">
      {moviesAll}
      {noContentMessege}
    </div>
  );
}

Movies.propTypes = {
  movieData: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  anError: PropTypes.func.isRequired,
  onPostRate: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
