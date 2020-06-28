import React, {Component} from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './Procurando.css';

import PosterFilme from './PosterFilme';

import CMood, {GetMoods, MoodPesquisar, MoodNaoPesquisar} from './config/Moods';
import CTempo, {GetTempos, TempoMax, TempoMin} from './config/Tempos';

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
        moods: GetMoods(),
        tempoDisponivel:GetTempos(),
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
          sort_by: 'vote_average.desc',
          'vote_count.gte':1000,
          include_video: false,
          'vote_average.gte':6,
          with_genres: MoodPesquisar(moodSelecionado),
          without_genres: MoodNaoPesquisar(moodSelecionado),
          ...moodSelecionado.params
      };
  
      if(tempoSelecionado 
          && TempoMax(tempoSelecionado)){
              params['with_runtime.lte'] = TempoMax(tempoSelecionado);
      }
      if(tempoSelecionado 
          && TempoMin(tempoSelecionado)){
              params['with_runtime.gte'] = TempoMin(tempoSelecionado);
      }

      const response = await api.get('discover/movie',{
          params
        }
      );
  
      this.setState({
        movies: response.data.results || [],
      });
  }

  render(){
    
    const moodSelecionado = this.state.moodSelecionado;
    const tempoSelecionado = this.state.tempoSelecionado;
    if(this.state.status===0){
        return(
            <section id="procurando-filme">
            <div id="procurando-mood">
                <h1>To na pegada de um filme</h1>
                <div>
                {this.state.moods.map(mood => (
                  <CMood mood={mood} 
                      onClick={() => this.handleSetMood(mood)}
                      key={mood.id}/>
                ))}
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
                {this.state.tempoDisponivel.map(tempo => (
                  <CTempo tempo={tempo}
                        onClick={()=>this.handleSetTempo(tempo)}
                        key={tempo.id}/>
                ))}
                </div>
            </div>
            <div id="procurando-mood">
                <div>
                  <CMood mood={moodSelecionado}/>
                </div>
            </div>
        </section>
        )
    }
    else if(this.state.status===3){
    return (
      <div>
        <div className="procurando-exibindo">

          <h1>Você selecionou</h1>
          <div id="procurando-filme">
            <CMood mood={moodSelecionado} exibirImagem={false}/>
            <CTempo tempo={tempoSelecionado} exibirImagem={false} />
          </div>
          <h2>... e encontramos o seguinte</h2>
        </div>
        <section id="movie-list">
          {
          this.state.movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <PosterFilme movie={movie} genres={this.state.genres} />
          </Link>
          ) )
          }
        </section>
      </div>
    );
    }
  }
}

export default withRouter(Procurando);