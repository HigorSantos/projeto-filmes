import React, { Component } from 'react';

import './Header.css';
import Logo from '../assets/logo.svg';
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
                    <Link to="/">
                        <img src={Logo} alt="Projeto Filmes" className="img-logo"/>
                    </Link>
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
