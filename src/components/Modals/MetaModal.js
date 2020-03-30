import React, {Component} from 'react';
import PropTypes from 'prop-types';


class MetaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen || false,
    }
  }

  openModal = () => {
    this.setState({isOpen: true});
  };

  closeModal = () => {
    this.setState({isOpen: false});
  };

  render() {
    return (
      <Modal
        isOpen={this.state.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      />
    );
  }
}

MetaModal.propTypes = {

};

export default MetaModal;