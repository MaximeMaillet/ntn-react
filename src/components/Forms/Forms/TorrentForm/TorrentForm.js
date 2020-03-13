import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import api from '../../../../libraries/api';
import FileInput from "../../Inputs/FileInput";
import loadingActions from "../../../../redux/loading/actions";
import notificationActions from "../../../../redux/notifications/actions";
import SelectInput from "../../Inputs/SelectInput";

import '../../forms.scss'
import './torrent-form.scss'

class TorrentForm extends Component {
  onSubmit = async(data) => {
    try {
      this.props.startLoading();
      if(!data || !data.torrents) {
        return {torrents: <FormattedMessage id="form.input.file.required" />}
      }
      const payload = new FormData();
      payload.append('server', data.server.value);
      for(let i=0; i<data.torrents.length; i++) {
        payload.append('torrents', data.torrents[i], data.torrents[i].name);
      }
      await api('POST', `/torrents`, payload, {'Content-Type': ''});
      this.props.launchNotification({message: this.props.intl.messages['form.generic.success']});
    } catch(e) {
      console.warn(e);
      if(e.data) {
        this.props.launchNotification(e.data);
        if(e.data.fields) {
          return e.data.fields;
        }
      }
    } finally {
      this.props.stopLoading();
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          server: this.props.currentServer ? {value: this.props.currentServer.name, label: this.props.currentServer.name} : null,
        }}
      >
        {props => (
          <form className={`form-main torrent-form ${this.props.className}`} onSubmit={props.handleSubmit} noValidate>
            <div className="d-flex flex-row">
              <FileInput
                name="torrents"
                required
                multiple
                accept={['application/x-bittorrent']}
              />

              <div className="form-select-torrent">
                <h3>Uploader un torrent :</h3>
                <SelectInput
                  className="form-input-align"
                  name="server"
                  required
                  label="Server :"
                  options={this.props.servers.map(s => ({
                    value: s.name,
                    label: s.name,
                  }))}
                />
              </div>
            </div>

            <button className="btn btn-primary" type="submit"><FormattedMessage id="form.torrent.submit.text"/></button>
          </form>
        )}
      </Form>
    );
  }
}

TorrentForm.defaultProps = {
  className: '',
};

TorrentForm.propTypes = {
  onSubmit: PropTypes.func,
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  fail: PropTypes.func,
  loaded: PropTypes.func,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    servers: state.server.servers,
    currentServer: state.server.current,
  }),
  (dispatch) => ({
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
    launchNotification: (message) => dispatch(notificationActions.start(message))
  })
)
(injectIntl(TorrentForm));