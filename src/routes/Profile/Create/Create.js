import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from "react-intl";
import ProfileDetailForm from "../../../components/Forms/Forms/ProfileForm/ProfileDetailForm";
import notificationActions from '../../../redux/notifications/actions';
import {LOADING} from "../../../config/const";
import loadingActions from "../../../redux/loading/actions";
import withProfiles from "../../../hoc/withProfiles";
import shouldAuth from "../../../hoc/shouldAuth";
import withAdmin from "../../../hoc/withAdmin";

class Create extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.error && this.props.error) {
      this.props.startToaster(this.props.error);
    }
  }

  onSubmit = (profile) => {
    this.props.refresh(profile);
    this.props.startToaster({message: this.props.intl.messages['form.generic.update.success']})
  };

  render() {
    const {profile, loading} = this.props;
    return (
      <div className={`content ${(loading & LOADING.PROFILE) !== 0 ? 'is-loading' : ''}`}>
        <section className="main-block block-content block-profile-create">
          <h1><FormattedMessage id="route.profile.edit.h1" /></h1>
          <ProfileDetailForm
            className="form-input-align"
            startLoading={this.props.startLoading}
            stopLoading={this.props.stopLoading}
            profile={profile}
            onSubmit={this.onSubmit}
            onError={this.props.handleError}
          />
        </section>
      </div>
    );
  }
}

Create.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  profile: PropTypes.object,
  error: PropTypes.object,
};

export default withAdmin(connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startToaster: (message) => dispatch(notificationActions.start(message)),
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
  })
)(injectIntl(withProfiles(Create))));