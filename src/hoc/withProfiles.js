import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import api from '../libraries/api';
import {LOADING} from '../config/const';
import loadingActions from "../redux/loading/actions";

export default function withProfiles(BaseComponent) {
  class withProfilesComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isNotFound:false,
        profile: null,
        profiles: null,
      };
    }

    handleError = (e) => {
      this.setState({isNotFound: e.status === 404});
      if(e.data && e.data.message) {
        this.setState({error: {message: e.data.message}});
      } else {
        this.setState({error: {message: 'Unexpected errors'}});
        console.error(e);
      }
    };

    loadProfiles = async() => {
      try {
        this.props.startLoading(LOADING.PROFILE);
        const profiles = (await api('GET', `/users`)).data;
        this.setState({profiles});
      } catch(e) {
        this.handleError(e);
      } finally {
        this.props.stopLoading(LOADING.PROFILE);
      }
    };

    loadProfile = async(id) => {
      try {
        this.props.startLoading(LOADING.PROFILE);
        const profile = (await api('GET', `/users/${id}`)).data;
        this.setState({profile});
      } catch(e) {
        this.handleError(e);
      } finally {
        this.props.stopLoading(LOADING.PROFILE);
      }
    };

    refresh = (profile) => {
      this.setState({profile});
    };

    render() {
      return <BaseComponent
        {...this.props}
        profiles={this.state.profiles}
        profile={this.state.profile}
        profileError={this.state.error}
        profileNotFound={this.state.isNotFound}
        loadProfiles={this.loadProfiles}
        loadProfile={this.loadProfile}
        refresh={this.refresh}
      />
    }
  }

  return connect(
    () => ({}),
    (dispatch) => ({
      startLoading: (type) => dispatch(loadingActions.startLoading(type)),
      stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
    })
  )(withRouter(withProfilesComponent));
}
