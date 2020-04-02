import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import withAdmin from "../../../hoc/withAdmin";
import ProfileTable from '../../../components/Profile/Table/ProfileTable';
import {LOADING} from "../../../config/const";
import ProfileContainer, {TYPE} from "../../../containers/profile/ProfileContainer";

import './list.scss';
import shouldAuth from "../../../hoc/shouldAuth";

class List extends Component {
  render() {
    const {loading} = this.props;
    return (
      <section className={`main-block block-side block-content block-profile-list ${(loading & LOADING.PROFILE) !== 0 ? 'is-loading' : ''}`}>
        <div className="d-flex flex-row">
          <h1><FormattedMessage id="route.profile.list.h1" /></h1>
          <Link className="btn btn-primary ml-auto" to="/profiles/add">
            <i className="fa fa-plus" />
            <FormattedMessage id="route.profile.list.button.create" />
          </Link>
        </div>
        <ProfileContainer
          className="profile-container"
          type={TYPE.ALL}
          component={ProfileTable} />
      </section>
    );
  }
}

List.propTypes = {
  profiles: PropTypes.array,
  loadProfiles: PropTypes.func,
};

export default shouldAuth(withAdmin(List));
