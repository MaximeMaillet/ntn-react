import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import withAdmin from "../../../hoc/withAdmin";
import ProfileTable from '../../../components/Profile/Table/ProfileTable';
import {LOADING} from "../../../config/const";

class List extends Component {
  render() {
    const {loading, profiles} = this.props;
    return (
      <section className={`main-block block-side block-content ${(loading & LOADING.PROFILE) !== 0 ? 'is-loading' : ''}`}>
        <div className="d-flex flex-row">
          <h1><FormattedMessage id="route.profile.create.h1" /></h1>
          <Link className="btn btn-primary ml-auto" to="/profiles/create">
            <FormattedMessage id="route.profile.section_link.create" />
          </Link>
        </div>
        <ProfileTable
          className="mt-3" profiles={profiles}
        />
      </section>
    );
  }
}

List.propTypes = {
  profiles: PropTypes.array,
  loadProfiles: PropTypes.func,
};

export default withAdmin(List);
