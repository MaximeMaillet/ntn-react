import React from 'react';
import {IntlProvider} from "react-intl";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import messages from '../translations';
import {getLocale, getLanguage} from '../libraries/locale';

import Home from "./Home/Home";
import Torrents from "./Torrents/Torrents";
import Profile from "./Profile/Profile";
import Notifications from "../components/Notifications/Notifications";

import './app.scss';
import TorrentsAdd from "./Torrents/Add/TorrentsAdd";

function App() {
  const language = getLanguage();
  const locale = getLocale();
  return (
    <IntlProvider locale={locale} messages={messages[language]}>
      <Router>
        <Notifications/>
        <Switch>
          <Route path="/admin/users"><Profile/></Route>
          <Route path="/profile"><Profile/></Route>
          <Route path="/torrents/add"><TorrentsAdd /></Route>
          <Route path="/torrents"><Torrents /></Route>
          <Route path="/"><Home/></Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
}

export default App;
