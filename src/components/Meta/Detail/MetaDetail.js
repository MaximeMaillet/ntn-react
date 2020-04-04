import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Runtime from "../../Torrents/Runtime/Runtime";
import ReleaseDate from "../../Torrents/ReleaseDate/ReleaseDate";
import MediaType from "../../Torrents/MediaType/MediaType";
import Genres from "../../Torrents/Genres/Genres";
import Overview from "../../Torrents/Overview/Overview";

import './meta-details.scss';

class MetaDetail extends Component {
  render() {
    const {className, title, poster, media_type, genres, overview, release_date, runtime} = this.props;
    return (
      <div className={`meta-detail ${className}`}>
        <div className="poster">
          <img src={poster} alt="poster" onClick={this.props.onPosterClick} />
        </div>
        <div className="details">
          <div className="title">
            <h2>{title}</h2>
            <MediaType media_type={media_type} />
          </div>
          <div className="date-runtime">
            <ReleaseDate date={release_date} /><span>-</span><Runtime runtime={runtime} />
          </div>
          <div className="genres">
            <Genres genres={genres} />
          </div>
          <Overview text={overview} length={350} />
        </div>
      </div>
    );
  }
}

MetaDetail.defaultProps = {
  className: '',
  onPosterClick: () => null,
};

MetaDetail.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  runtime: PropTypes.number,
  onPosterClick: PropTypes.func,
};

export default MetaDetail;