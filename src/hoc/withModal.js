import React from 'react';

export default function withModal(BaseComponent) {
  class withModalComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
    }

    static getDerivedStateFromProps(props, state) {
      if(props.show !== null) {
        return {show: props.show};
      }

      return state;
    }

    onClose = () => {
      this.setState({show: false});
    };

    render() {
      if(!this.state.show) {
        return null;
      }
      return (
        <div className="modal modal-backdrop">
          <div className="modal-component">
            <BaseComponent
              {...this.props}
              onClose={this.onClose}
            />
          </div>
        </div>
      );
    }
  }

  return withModalComponent;
}
