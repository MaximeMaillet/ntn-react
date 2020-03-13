import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import {FormattedMessage, injectIntl} from "react-intl";
import ProfileDetailForm from "../../components/Forms/Forms/ProfileDetailForm";
import ProfilePictureForm from "../../components/Forms/Forms/ProfilePictureForm";
import notificationsActions from '../../redux/notifications/actions'
import loadingActions from "../../redux/loading/actions";

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
    return (
      <div className="parent">
        <Header />
        <div className="container-side-menu">
          <SideMenu/>
          <div className={`content ${this.state.loading ? 'is-loading' : ''}`}>
            <section className="main-block">
              <h1><FormattedMessage id="route.profile.details.h1" /></h1>
              <ProfilePictureForm
                className="form-input-center"
                user={this.props.user}
              />
              <ProfileDetailForm
                user={this.props.user}
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
)(injectIntl(Profile)));
