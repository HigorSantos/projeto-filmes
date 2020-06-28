import React, {Component} from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './TopMovies.css';
import PosterFilme from './PosterFilme';

class Search extends Component{
  state = {
    searchTerms:'',
    movies:[],
    genres:[]
  };
  
  async componentDidMount(){
    const searchTerms = this.props.match.params.searchTerms;
    this.setState({ searchTerms: searchTerms });

    const response = await api.get('search/movie',{
        params: {query: searchTerms} 
      }
    );

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

export default withRouter(Search);