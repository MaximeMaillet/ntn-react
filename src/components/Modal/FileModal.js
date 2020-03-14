import React from 'react';
import PropTypes from 'prop-types';
import withModal from "../../hoc/withModal";
import {Link} from "react-router-dom";

class FileModal extends React.PureComponent {
  render() {
    const {torrent} = this.props;
    return (
      <ul>
        {torrent.files.map((file, key) => {
          console.log(file);
          return (
            <li key={key}>
              <Link className="btn btn-primary" to={`/torrents/${torrent.id}/files/${file.id}`}>{file.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

FileModal.propTypes = {
  onClose: PropTypes.func,
};

export default withModal(FileModal)