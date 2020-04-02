import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from "react-intl";
import shouldAuth from "../../../hoc/shouldAuth";
import ProfileContainer, {TYPE} from "../../../containers/profile/ProfileContainer";
import ProfileEdit from "../../../components/Profile/Edit/ProfileEdit";
import {connect} from "react-redux";
import {LOADING} from "../../../config/const";
import shouldOwner from "../../../hoc/shouldOwner";

class Edit extends Component {
  render() {
    const {profileId, loading} = this.props;
    return (
      <section className={`main-block block-side block-content ${loading & LOADING.FORM_PROFILE ? 'is-loading' : ''}`}>
        <h1><FormattedMessage id="route.profile.edit.h1" /></h1>
        <ProfileContainer
          type={TYPE.ONE}
          profile_id={profileId}
          component={ProfileEdit}
        />
      </section>
    );
  }
}

Edit.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default shouldAuth(
  shouldOwner(
    connect(
      (state) => ({
        loading: state.loading.loading
      })
    )(Edit),
    'profileId'
  )
);