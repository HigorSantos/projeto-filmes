import React from 'react';
import {Switch, Route} from 'react-router-dom';

import TopMovies from './pages/TopMovies';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={TopMovies}/>
        </Switch>
    );
}
export default Routes;