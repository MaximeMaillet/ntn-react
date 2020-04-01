import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import withAdmin from "../../../hoc/withAdmin";
import ProfileList from '../../../components/Profile/List/List';
import {LOADING} from "../../../config/const";
import shouldAuth from "../../../hoc/shouldAuth";

import './list.scss'

class List extends Component {
  render() {
    const {loading, profiles} = this.props;
    return (
      <div className={`content ${(loading & LOADING.PROFILE) !== 0 ? 'is-loading' : ''}`}>
        <section className="d-flex flex-column main-block block-profile-list">
          <Link className="btn btn-primary ml-auto" to="/profiles/create">
            <FormattedMessage id="route.profile.section_link.create" />
          </Link>
          <h1><FormattedMessage id="route.profile.create.h1" /></h1>
          <ProfileList profiles={profiles} />
        </section>
      </div>
    );
  }
}

List.propTypes = {
  profiles: PropTypes.array,
  loadProfiles: PropTypes.func,
};

export default shouldAuth(withAdmin(List));
