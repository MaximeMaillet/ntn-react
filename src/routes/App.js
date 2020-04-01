import React, {Component} from 'react';
import {IntlProvider} from "react-intl";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import messages from '../translations';
import {getLocale, getLanguage} from '../libraries/locale';
import history from '../history'

import Notifications from "../components/Notifications/Notifications";
import MainRouter from "../routers/Main/MainRouter";

import './app.scss';

class App extends Component {
  render() {
    const language = getLanguage();
    const locale = getLocale();
    return (
      <IntlProvider locale={locale} messages={messages[language]}>
        <Router history={history}>
          <Notifications/>
          <Switch>
            <Route component={MainRouter} />
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
