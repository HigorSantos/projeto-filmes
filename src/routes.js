import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TopMovies from './pages/TopMovies';
import Movie from './pages/Movie';
import Search from './pages/Search';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={TopMovies}/>
            <Route path="/movie/:movieId"  component={Movie}/>
            <Route path="/search/:searchTerms" exact component={Search}/>
            <Route component={TopMovies} />
        </Switch>
    );
}
export default Routes;