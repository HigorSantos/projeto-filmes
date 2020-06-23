import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TopMovies from './pages/TopMovies';
import Movie from './pages/Movie';
import Search from './pages/Search';
import Procurando from './pages/Procurando';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={TopMovies}/>
            <Route path="/movie/:movieId"  component={Movie}/>
            <Route path="/search/:searchTerms" exact component={Search}/>
            <Route path="/procurando" exact component={Procurando}/>
            <Route component={TopMovies} />
        </Switch>
    );
}
export default Routes;