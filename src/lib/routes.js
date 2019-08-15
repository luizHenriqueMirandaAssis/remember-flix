import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import PageHome from '../pages/home'
import PageNotFound from '../pages/notFound'
import PageSeriesList from '../pages/series/list'
import PageSeriesForm from '../pages/series/form'

class Routes extends Component {
    render() {
     return (
        <main>
            <Switch>
                <Route exact path="/" component={PageHome} />
                <Route path="/series/list" component={PageSeriesList}  /> 
                <Route path="/series/new" component={PageSeriesForm}  /> 
                <Route path="/series/:id" component={PageSeriesForm}  /> 
                <Route component={PageNotFound} />
            </Switch>
        </main>
     )
    }
}

export default Routes