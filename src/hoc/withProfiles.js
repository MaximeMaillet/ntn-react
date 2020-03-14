import React from 'react';
import {withRouter} from "react-router-dom";
import api from '../libraries/api';
import {LOADING} from '../config/const';

export default function withProfiles(BaseComponent) {
  class withProfilesComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isNotFound:false,
        loading: 0,
        profile: null,
        profiles: null,
        torrents: null,
      };
    }

    startLoading = (type) => {
      this.setState({loading: this.state.loading | type});
    };

    stopLoading = (type) => {
      this.setState({loading: this.state.loading & ~type, error: null});
    };

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
        this.startLoading(LOADING.PROFILE);
        const profiles = (await api('GET', `/users`)).data;
        this.setState({profiles});
      } catch(e) {
        this.handleError(e);
      } finally {
        this.stopLoading(LOADING.PROFILE);
      }
    };

    loadProfile = async(id) => {
      try {
        this.startLoading(LOADING.PROFILE);
        const profile = (await api('GET', `/users/${id}`)).data;
        this.setState({profile});
      } catch(e) {
        this.handleError(e);
      } finally {
        this.stopLoading(LOADING.PROFILE);
      }
    };

    loadProfileTorrents = async() => {
      try {
        this.startLoading(LOADING.TORRENTS);
        const torrents = (await api('GET', `/users/${this.state.profile.id}/torrents`)).data;
        this.setState({torrents});
      } catch(e) {
        this.handleError(e);
      } finally {
        this.stopLoading(LOADING.TORRENTS);
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
        profileTorrents={this.state.torrents}
        loading={this.state.loading}
        profileError={this.state.error}
        profileNotFound={this.state.isNotFound}
        loadProfiles={this.loadProfiles}
        loadProfile={this.loadProfile}
        loadProfileTorrents={this.loadProfileTorrents}
        startLoading={this.startLoading}
        stopLoading={this.stopLoading}
        refresh={this.refresh}
        handleError={this.handleError}
      />
    }
  }

  return withRouter(withProfilesComponent);
}
