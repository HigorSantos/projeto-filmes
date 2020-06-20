import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TopMovies from './pages/TopMovies';
import Movie from './pages/Movie';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={TopMovies}/>
            <Route path="/movie/:movieId" exact component={Movie}/>
        </Switch>
    );
}
export default Routes;