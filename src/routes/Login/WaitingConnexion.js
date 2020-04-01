import React, {Component} from 'react';
import OfflineHeader from "../../components/Header/OfflineHeader";
import {FormattedMessage} from "react-intl";

import './login.scss'

class WaitingConnexion extends Component {
  render() {
    return (
      <div className="main-container">
        <OfflineHeader />
        <div className="content content-simple">
          <section className="main-block block-login">
            <h1><FormattedMessage id="route.login.waiting_connexion.title"/></h1>
            <p><FormattedMessage id="route.login.waiting_connexion.text"/></p>
          </section>
        </div>
      </div>
    );
  }
}

export default WaitingConnexion;