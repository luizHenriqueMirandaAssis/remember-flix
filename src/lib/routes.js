import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PageHome from "../pages/home";
import PageNotFound from "../pages/notFound";
import PageSeriesList from "../pages/series/list";
import PageSeriesForm from "../pages/series/form";
import PageCategoriasList from "../pages/categorias/list";
import PageCategoriasForm from "../pages/categorias/form";

class Routes extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route path="/series/list" component={PageSeriesList} />
          <Route path="/series/new" component={PageSeriesForm} />
          <Route path="/series/:id" component={PageSeriesForm} />
          <Route path="/categorias/list" component={PageCategoriasList} />
          <Route path="/categorias/new" component={PageCategoriasForm} />
          <Route path="/categorias/:id" component={PageCategoriasForm} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    );
  }
}

export default Routes;
