import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import NumberInput from "../../Inputs/NumberInput";
import api from "../../../../libraries/api";
import get from 'lodash.get';
import PasswordInput from "../../Inputs/PasswordInput";
import {LOADING, ROLES} from "../../../../config/const";
import '../../forms.scss';
import SelectInput from "../../Inputs/SelectInput";
import CheckBoxInput from "../../Inputs/CheckBoxInput";
import loadingActions from "../../../../redux/loading/actions";

const bitwiseOptions = [
  {value: ROLES.USER, label: <FormattedMessage id="roles.user"/>},
  {value: ROLES.BOT, label: <FormattedMessage id="roles.bot"/>},
  {value: ROLES.ADMIN, label: <FormattedMessage id="roles.admin"/>},
];

class ProfileDetailForm extends Component {
  onSubmit = async(data) => {
    try {
      this.props.startLoading(LOADING.FORM_PROFILE);
      let profile = null;
      if(this.props.profile) {
        profile = (await api('PATCH', `/users/${this.props.profile.id}`, data)).data;
      } else {
        profile = (await api('POST', `/users`, data)).data;
      }
      this.props.onSubmitSuccess(profile);
    } catch(e) {
      this.props.onSubmitError(e);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading(LOADING.FORM_PROFILE);
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

  transformBitwiseValue = (value) => {
    const options = [];
    for(const i in bitwiseOptions) {
      if((bitwiseOptions[i].value & value) !== 0) {
        options.push(bitwiseOptions[i]);
      }
    }
    return options;
  };

  transformBitwiseSelected = (selected) => {
    if(selected && Array.isArray(selected) && selected.length > 0) {
      return selected.map((s) => s.value).reduce((acc, s) => acc | s);
    }

    return selected;
  };

  render() {
    const {create, isAdmin, className} = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        initialValues={create ? {} : {
          id: get(this.props, 'profile.id', null),
          email: get(this.props, 'profile.email', null),
          space: get(this.props, 'profile.space', null),
          roles: get(this.props, 'profile.roles', null),
          is_validated: get(this.props, 'profile.is_validated', false),
        }}
      >
        {props =>
          <form
            className={`form-main ${className}`}
            onSubmit={props.handleSubmit}
            noValidate
          >
            <EmailInput
              className="form-input-align"
              name="email"
              label={this.props.intl.messages['form.input.email.label']}
              placeholder={this.props.intl.messages['form.input.email.placeholder']}
              required
            />
            {
              isAdmin &&
              <SelectInput
                className="form-input-align"
                name="roles"
                label={this.props.intl.messages['form.input.roles.label']}
                placeholder={this.props.intl.messages['form.input.roles.placeholder']}
                transformValue={this.transformBitwiseValue}
                transformSelected={this.transformBitwiseSelected}
                multiple
                required
                options={bitwiseOptions}
              />
            }
            {
              isAdmin &&
              <NumberInput
                className="form-input-align"
                name="space"
                transformInput={(value) => Math.floor(value/(1024*1024*1024))}
                transformOutput={(value) => value*1024*1024*1024}
                label={this.props.intl.messages['form.input.space.label']}
                placeholder={this.props.intl.messages['form.input.space.placeholder']}
                required
              />
            }
            {
              isAdmin &&
              <CheckBoxInput
                className="form-input-align"
                name="is_validated"
                label={this.props.intl.messages['form.input.is_validated.label']}
              />
            }
            <PasswordInput
              className="form-input-align"
              name="password"
              required={create}
              label={this.props.intl.messages['form.input.password.label']}
              placeholder={this.props.intl.messages['form.input.password.placeholder']}
            />
            <PasswordInput
              className="form-input-align"
              name="password2"
              required={create}
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
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  create: PropTypes.bool,
  className: PropTypes.string,
};

ProfileDetailForm.defaultProps = {
  initialValues: {},
  onSubmitError: (e) => console.warn(e),
  profile: null,
  create: false,
  isAdmin: false,
  className: '',
};

export default connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
  }),
  (dispatch) => ({
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)
(injectIntl(ProfileDetailForm));