import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, Form} from "react-final-form";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import api from '../../../../libraries/api';

import '../../forms.scss'
import './torrent-form.scss';
import {LOADING} from "../../../../config/const";
import TextInput from "../../Inputs/TextInput";
import DateInput from "../../Inputs/DateInput";
import NumberInput from "../../Inputs/NumberInput";
import SelectCreatableInput from "../../Inputs/MetaInput";
import loadingActions from "../../../../redux/loading/actions";
import MediaTypeInput from "../../Inputs/MediaTypeInput";
import LongTextInput from "../../Inputs/LongTextInput";

class TorrentEditForm extends Component {
  onSubmit = async(data) => {
    try {
      this.props.startLoading(LOADING.FORM_TORRENT);
      const result = (await api('PATCH', `/torrents/${this.props.torrent.id}`, data)).data;
      this.props.onSubmitSuccess(result);
    } catch(e) {
      this.props.onSubmitError(e);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading(LOADING.FORM_TORRENT);
    }
  };

  render() {
    const {className, torrent} = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          title: torrent.title,
          release_date: torrent.release_date,
          poster: torrent.poster,
          media_type: torrent.media_type,
          language: torrent.language,
          overview: torrent.overview,
          runtime: torrent.runtime,
          genres: torrent.genres,
        }}
      >
        {props => (
          <form className={`form-main form-torrent-edit ${className}`} onSubmit={props.handleSubmit} noValidate>
            <div className="d-flex flex-row">
              <div className="part-left">
                <Field name="poster">
                  {({input, meta}) => (
                    <img src={input.value} alt="poster" />
                  )}
                </Field>
                <TextInput
                  name="poster"
                  className="input-poster-url"
                  label={this.props.intl.messages['form.torrent.poster.label']}
                  placeholder={this.props.intl.messages['form.torrent.poster.placeholder']}
                />
                <DateInput
                  label={this.props.intl.messages['form.torrent.release_date.label']}
                  placeholder={this.props.intl.messages['form.torrent.release_date.placeholder']}
                  name="release_date"
                />

                <NumberInput
                  label={this.props.intl.messages['form.torrent.runtime.label']}
                  placeholder={this.props.intl.messages['form.torrent.runtime.placeholder']}
                  name="runtime"
                />
              </div>
              <div className="part-right">
                <TextInput
                  label={this.props.intl.messages['form.torrent.title.label']}
                  placeholder={this.props.intl.messages['form.torrent.title.placeholder']}
                  name="title"
                />

                <MediaTypeInput
                  label={this.props.intl.messages['form.torrent.media_type.label']}
                  placeholder={this.props.intl.messages['form.torrent.media_type.placeholder']}
                  name="media_type"
                />

                <TextInput
                  label={this.props.intl.messages['form.torrent.language.label']}
                  placeholder={this.props.intl.messages['form.torrent.language.placeholder']}
                  name="language"
                />

                <LongTextInput
                  label={this.props.intl.messages['form.torrent.overview.label']}
                  placeholder={this.props.intl.messages['form.torrent.overview.placeholder']}
                  name="overview"
                />

                <SelectCreatableInput
                  label={this.props.intl.messages['form.torrent.genres.label']}
                  placeholder={this.props.intl.messages['form.torrent.genres.placeholder']}
                  name="genres"
                  multiple
                  transformValue={(v) => v.map((v) => ({label:v.name, value:v.id}))}
                />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              <FormattedMessage id="form.torrent.edit.submit"/>
            </button>
          </form>
        )}
      </Form>
    );
  }
}

TorrentEditForm.defaultProps = {
  className: '',
  onSubmitError: (e) => console.warn(e),
  onSubmitSuccess: (data) => console.log(data)
};

TorrentEditForm.propTypes = {
  torrent: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
  }),
  (dispatch) => ({
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)(injectIntl(TorrentEditForm));