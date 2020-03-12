import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import NumberInput from "../Inputs/NumberInput";
import userActions from '../../../redux/users/actions';

import '../forms.scss';

class ProfileDetailForm extends Component {

  onSubmit = async(data) => {
    try {
      await this.props.updateUser(data.id, data);
    } catch(e) {
      console.warn(e);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          id: this.props.user.id,
          email: this.props.user.email,
          space: this.props.user.space,
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

            <NumberInput
              required
              name="space"
              label={this.props.intl.messages['form.input.space.label']}
              placeholder={this.props.intl.messages['form.input.space.placeholder']}
            />

            <button className="btn btn-primary" type="submit">
              <FormattedMessage id="form.login.submit.text"/>
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
};

ProfileDetailForm.defaultProps = {
  initialValues: {},
};

export default connect(
  () => ({}),
  (dispatch) => ({
    updateUser: (userId, data) => dispatch(userActions.update(userId, data)),
  })
)
(injectIntl(ProfileDetailForm));