import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import api from '../services/api';
import './Movie.css';
import Pixel from '../assets/pixel.png';
import SemPoster from '../assets/sem-poster.png';

class Movie extends Component{
    state = {
        movie:{},
        movieId:0,
    };

    async componentDidMount(){
        const id = this.props.match.params.movieId;
        this.setState({movieId: id})
        
        const response = await api.get(`movie/${id}`);
    
        this.setState({
          movie: response.data,
        });
    }
    getHoras = min => {
        let h = Math.floor(min / 60);
        let m = min % 60;
        m = m < 10 ? "0" + m : m;
        return `${h}h ${m}m`;
    };
    render(){
        const movieD = this.state.movie;
        if(!movieD || movieD.id !== Number(this.state.movieId) ){
            return <span className="sem-dados">SEM DADOS. :(</span>
        }
        let backdropCover = movieD.backdrop_path;
        backdropCover = backdropCover ?
            `url(https://image.tmdb.org/t/p/w1280${movieD.backdrop_path})` 
            : `url('${Pixel}')`;
        
        return (
            <div id="movie-cover" 
                style={{
                    backgroundImage: backdropCover, 
                    backgroundSize: "cover"}}>
                
                <section id="movie-data">
                    <div id="movie-title">
                        <div>
                            <div className="movie-title-data">
                                <p>
                                    <span className="movie-title">{movieD.title}</span>
                                    <span className="movie-title-original">
                                        {
                                        movieD.original_title !== movieD.title ?
                                            `(${movieD.original_title})` : ''                                     
                                        }
                                    </span>
                                </p>
                            </div>
                            <strong className="movie-tag-line">{movieD.tagline}</strong>
                        </div>
                        <span className="movie-score">{movieD.vote_average}</span>
                    </div>
                    <div id="movie-info">
                        <div className="movie-info-data">
                            <div>
                                <p className="movie-description">{movieD.overview}</p>
                                                            
                                <div className="movie-genres">
                                    {
                                        (movieD.genres||[]).map(g => (
                                            <span key={g.id}>{g.name}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <img 
                                src={
                                    movieD.poster_path ?
                                    `https://image.tmdb.org/t/p/w300${movieD.poster_path}`
                                    : `${SemPoster}`
                                }
                                alt={`Capa do filme ${movieD.title}`} />
                        </div>
                        <div className="movie-info-release">
                            <span className="movie-runtime">Duração:{this.getHoras(movieD.runtime)}</span>
                            <span className="movie-release-date">Lançamento:{`${new Date(movieD.release_date).toLocaleDateString()}`}</span>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Movie);
