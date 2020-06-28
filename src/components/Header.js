import React, { Component } from 'react';

import './Header.css';
import Logo from '../assets/logo.svg';
import LogoP from '../assets/logo_p.svg';
import LogoProcurando from '../assets/logo_procurando.svg';
import Lupa from '../assets/lupa.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    state = {
        search:"",
    };

    async componentDidMount(){
        const searchTerms = this.props.match.params.searchTerms;
        this.setState({search: searchTerms});
    }

    handleChange = el =>{
        this.setState({search: el.target.value})
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.history.push(`/search/${this.state.search}`);
        }
      }
    render() {
        return(
            <header id="main-header">
                <div className="header-content">
                    <div className="header-logos">
                        <Link to="/">
                            <img src={LogoP} alt="Projeto Filmes" className="img-logo-p"/>
                        </Link>
                        <Link to="/">
                            <img src={Logo} alt="Projeto Filmes" className="img-logo"/>
                        </Link>
                        <Link to="/procurando">
                            <img src={LogoProcurando} alt="Procurando Filmes - O que assistir?" className="img-procurando"/>
                        </Link>
                    </div>
                    <div className="header-search">
                        <span>
                            <input type="text" 
                            className="input-search"
                            onChange={this.handleChange}
                            onKeyDown={this._handleKeyDown}
                            value={this.state.search} />
                            </span>
                        <Link to={`/search/${this.state.search}`}>
                            <img src={Lupa} className="buscar" alt="Buscar"/>
                        </Link>
                    </div>
                </div>
            </header>

            );
    }
}

export default withRouter(Header);
