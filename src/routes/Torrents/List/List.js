import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LOADING} from "../../../config/const";
import TorrentsTable from "../../../components/Torrents/Table/TorrentsTable";
import {connect} from 'react-redux';

class List extends Component {
  render() {
    const {loading} = this.props;
    return (
      <section className={`main-block block-side block-content ${(loading & LOADING.TORRENTS) ? 'is-loading' : ''}`}>
        <TorrentsTable />
      </section>
    );
  }
}

List.propTypes = {
  loading: PropTypes.bool,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(List);
