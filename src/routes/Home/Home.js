import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import ReactPlayer from "react-player";
import SideMenu from "../../containers/Torrent/TorrentContainer";
import {LOADING} from "../../config/const";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-main container-side-menu">
          <div className={`content`}>
            <section className="d-flex flex-row main-block">

              <div className="d-flex">
                {/*<ReactPlayer url={`${process.env.REACT_APP_API_URL}/stream`} controls />*/}
              </div>
              <div className="d-flex">
                <video id="videoPlayer" autoPlay={true} controls>
                  <source src={`http://localhost:8099/ws/stream/42738B6996E715D57C2F09DB148CB7E2E1DFDCA7?file=${encodeURIComponent('/BallOfFire/BallOfFire.avi')}`} type="video/mp4" />
                </video>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.user,
  })
)(withAuth(Home));
