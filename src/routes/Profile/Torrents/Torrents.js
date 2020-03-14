import React, {Component} from 'react';
import withAuth from "../../../hoc/withAuth";
import {FormattedMessage, injectIntl} from "react-intl";
import List from "../../../components/Torrents/List/List";

import './torrents.scss'

class Torrents extends Component {
  render() {
    return (
      <div className="content">
        <section className="main-block block-user-torrents">
          <h1><FormattedMessage id="route.profile.torrents.h1" /></h1>
          <List user={this.props.profile} />
        </section>
      </div>
    );
  }
}

export default withAuth(injectIntl(Torrents));
