import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {LOADING} from "../../config/const";
import ResourceLoading from "../../components/Resources/ResourceLoading/ResourceLoading";
import ResourceError from "../../components/Resources/ResourceError/ResourceError";
import ResourceEmpty from "../../components/Resources/ResourceEmpty/ResourceEmpty";
import notificationActions from "../../redux/notifications/actions";
import loadingActions from "../../redux/loading/actions";
import api from "../../libraries/api";

class MetaSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      results: null,
      error: null,
    }
  }

  onSearch = async(data) => {
    try {
      this.props.startLoading(LOADING.META_SEARCH);
      this.setState({search: data});
      console.log(data);
      const result = await api('GET', '/meta/search', data);
      this.setState({results: result.data});
    } catch(e) {

    } finally {
      this.props.stopLoading(LOADING.META_SEARCH);
    }
  };

  onSelectItem = (item) => {
    if(this.props.onSelectItem) {
      this.props.onSelectItem(item);
    }
  };

  render() {
    const {search, results, error} = this.state;
    const {loading, component, className} = this.props;

    if(error) {
      return <ResourceError
        className={className}
        title={this.props.intl.messages['container.meta_search.error.title']}
        text={error}
      />;
    }

    if(loading & LOADING.META_SEARCH) {
      return <ResourceLoading
        className={className}
        title={this.props.intl.messages['container.meta_search.loading.title']}
        text={this.props.intl.messages['container.meta_search.loading.text']}
      />
    }

    if(results && results.length === 0) {
      return <ResourceEmpty
        className={className}
        title={this.props.intl.messages['container.meta_search.empty.title']}
        text={this.props.intl.messages['container.meta_search.empty.text']}
      />;
    }

    return React.createElement(
      component,
      {
        className,
        results,
        search,
        onSearch: this.onSearch,
        onSelectItem: this.onSelectItem,
      }
    );
  }
}

MetaSearchContainer.defaultProps = {
  className: '',
};

MetaSearchContainer.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  loading: PropTypes.number,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startToaster: (type, message) => dispatch(notificationActions.start(type, message)),
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)(injectIntl(MetaSearchContainer));
