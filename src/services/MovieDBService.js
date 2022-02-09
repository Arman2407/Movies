export default class MovieDBService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = 'e01284219b73aa9d78d0b9c519bdf523';

  URLSearchParams = `search/movie?api_key=${this.apiKey}&query=`;

  async getRequest(url, post) {
    const res = await fetch(`${this.apiBase}${url}`, post);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`);
    }
    return res.json();
  }

  async getMovieSearch(inputValue, page = 1) {
    this.value = inputValue;
    const res = await this.getRequest(
      `${this.URLSearchParams}&query=${!inputValue ? 'return' : inputValue}&page=${page}`
    );
    return res;
  }

  async getGenres() {
    const genres = await this.getRequest(`genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    return genres.genres;
  }

  async getPage(page) {
    const firstPage = await this.getMovieSearch(this.value, page);
    return firstPage;
  }

  async getGuestSessionNew() {
    const guestSession = await this.getRequest(`authentication/guest_session/new?api_key=${this.apiKey}`);
    return guestSession.guest_session_id;
  }

  async getGuestMovieSearch(id) {
    const res = await this.getRequest(
      `guest_session/${id}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return res;
  }

  async postRate(event, id, sessionId) {
    const rate = await this.getRequest(`movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ value: event }),
      headers: { 'Content-Type': 'application/json' },
    });

    return rate;
  }
}
