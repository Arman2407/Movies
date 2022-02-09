import React from 'react';
import PropTypes from 'prop-types';

import './searchMovie.css';

function SearchMovie({ debouncedSearch }) {
  return (
    <div className="search-wrapper">
      <form>
        <input className="search-input" type="text" placeholder="Type to search..." onChange={debouncedSearch} />
      </form>
    </div>
  );
}

SearchMovie.propTypes = {
  debouncedSearch: PropTypes.func.isRequired,
};

export default SearchMovie;
