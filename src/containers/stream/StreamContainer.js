import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {LOADING} from "../../config/const";
import ResourceLoading from "../../components/Resources/ResourceLoading/ResourceLoading";
import {injectIntl} from "react-intl";
import ResourceError from "../../components/Resources/ResourceError/ResourceError";
import ResourceEmpty from "../../components/Resources/ResourceEmpty/ResourceEmpty";
import * as notificationsAction from "../../redux/notifications/actions";
import {getLanguage} from "../../libraries/locale";
import * as loadingActions from "../../redux/loading/actions";
import {stream as apiStream} from "../../libraries/api";

class StreamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: null,
      audios: null,
      subtitles: null,
      error: null,
      streamIndex: props.forceIndex || props.medias.findIndex((m) => m.stream),
    };
  }

  componentDidMount() {
    this.load(this.props.medias[this.state.streamIndex].stream);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.forceIndex !== this.props.forceIndex) {
      this.setState({streamIndex: this.props.forceIndex});
    }

    if(prevState.streamIndex !== this.state.streamIndex) {
      this.load(this.props.medias[this.state.streamIndex].stream);
    }
  }

  load = async(url) => {
    try {
      this.props.startLoading(LOADING.STREAM);
      const {videos, audios, subtitles} = await apiStream(url);
      this.setState({videos, audios, subtitles});
    } catch(e) {
      this.setState({error: e.message});
    } finally {
      this.props.stopLoading(LOADING.STREAM);
    }
  };

  next = () => {
    let newIndex = this.state.streamIndex+1;
    if(newIndex >= this.props.medias.length-1) {
      newIndex = this.props.medias.length-1;
    }

    this.setState({streamIndex: newIndex});
  };

  previous = () => {
    let newIndex = this.state.streamIndex-1;
    if(newIndex < 0) {
      newIndex = 0;
    }

    this.setState({streamIndex: newIndex});
  };


  render() {
    const {className, loading, component} = this.props;
    const {audios, videos, subtitles, error} = this.state;

    if(loading & LOADING.STREAM) {
      return <ResourceLoading
        className={className}
        title={this.props.intl.messages['container.stream.loading.title']}
        text={this.props.intl.messages['container.stream.loading.text']}
      />;
    }

    console.log(error)

    if(error) {
      return <ResourceError
        className={className}
        title={this.props.intl.messages['container.stream.error.title']}
        text={error}
      />;
    }

    if(!videos || videos.length === 0 || !audios || audios.length === 0) {
      return <ResourceEmpty
        className={className}
        title={this.props.intl.messages['container.stream.empty.title']}
        text={this.props.intl.messages['container.stream.empty.text']}
      />;
    }


    console.log('-- CONTAINER --')
    console.log(audios);
    console.log(videos);

    return React.createElement(
      component,
      {
        className,
        videos,
        audios,
        subtitles,
        next: this.next,
        previous: this.previous,
      }
    );
  }
}

StreamContainer.defaultProps = {
  className: '',
};

StreamContainer.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  medias: PropTypes.array.isRequired,
  forceIndex: PropTypes.number,
  loading: PropTypes.number,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
    startToaster: (type, formatted) => dispatch(notificationsAction.start(type, formatted))
  })
)(injectIntl(StreamContainer));
