import React, { Component } from "react";
import SemPoster from '../assets/sem-poster.png';

export default class PosterFilme extends Component {
    render(){
        const movie = this.props.movie;
        const genres = this.props.genres;
        return(
        <article key={movie.id}>
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
                 genres.filter(genre=>genre.id===id).map(filtrado =>(
                   <span key={filtrado.id}>{filtrado ? filtrado.name : ''}</span>
                 ))
                ))
              
              }</p>
            </div>
          </footer>
        </article>
        )
    }
}