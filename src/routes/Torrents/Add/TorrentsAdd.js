import React, {Component} from 'react';
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import TorrentForm from "../../../components/Forms/Forms/TorrentForm/TorrentForm";
import {LOADING} from "../../../config/const";
import api from "../../../libraries/api";
import MultipleMetaForm from "../../../components/Forms/Forms/MetaForm/MultipleMetaForm";
import loadingActions from "../../../redux/loading/actions";

import './torrent-add.scss'
import withAdmin from "../../../hoc/withAdmin";
import shouldAuth from "../../../hoc/shouldAuth";

class TorrentsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      servers: [],
    };
  }

  componentDidMount() {
    this.loadServers();
  }

  loadServers = async () => {
    try {
      this.props.startLoading(LOADING.SERVER);
      const servers = (await api('GET', '/servers')).data;
      this.setState({servers});
    } catch (e) {
      console.warn(e);
    } finally {
      this.props.stopLoading(LOADING.SERVER);
    }
  };

  onTorrentSubmitSuccess = (result) => {
    this.setState({files: result});
  };

  onMetaSubmitSuccess = (name) => {
    const files = [];
    for (let i = 0; i < this.state.files.length; i++) {
      if (this.state.files[i].name !== name) {
        files.push(this.state.files[i]);
      }
    }

    this.setState({files});
  };

  render() {
    const {files, servers} = this.state;
    const {loading} = this.props;
    return (
      <div className={`content`}>
        <section
          className={`main-block block-content block-torrent-add ${(loading & LOADING.TORRENTS || loading & LOADING.SERVER) !== 0 ? 'is-loading' : ''}`}
        >
          {
            (files && files.length > 0) ?
              <React.Fragment>
                <h1><FormattedMessage id="form.meta.title_choosing"/></h1>
                {files.map((file, key) => {
                  return <MultipleMetaForm
                    key={key}
                    {...file}
                    onSubmitSuccess={this.onMetaSubmitSuccess}
                  />
                })}
              </React.Fragment>
              :
              !(loading & LOADING.SERVER) ?
                (servers && servers.length > 0) ?
                  <TorrentForm
                    servers={servers}
                    onSubmitSuccess={this.onTorrentSubmitSuccess}
                  />
                  :
                  <div className="no-server">
                    <h3><FormattedMessage id="component.torrents.add.no_server"/></h3>
                    <p><FormattedMessage id="component.torrents.add.no_server.text"/></p>
                  </div>
                : ''
          }
        </section>
      </div>
    );
  }
}

export default shouldAuth(withAdmin(connect(
  (state) => ({
    user: state.auth.user,
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)(injectIntl(TorrentsAdd))));
