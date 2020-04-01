import React, {Component} from 'react';
import TorrentContainer, {TYPE} from "../../../containers/torrents/TorrentContainer";
import TorrentsTable from "../../../components/Torrents/Table/TorrentsTable";
import {FormattedMessage} from "react-intl";
import withAdmin from "../../../hoc/withAdmin";
import {Link} from "react-router-dom";

class List extends Component {
  render() {
    return (
      <section className="main-block block-side block-content">
        <div className="d-flex flex-row">
          <h1><FormattedMessage id="route.torrents.h1" /></h1>
          <div className="d-flex ml-auto mb-1">
            <Link to="/torrents/add" className="btn btn-primary">
              <i className="fa fa-plus" />
              <FormattedMessage id="route.torrents.add" />
            </Link>
          </div>
        </div>
        <TorrentContainer
          className="mt-2"
          type={TYPE.ALL}
          component={TorrentsTable}
        />
      </section>
    );
  }
}

export default withAdmin(List);
