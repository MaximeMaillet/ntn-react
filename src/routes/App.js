import React from 'react';
import {IntlProvider} from "react-intl";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import messages from '../translations';
import {getLocale, getLanguage} from '../libraries/locale';

import Home from "./Home/Home";

import './app.scss';
import Profile from "./Profile/Profile";

function App() {
  const language = getLanguage();
  const locale = getLocale();
  return (
    <IntlProvider locale={locale} messages={messages[language]}>
      <Router>
        <Switch>
          <Route path="/profile"><Profile/></Route>
          <Route path="/"><Home/></Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
}

export default App;
