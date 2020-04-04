import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import * as loadingActions from "../../../../redux/loading/actions";
import Octet from "../../../Octet/Octet";
import MetaSelect from "../../Inputs/MetaInput";
import {Form} from "react-final-form";
import '../../forms.scss';
import './meta-form.scss'
import api from "../../../../libraries/api";
const fieldsCatched = ['id', 'title', 'release_date', 'poster', 'media_type', 'language', 'overview', 'runtime', 'genres'];


class MultipleMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: null,
    }
  }

  onSubmit = async(data) => {
    try {
      this.props.startLoading();
      if(data.selected !== null) {
        data = data.meta[data.selected];
        const newData = {};
        for(let i=0; i<fieldsCatched.length; i++) {
          if(data[fieldsCatched[i]]) {
            newData[fieldsCatched[i]] = data[fieldsCatched[i]];
          }
        }

        await api('PATCH', `/torrents/${this.props.torrent_id}`, {
          ...newData,
        });
      } else {
        await api('PATCH', `/torrents/${this.props.torrent_id}`);
      }
    } catch(e) {
      console.warn(e);
    } finally {
      this.props.stopLoading();
      this.props.onSubmitSuccess(this.props.name);
    }
  };

  select = (data) => {
    this.setState({initialValues: data});
  };

  render() {
    const {name, length, meta} = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          meta: this.props.meta,
          selected: null,
        }}
      >
        {props => {
          return (
            <form className="form-main form-meta" onSubmit={props.handleSubmit} noValidate>
              <div className="d-flex flex-row titles">
                <i className="fa fa-file" />&nbsp;<Octet value={length} />&nbsp; - {name}
              </div>

              <MetaSelect
                form={props.form}
                options={meta}
                fields={fieldsCatched}
              />

              <div className="buttons">
                <button type="submit" className="btn btn-secondary"><FormattedMessage id="form.meta.cancel.text"/></button>
                <button type="submit" className="btn btn-primary"><FormattedMessage id="form.meta.submit.text"/></button>
              </div>
            </form>
          );
        }
        }
      </Form>
    );
  }
}

MultipleMetaForm.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  torrent_id: PropTypes.number,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
  })
)
(injectIntl(MultipleMetaForm));