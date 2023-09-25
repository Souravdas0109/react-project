import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import rootSaga from "./redux/sagas";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Booking from "./components/Booking/Booking";
import MovieDetails from "./components/Movie-Details/Movie-Details";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
          <Route path="/movies" component={App} />
          <Route path="/movieDetails" component={MovieDetails} />
          <Route path="/booking" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
