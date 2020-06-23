import React, {Component} from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './Procurando.css';
import SemPoster from '../assets/sem-poster.png';
import MTranquilo from '../assets/m_tranquilo.svg'
import MGRudarCadeira from '../assets/m_grudar_cadeira.svg'
import MNinjasCebola from '../assets/m_ninjas_cebola.svg'
import TempoP from '../assets/pouco_tempo.svg';
import TempoM from '../assets/medio_tempo.svg';
import TempoG from '../assets/grande_tempo.svg';

class Procurando extends Component{
  state = {
    searchTerms:'',
    movies:[],
    genres:[],
    moods:[],
    tempoDisponivel:[],
    moodSelecionado:null,
    tempoSelecionado:null,
    status:0
  };
  
  async componentDidMount(){
    this.setState({
        moods:[
            {
                id:1, 
                mood:'Tranquilo',
                pesquisar:[12,35,10402,10751,10749],
                nao_pesquisar:[80,18,27,53,10752],
                img:MTranquilo
            },
            {
                id:2,
                mood:'Grudar na Cadeira',
                pesquisar:[],
                nao_pesquisar:[],
                img:MGRudarCadeira,
            },
            {
                id:3,
                mood:'Ninjas Cortadores de Cebola',
                pesquisar:[],
                nao_pesquisar:[],
                img:MNinjasCebola,
            },
        ],
        tempoDisponivel:[
            {
                tempoMax: 90,
                tamanho: 'pequeno',
                img: TempoP,
            },{
                tempoMin: 90,
                tempoMax: 140,
                tamanho: 'medio',
                img: TempoM,
            },{
                tempoMin: 140,
                tamanho: 'grande',
                img: TempoG,
            },
        ]
    });

    const responseGenres = await api.get('genre/movie/list');
    this.setState({genres: responseGenres.data.genres || []});
  }

    handleSetMood = mood => {
        this.setState({
            status: 2,
            moodSelecionado: mood,
        })
    }
    handleSetTempo = tempo =>{
        this.setState({
            status: 3,
            tempoSelecionado: tempo,
        });

        this.handleGetMovies(
            this.state.moodSelecionado,
            tempo
        );
    }

    async handleGetMovies(moodSelecionado, tempoSelecionado) {
        let params = {
            sort_by: 'popularity.desc',
            include_video: false,
            'vote_average.gte':6,
            with_genres: encodeURI(moodSelecionado.pesquisar),
            without_genres: encodeURI(moodSelecionado.nao_pesquisar),
        };
    
        if(tempoSelecionado 
            && tempoSelecionado.tempoMax){
                params['with_runtime.lte'] = tempoSelecionado.tempoMax;
        }
        if(tempoSelecionado 
            && tempoSelecionado.tempoMin){
                params['with_runtime.gte'] = tempoSelecionado.tempoMin;
        }
        console.log(params);
        const response = await api.get('discover/movie',{
            params
          }
        );
    
        this.setState({
          movies: response.data.results || [],
        });
    }

    getHoras = min => {
        let h = Math.floor(min / 60);
        let m = min % 60;
        m = m < 10 ? "0" + m : m;
        return `${h}h ${m}m`;
    };

  render(){
    const moodSelecionado = this.state.moodSelecionado ;
    if(this.state.status===0){
        return(
            <section id="procurando-filme">
            <div id="procurando-mood">
                <h1>To na pegada de um filme</h1>
                <div>
                {
                this.state.moods.map(mood => (
                <div className="box-mood" onClick={() => this.handleSetMood(mood)}> 
                    <img src={mood.img} alt={mood.mood} />
                    <span>{mood.mood}</span>
                </div>
                ))
                }
                </div>
            </div>
            </section>
        );
    }
    else if(this.state.status===2){
        return(
        <section id="procurando-filme">
            <h1>Tem quanto tempo?</h1>
            <div id="procurando-tempo">
                <div>
                {
                this.state.tempoDisponivel.map(tempo => (
                <div className={`box-tempo ${tempo.tamanho}`} onClick={() => this.handleSetTempo(tempo)}> 
                    <img src={tempo.img} alt={tempo.tamanho} />
                    <span className={tempo.tamanho}>
                        {tempo.tempoMax ? `Até ` : `Pode ir mais de `}
                        {this.getHoras(tempo.tempoMax||tempo.tempoMin)}
                    </span>
                </div>
                ))
                }
                </div>
            </div>
            <div id="procurando-mood">
                <div>
                {
                <div className="box-mood">
                    <img src={moodSelecionado.img} alt={moodSelecionado.mood} />
                    <span>{moodSelecionado.mood}</span>
                </div>
                }
                </div>
            </div>
        </section>
        )
    }else if(this.state.status===3){
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
}

export default withRouter(Procurando);