import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../../hoc/withAuth";
import Header from "../../../components/Header/Header";
import SideMenu from "../../../components/Menus/SideMenu/SideMenu";
import {FormattedMessage, injectIntl} from "react-intl";
import ProfileDetailForm from "../../../components/Forms/Forms/ProfileForm/ProfileDetailForm";
import ProfilePictureForm from "../../../components/Forms/Forms/ProfileForm/ProfilePictureForm";
import notificationsActions from '../../../redux/notifications/actions'
import loadingActions from "../../../redux/loading/actions";

import './profile.scss'
import {withRouter} from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.loading && this.props.loading) {
      this.setState({loading: true});
    }

    if(prevProps.loading && !this.props.loading) {
      if(prevProps.errors) {
        this.props.startNotif(this.props.errors);
      } else {
        if(this.props.action === 'update') {
          this.props.startNotif({message: this.props.intl.messages['form.generic.update.success']})
        }
      }
      this.setState({loading: false});
    }
  }

  render() {
    const {match: {params}, user} = this.props;
    return (
      <div className="parent">
        <Header />
        <div className="container-side-menu">
          <SideMenu/>
          <div className={`content ${this.state.loading ? 'is-loading' : ''}`}>
            <section className="main-block block-profile">
              <h1><FormattedMessage id={params.type === 'edit' ? 'route.profile.edit.h1' : 'route.profile.create.h1'} /></h1>
              <ProfilePictureForm
                user={params.type === 'edit' ? user : null}
                create={params.type === 'create'}
              />
              <ProfileDetailForm
                className="form-input-align"
                user={params.type === 'edit' ? user : null}
                create={params.type === 'create'}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(connect(
  (state) => ({
    user: state.user.user,
    loading: state.loading.loading,
    errors: state.user.errors,
    action: state.user.action,
  }),
  (dispatch) => ({
    startNotif: (data) => dispatch(notificationsActions.start(data)),
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
  })
)(injectIntl(withRouter(Profile))));
