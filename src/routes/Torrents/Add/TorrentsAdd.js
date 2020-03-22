import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../../hoc/withAuth";
import {injectIntl} from "react-intl";
import notificationsActions from '../../../redux/notifications/actions'
import TorrentForm from "../../../components/Forms/Forms/TorrentForm/TorrentForm";
import {LOADING} from "../../../config/const";

class TorrentsAdd extends Component {
  render() {
    const {loading} = this.props;
    return (
      <div className={`content ${(loading & LOADING.TORRENTS) !== 0 ? 'is-loading' : ''}`}>
        <section className="main-block block-content">
          <TorrentForm />
        </section>
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
