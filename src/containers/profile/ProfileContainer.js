import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {LOADING} from "../../config/const";
import withProfiles from "../../hoc/withProfiles";
import ResourceLoading from "../../components/Resources/ResourceLoading/ResourceLoading";
import ResourceError from "../../components/Resources/ResourceError/ResourceError";
import ResourceEmpty from "../../components/Resources/ResourceEmpty/ResourceEmpty";
import notificationActions from "../../redux/notifications/actions";

export const TYPE = {
  NONE: 0,
  ALL: 1,
  ONE: 2
};

class ProfileContainer extends Component {
  componentDidMount() {
    if(this.props.type === TYPE.ALL) {
      this.props.loadProfiles();
    } else if(this.props.type === TYPE.ONE) {
      if(!this.props.profile_id) {
        throw new Error('You should precise profile ID');
      }

      this.props.loadProfile(this.props.profile_id);
    }
  }

  onSubmitSuccess = (profile) => {
    if(this.props.profile) {
      this.props.refresh(profile);
      this.props.startToaster('success', {
        title: this.props.intl.messages['form.profile.update.success']
      });
    } else {
      this.props.startToaster('success', {
        title: this.props.intl.messages['form.profile.create.success']
      });
    }
  };

  onSubmitError = (error) => {
    if(this.props.profile) {
      this.props.startToaster('danger', {
        title: this.props.intl.messages['form.profile.update.error'],
        message: error.data.message,
      });
    } else {
      this.props.startToaster('danger', {
        title: this.props.intl.messages['form.profile.create.error'],
        message: error.data.message,
      });
    }
  };

  render() {
    const {profiles, profile, profileError, profileNotFound, type, loading, component, className} = this.props;
    
    if(profileError || profileNotFound) {
      return <ResourceError
        className={className}
        title={this.props.intl.messages['container.profile.error.title']}
        text={profileError.message}
      />;
    }

    if(type !== TYPE.NONE) {
      if(loading & LOADING.PROFILE) {
        return <ResourceLoading
          className={className}
          title={this.props.intl.messages['container.profile.loading.title']}
          text={this.props.intl.messages['container.profile.loading.text']}
        />
      }

      if(
        ((type === TYPE.ALL || type === TYPE.USER) && (!profiles || profiles.length === 0)) ||
        (type === TYPE.ONE && !profile)
      ) {
        return <ResourceEmpty
          className={className}
          title={this.props.intl.messages['container.profile.empty.title']}
          text={this.props.intl.messages['container.profile.empty.text']}
        />;
      }
    }

    return React.createElement(
      component,
      {
        className,
        profile,
        profiles,
        onSubmitSuccess: this.onSubmitSuccess,
        onSubmitError: this.onSubmitError,
      }
    );
  }
}

ProfileContainer.defaultProps = {
  className: '',
};

ProfileContainer.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  profile_id: PropTypes.number,
  type: PropTypes.oneOf(Object.values(TYPE)).isRequired,
  profiles: PropTypes.array,
  profile: PropTypes.object,
  profileError: PropTypes.object,
  profileNotFound: PropTypes.bool,
  loading: PropTypes.number,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startToaster: (type, message) => dispatch(notificationActions.start(type, message)),
  })
)(withProfiles(injectIntl(ProfileContainer)));
