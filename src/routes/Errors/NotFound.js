import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import OfflineHeader from "../../components/Header/OfflineHeader";

import './errors.scss';

class NotFound extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {state} = this.props.location;
    return (
      <React.Fragment>
        <OfflineHeader />
        <div className="content content-simple">
          <section className="main-block block-errors">
            <h1>
              {
                state && state.title ?
                  state.title
                :
                  <FormattedMessage id="route.errors.not_found.title"/>
              }
            </h1>
            <p>
              {
                state && state.text ?
                  state.text
                :
                  <FormattedMessage id="route.errors.not_found.text"/>
              }
            </p>
            <div className="d-flex mt-auto justify-content-between">
              <button className="btn btn-primary" onClick={this.goBack}>
                <i className="fa fa-angle-left" />
                <FormattedMessage id="route.errors.not_found.go_back"/>
              </button>
              <Link to="/" className="btn btn-primary">
                <i className="fa fa-home"/>
                <FormattedMessage id="route.errors.not_found.cta"/>
              </Link>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

NotFound.defaultProps = {
  className: '',
};

NotFound.propTypes = {
  className: PropTypes.string,
};

export default withRouter(NotFound);
