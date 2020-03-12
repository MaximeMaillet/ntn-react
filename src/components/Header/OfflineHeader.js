import React, {Component} from 'react';
import {Link} from "react-router-dom";

import logo from '../../styles/medias/logo.svg'
import './header.scss';

class OfflineHeader extends Component {
  render() {
    return (
      <header className="global-header offline-header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className="titles">
          <h2>NTN</h2>
          <h3>Download & upload</h3>
        </div>
      </header>
    );
  }
}

export default OfflineHeader;
