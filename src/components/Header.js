import React from 'react';

import './Header.css';
import Logo from '../assets/logo.png';
import Lupa from '../assets/lupa.png';

function Header() {
  return(
    <header id="main-header">
        <div className="header-content">
            <img src={Logo} alt="Projeto Filmes" className="img-logo"/>
            <div className="header-search">
                <span>Teste</span>
                <img src={Lupa} alt="Buscar"/>
            </div>
        </div>
    </header>

    );
}

export default Header;