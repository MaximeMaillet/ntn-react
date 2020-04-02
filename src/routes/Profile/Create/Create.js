import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import shouldAuth from "../../../hoc/shouldAuth";
import withAdmin from "../../../hoc/withAdmin";
import {LOADING} from "../../../config/const";
import ProfileContainer, {TYPE} from "../../../containers/profile/ProfileContainer";
import ProfileCreate from "../../../components/Profile/Create/ProfileCreate";

class Create extends Component {
  render() {
    const {loading} = this.props;
    return (
      <div className={`content ${(loading & LOADING.FORM_PROFILE) !== 0 ? 'is-loading' : ''}`}>
        <section className="main-block block-content block-profile-create">
          <h1><FormattedMessage id="route.profile.create.h1" /></h1>
          <ProfileContainer
            type={TYPE.NONE}
            component={ProfileCreate}
          />
        </section>
      </div>
    );
  }
}

Create.propTypes = {
  loading: PropTypes.number,
};

export default shouldAuth(withAdmin(connect(
  (state) => ({
    loading: state.loading.loading
  })
)(Create)));