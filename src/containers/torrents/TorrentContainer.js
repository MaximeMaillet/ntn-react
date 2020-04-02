import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTorrents from "../../hoc/withTorrents";
import {connect} from "react-redux";
import {LOADING} from "../../config/const";
import ResourceLoading from "../../components/Resources/ResourceLoading/ResourceLoading";
import {injectIntl} from "react-intl";
import ResourceError from "../../components/Resources/ResourceError/ResourceError";
import ResourceEmpty from "../../components/Resources/ResourceEmpty/ResourceEmpty";
import * as notificationsAction from "../../redux/notifications/actions";

export const TYPE = {
  ALL: 1,
  USER: 2,
  ONE: 3
};

class TorrentContainer extends Component {
  componentDidMount() {
    if(this.props.type === TYPE.ALL) {
      this.props.loadTorrents();
    } else if(this.props.type === TYPE.USER) {
      if(!this.props.profile_id) {
        throw new Error('You should precise profile id');
      }
      this.props.loadTorrentUser(this.props.profile_id);
    } else if(this.props.type === TYPE.ONE) {
      if(!this.props.torrent_id) {
        throw new Error('You should precise torrent id');
      }

      this.props.loadTorrent(this.props.torrent_id);
    }
  }

  onSubmitSuccess = (torrent) => {
    if(this.props.torrent) {
      this.props.startToaster('success', {
        title: this.props.intl.messages['form.torrent.update.success']
      });
    } else {
      this.props.startToaster('success', {
        title: this.props.intl.messages['form.torrent.create.success']
      });
    }
  };

  onSubmitError = (error) => {
    if(this.props.torrent) {
      this.props.startToaster('danger', {
        title: this.props.intl.messages['form.torrent.update.error'],
        message: error.data.message,
      });
    } else {
      this.props.startToaster('danger', {
        title: this.props.intl.messages['form.torrent.create.error'],
        message: error.data.message,
      });
    }
  };

  render() {
    const {torrent, type, torrents, torrentError, torrentNotFound, loading, component, className} = this.props;

    if(loading & LOADING.TORRENTS) {
      return <ResourceLoading
        className={className}
        title={this.props.intl.messages['container.torrent.loading.title']}
        text={this.props.intl.messages['container.torrent.loading.text']}
      />;
    }

    if(torrentError || torrentNotFound) {
      return <ResourceError
        className={className}
        title={this.props.intl.messages['container.torrent.error.title']}
        text={torrentError.message}
      />;
    }

    if(
      (type === TYPE.ALL || type === TYPE.USER) && (!torrents || torrents.length === 0) ||
      (type === TYPE.ONE && !torrent)
    ) {
      return <ResourceEmpty
        className={className}
        title={this.props.intl.messages['container.torrent.empty.title']}
        text={this.props.intl.messages['container.torrent.empty.text']}
      />;
    }

    return React.createElement(
      component,
      {
        className,
        torrents,
        torrent,
        pauseTorrent: this.props.pauseTorrent,
        resumeTorrent: this.props.resumeTorrent,
        removeTorrent: this.props.removeTorrent,
        onSubmitSuccess: this.onSubmitSuccess,
        onSubmitError: this.onSubmitError,
      }
    );
  }
}

TorrentContainer.defaultProps = {
  className: '',
};

TorrentContainer.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  torrent_id: PropTypes.number,
  profile_id: PropTypes.number,
  type: PropTypes.oneOf(Object.values(TYPE)).isRequired,
  torrents: PropTypes.array,
  torrent: PropTypes.object,
  torrentError: PropTypes.object,
  torrentNotFound: PropTypes.bool,
  loading: PropTypes.number,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startToaster: (type, formatted) => dispatch(notificationsAction.start(type, formatted))
  })
)(withTorrents(injectIntl(TorrentContainer)));
