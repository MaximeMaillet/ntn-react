import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Genres extends Component {
  render() {
    const {genres} = this.props;
    if(!genres || genres.length === 0) {
      return null;
    }

    return genres.map((genre, key) => {
      return <span key={key} className="badge badge-pill badge-secondary mr-1">{genre.name}</span>
    })
  }
}

Genres.propTypes = {
  className: PropTypes.string,
  genres: PropTypes.array,
};

export default Genres;
