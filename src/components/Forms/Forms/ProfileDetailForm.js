import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import NumberInput from "../Inputs/NumberInput";
import userActions from '../../../redux/users/actions';
import api from "../../../libraries/api";
import get from 'lodash.get';
import PasswordInput from "../Inputs/PasswordInput";
import {ROLES} from '../../../libraries/roles';
import BitwiseInput from "../Inputs/BitwiseInput";

import '../forms.scss';

class ProfileDetailForm extends Component {

  onSubmit = async(data) => {
    try {
      console.log('sub')
      console.log(data);
      this.props.startLoading();
      const user = (await api('PATCH', `/users/${this.props.user.id}`, data)).data;
      this.props.loaded('update', user);
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

  validate = (data) => {
    if(data.password && !data.password2) {
      return {password2: this.props.intl.messages['form.input.password.required']}
    }

    if(data.password !== data.password2) {
      return {password2: this.props.intl.messages['form.input.password.not_same']}
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        initialValues={{
          id: get(this.props, 'user.id', null),
          email: get(this.props, 'user.email', null),
          space: get(this.props, 'user.space', null),
          roles: get(this.props, 'user.roles', null),
        }}
      >
        {props =>
          <form
            className="main-form"
            onSubmit={props.handleSubmit}
            noValidate
          >
            <EmailInput
              required
              label={this.props.intl.messages['form.input.email.label']}
              placeholder={this.props.intl.messages['form.input.email.placeholder']}
            />
            {
              this.props.isAdmin &&
              <BitwiseInput
                name="roles"
                multiple
                options={[
                  {value: ROLES.USER, label: <FormattedMessage id="roles.user"/>},
                  {value: ROLES.BOT, label: <FormattedMessage id="roles.bot"/>},
                  {value: ROLES.ADMIN, label: <FormattedMessage id="roles.admin"/>},
                ]}
              />
            }
            {
              this.props.isAdmin &&
              <NumberInput
                required
                name="space"
                label={this.props.intl.messages['form.input.space.label']}
                placeholder={this.props.intl.messages['form.input.space.placeholder']}
              />
            }

            <PasswordInput
              name="password"
              label={this.props.intl.messages['form.input.password.label']}
              placeholder={this.props.intl.messages['form.input.password.placeholder']}
            />
            <PasswordInput
              name="password2"
              label={this.props.intl.messages['form.input.password.label']}
              placeholder={this.props.intl.messages['form.input.password.placeholder']}
            />
            <button className="btn btn-primary" type="submit">
              <FormattedMessage id="form.generic.button.submit"/>
            </button>
          </form>
        }
      </Form>
    );
  }
}

ProfileDetailForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
  isAdmin: PropTypes.bool,
};

ProfileDetailForm.defaultProps = {
  initialValues: {},
};

export default connect(
  (state) => ({
    isAdmin: state.user.isAdmin,
  }),
  (dispatch) => ({
    startLoading: () => dispatch(userActions.startLoading()),
    stopLoading: () => dispatch(userActions.stopLoading()),
    fail: (e) => dispatch(userActions.fail(e)),
    loaded: (action, user) => dispatch(userActions.loaded(action, user)),
  })
)
(injectIntl(ProfileDetailForm));