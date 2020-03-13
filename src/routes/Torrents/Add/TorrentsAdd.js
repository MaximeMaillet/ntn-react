import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../../hoc/withAuth";
import Header from "../../../components/Header/Header";
import {FormattedMessage, injectIntl} from "react-intl";
import notificationsActions from '../../../redux/notifications/actions'
import TorrentForm from "../../../components/Forms/Forms/TorrentForm/TorrentForm";

import './torrent-add.scss'

class TorrentsAdd extends Component {
  render() {
    return (
      <div className="parent">
        <Header />
        <div className="d-flex flex-row">
          <section className="main-block bloc-torrent-add">
            <TorrentForm />
          </section>
        </div>
      </div>
    );
  }
}

export default withAuth(connect(
  (state) => ({
    user: state.user.user,
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startNotif: (data) => dispatch(notificationsActions.start(data))
  })
)(injectIntl(TorrentsAdd)));
