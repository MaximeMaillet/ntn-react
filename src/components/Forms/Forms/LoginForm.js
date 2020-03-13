import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import PasswordInput from "../Inputs/PasswordInput";
import userActions from '../../../redux/users/actions';
import api from '../../../libraries/api';

import '../forms.scss';
import loadingActions from "../../../redux/loading/actions";

class LoginForm extends Component {

  onSubmit = async(data) => {
    try {
      this.props.startLoading();
      const result = (await api('POST', `/authentication/login`, {
        email: data.email,
        password: data.password
      })).data;

      this.props.login(result.token, result.user);
      if(this.props.onSubmit) {
        return this.props.onSubmit(result);
      }
    } catch(e) {
      console.warn(e);
      this.props.fail(e.data);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading();
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
              required
              className="form-input-align"
              label={this.props.intl.messages['form.input.email.label']}
              placeholder={this.props.intl.messages['form.input.email.placeholder']}
            />

            <PasswordInput
              required
              className="form-input-align"
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
  login: PropTypes.func,
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    login: (token, user) => dispatch(userActions.login(token, user)),
    fail: (e) => dispatch(userActions.fail(e)),
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
  })
)
(injectIntl(LoginForm));