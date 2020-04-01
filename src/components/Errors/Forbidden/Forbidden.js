import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

import '../../../routes/Login/login.scss'

class Forbidden extends Component {
  render() {
    return (
      <div className="content">
        <section className="main-block block-content">
          <h1><FormattedMessage id="route.login.forbidden.title"/></h1>
          <p><FormattedMessage id="route.login.forbidden.text"/></p>
          <div className="d-flex flex-row justify-content-start">
            <Link to="/" className="btn btn-primary">
              <i className="fa fa-home"/>
              <FormattedMessage id="route.login.forbidden.cta"/>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Forbidden;