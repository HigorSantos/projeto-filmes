import React, {Component} from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';

import './TopMovies.css';
import SemPoster from '../assets/sem-poster.png';

class TopMovies extends Component{
  state = {
    movies:[],
    genres:[]
  };
  async componentDidMount(){
    const response = await api.get('trending/movie/week');

    this.setState({
      movies: response.data.results || [],
    });

    const responseGenres = await api.get('genre/movie/list');
    this.setState({genres: responseGenres.data.genres || []});

  }

  render(){
    return (
 
      <section id="movie-list">
        {
        this.state.movies.map(movie => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
        <article >
          <img 
              src={
                  movie.poster_path ?
                  `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : `${SemPoster}`
              }
              alt={`${movie.title}`}
              className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>{movie.title}</span>
                <span className="movie-director"></span>
              </div>
              <span className="movie-score">{movie.vote_average}</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">{
                movie.genre_ids.map(id => (
                 this.state.genres.filter(genre=>genre.id===id).map(filtrado =>(
                   <span key={filtrado.id}>{filtrado ? filtrado.name : ''}</span>
                 ))
                ))
              
              }</p>
            </div>
          </footer>
        </article>
        </Link>
        ) )
        }
      </section>
    );
  }
}

export default TopMovies;