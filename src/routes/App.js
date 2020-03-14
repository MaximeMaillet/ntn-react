import React, {Component} from 'react';
import {IntlProvider} from "react-intl";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import messages from '../translations';
import {getLocale, getLanguage} from '../libraries/locale';

import MainContainer from "../containers/MainContainer/MainContainer";
import Notifications from "../components/Notifications/Notifications";

import './app.scss';

class App extends Component {
  render() {
    const language = getLanguage();
    const locale = getLocale();
    return (
      <IntlProvider locale={locale} messages={messages[language]}>
        <Router>
          <Notifications/>
          <Switch>
            <Route path="/"><MainContainer /></Route>
          </Switch>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
