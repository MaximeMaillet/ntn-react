import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import PasswordInput from "../Inputs/PasswordInput";
import authActions from '../../../redux/auth/actions';
import api from '../../../libraries/api';
import {LOADING} from '../../../config/const';
import loadingActions from "../../../redux/loading/actions";
import notificationsActions from "../../../redux/notifications/actions";

import '../forms.scss';

class LoginForm extends Component {

  onSubmit = async(data) => {
    try {
      this.props.startLoading(LOADING.LOGIN);
      const result = (await api('POST', `/authentication/login`, {
        email: data.email,
        password: data.password
      })).data;

      this.props.login(result.token);
    } catch(e) {
      this.props.startToaster({message: e.data.message});
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading(LOADING.LOGIN);
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        {props =>
          <form className="form-main" onSubmit={props.handleSubmit} noValidate>
            <EmailInput
              className="form-input-align"
              name="email"
              required
              label={this.props.intl.messages['form.input.email.label']}
              placeholder={this.props.intl.messages['form.input.email.placeholder']}
            />

            <PasswordInput
              className="form-input-align"
              name="password"
              required
              label={this.props.intl.messages['form.input.password.label']}
              placeholder={this.props.intl.messages['form.input.password.placeholder']}
            />

            <button className="btn btn-primary" type="submit"><FormattedMessage id="form.login.submit.text"/></button>
          </form>
        }
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    login: (token) => dispatch(authActions.login(token)),
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
    startToaster: (data) => dispatch(notificationsActions.start(data))
  })
)
(injectIntl(LoginForm));