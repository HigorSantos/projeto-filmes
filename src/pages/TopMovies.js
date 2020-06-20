import React, {Component} from 'react';

import './TopMovies.css';

class TopMovies extends Component{
  render(){
    return (
      <section id="movie-list">
        <article>
          <img src="https://image.tmdb.org/t/p/w300/4dS40km5rcd4udAGJheU18ZeSfi.jpg" alt="Capa do filme" className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>Nome do Filme bem maior, tipo muito maior pra quebra mesmo</span>
                <span className="movie-director">Diretor</span>
              </div>
              <span className="movie-score">9,7</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">action, drama, adventure</p>
            </div>
          </footer>
        </article>

        <article>
          <img src="https://image.tmdb.org/t/p/w300/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" alt="Capa do filme" className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>Nome do Filme</span>
                <span className="movie-director">Diretor</span>
              </div>
              <span className="movie-score">9,7</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">action, drama, adventure</p>
            </div>
          </footer>
        </article>

        <article>
          <img src="https://image.tmdb.org/t/p/w300/iZf0KyrE25z1sage4SYFLCCrMi9.jpg" alt="Capa do filme" className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>Nome do Filme</span>
                <span className="movie-director">Diretor</span>
              </div>
              <span className="movie-score">9,7</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">action, drama, adventure</p>
            </div>
          </footer>
        </article>

        <article>
          <img src="https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" alt="Capa do filme" className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>Nome do Filme</span>
                <span className="movie-director">Diretor</span>
              </div>
              <span className="movie-score">9,7</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">action, drama, adventure</p>
            </div>
          </footer>
        </article>

        <article>
          <img src="https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" alt="Capa do filme" className="img-movie" />
          <footer>
            <div className="movie-content">
              <div className="movie-info">
                <span>Nome do Filme</span>
                <span className="movie-director">Diretor</span>
              </div>
              <span className="movie-score">9,7</span>
            </div>
            <div className="movie-description">
              <p className="movie-tags">action, drama, adventure</p>
            </div>
          </footer>
        </article>
      </section>
    );
  }
}

export default TopMovies;