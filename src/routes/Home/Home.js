import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import shouldAuth from "../../hoc/shouldAuth";
import Header from "../../components/Header/Header";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import TorrentList from "../../components/Torrents/List/TorrentsList";
import {LOADING} from '../../config/const';

import './home.scss';

class Home extends Component {
  render() {
    const {isAdmin, loading} = this.props;
    return (
      <React.Fragment>
        <Header />
          <div className="content content-home">
            <section className={`main-block container block-torrents-list ${(loading & LOADING.TORRENTS) ? 'is-loading' : ''}`}>
              <div className="d-flex flex-row">
                <h1><FormattedMessage id="route.home.torrents.h1" /></h1>
                {
                  isAdmin &&
                  <div className="d-flex ml-auto mb-1">
                    <Link to="/torrents/add" className="btn btn-primary">
                      <i className="fa fa-plus" />
                      <FormattedMessage id="route.home.torrents.add" />
                    </Link>
                  </div>
                }
              </div>
              <TorrentList />
            </section>
        </div>
      </React.Fragment>
    );
  }
}

Home.propsTypes = {
  loading: PropTypes.number,
  isAdmin: PropTypes.bool,
};

export default shouldAuth(connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
    loading: state.loading.loading,
  })
)(Home));
