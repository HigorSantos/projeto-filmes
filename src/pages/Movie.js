import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import api from '../services/api';
import './Movie.css';

class Movie extends Component{
    state = {
        movie:{},
        genres:[],
        movieId:0,
    };

    async componentDidMount(){
        const id = this.props.match.params.movieId;
        this.setState({movieId: id})
        
        const response = await api.get(`movie/${id}?api_key=e188b9dabc206fb3f36d47f212012846&language=pt-BR`);
    
        this.setState({
          movie: response.data,
        });

        const responseGenres = await api.get('genre/movie/list?api_key=e188b9dabc206fb3f36d47f212012846');
        this.setState({genres: responseGenres.data.genres || []});
        
        console.log(this.state.movie);
    }

    render(){
        return (
            <div id="movie-cover" 
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.movie.backdrop_path})`, 
                    backgroundSize: "cover"}}>
                
                <section id="movie-data">
                    <div id="movie-title">
                        <div>
                            <div className="movie-title-data">
                                <p>
                                    <span className="movie-title">{this.state.movie.title}</span>
                                    <span className="movie-title-original">
                                        {
                                        this.state.movie.original_title !== this.state.movie.title ?
                                            `(${this.state.movie.original_title})` : ''                                     
                                        }
                                    </span>
                                </p>
                            </div>
                            <span className="movie-tag-line">{this.state.movie.tagline}</span>
                        </div>
                        <span className="movie-score">{this.state.movie.vote_average}</span>
                    </div>
                    <div id="movie-info">
                        <div className="movie-info-data">
                            <div>
                                <p className="movie-description">{this.state.movie.overview}</p>
                                                            
                                <div className="movie-genres">
                                    {
                                        (this.state.movie.genres||[]).map(g => (
                                            <span key={g.id}>{g.name}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <img 
                                src={`https://image.tmdb.org/t/p/w300${this.state.movie.poster_path}`}
                                alt={`Capa do filme ${this.state.movie.title}`} />
                        </div>
                        <div className="movie-info-release">
                            <span className="movie-runtime">Duração:{this.state.movie.runtime} min</span>
                            <span className="movie-release-date">Lançamento:{`${new Date(this.state.movie.release_date).toLocaleDateString()}`}</span>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Movie);
