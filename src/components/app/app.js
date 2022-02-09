import React, { Component } from 'react';
import { debounce } from 'lodash';
import Movies from '../movies/movies';
import MovieDBService from '../../services/MovieDBService';
import Spinner from '../spinner/spinner';
import HeaderSearch from '../header/header';
import SearchMovie from '../searchMovie/searchMovie';
import ErrorMes from '../errorMes/errorMes';
import Paginations from '../paginations/paginations';

import './app.css';

export default class App extends Component {
  MovieDBService = new MovieDBService();

  state = {
    movieData: [],
    genres: [],
    loading: true,
    error: false,
    pages: 1,
    totalPages: 1,
    rateButton: false,
    sessionId: 1,
  };

  debouncedSearch = debounce((event) => {
    const target = event.target.value;

    this.MovieDBService.getMovieSearch(target)
      .then((elem) => {
        this.setState({
          movieData: [...elem.results],
          loading: false,
          rateButton: false,
          pages: 1,
          totalPages: elem.total_pages * 10,
        });
      })
      .catch(this.anError);
  }, 500);

  componentDidMount() {
    this.updateMovie();
    this.onMovieGenre();
    this.guestSessionNew();
  }

  anError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  changePagination = (page) => {
    this.MovieDBService.getPage(page)
      .then((response) => {
        this.setState({
          movieData: [...response.results],
          loading: false,
          pages: page,
        });
      })
      .catch(this.anError);
  };

  guestSessionNew = () => {
    this.MovieDBService.getGuestSessionNew()
      .then((res) => {
        this.setState({
          sessionId: res,
          loading: false,
        });
      })
      .catch(this.anError);
  };

  updateCard = () => {
    const { sessionId } = this.state;

    this.MovieDBService.getGuestMovieSearch(sessionId)
      .then((res) => {
        this.setState({
          movieData: [...res.results],
          loading: false,
          rateButton: true,
          pages: 1,
          totalPages: res.total_pages,
        });
      })
      .catch(this.anError);
  };

  updateMovieCard = () => {
    this.MovieDBService.getMovieSearch()
      .then((elem) => {
        this.setState({
          movieData: [...elem.results],
          loading: false,
          rateButton: false,
          totalPages: elem.total_pages * 10,
        });
      })
      .catch(this.anError);
  };

  onPostRate = (event, id) => {
    const { sessionId } = this.state;
    this.MovieDBService.postRate(event, id, sessionId).catch(this.anError);
  };

  onMovieGenre = () => {
    this.MovieDBService.getGenres()
      .then((elem) => {
        this.setState({
          genres: [...elem],
        });
      })
      .catch(this.anError);
  };

  updateMovie() {
    this.MovieDBService.getMovieSearch()
      .then((elem) => {
        this.setState({
          movieData: [...elem.results],
          loading: false,
          rateButton: false,
          totalPages: elem.total_pages * 10,
        });
      })
      .catch(this.anError);
  }

  render() {
    const { movieData, loading, error, totalPages, rateButton, pages, genres } = this.state;

    const searchInput = !rateButton ? <SearchMovie debouncedSearch={this.debouncedSearch} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorAlert = error ? <ErrorMes /> : null;

    if (loading) {
      return <Spinner />;
    }
    return (
      <div className="app">
        <HeaderSearch updateMovieCard={this.updateMovieCard} updateCard={this.updateCard} />
        {searchInput}
        {errorAlert}
        {spinner}
        <Movies
          movieData={movieData}
          loading={loading}
          error={error}
          anError={this.anError}
          onPostRate={this.onPostRate}
          genres={genres}
        />
        <Paginations
          movieData={movieData}
          pages={pages}
          totalPages={totalPages}
          onChangePagination={this.changePagination}
        />
      </div>
    );
  }
}
