import React, {Component} from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';

import './TopMovies.css';
import PosterFilme from './PosterFilme';

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
          <PosterFilme movie={movie} genres={this.state.genres} />
        </Link>
        ) )
        }
      </section>
    );
  }
}

export default TopMovies;