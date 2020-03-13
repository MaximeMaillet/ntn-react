import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import OfflineHeader from "../../components/Header/OfflineHeader";
import notificationsActions from "../../redux/notifications/actions";

class Login extends Component {
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
      }

      this.setState({loading: false});
    }
  }

  render() {
    return (
      <div className={`parent ${this.state.loading ? 'is-loading' : ''}`}>
        <OfflineHeader />
        <div className="container">
          <section className="main-block">
            <LoginForm />
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.loading.loading,
    errors: state.user.errors,
  }),
  (dispatch) => ({
    startNotif: (data) => dispatch(notificationsActions.start(data))
  })
)(Login);