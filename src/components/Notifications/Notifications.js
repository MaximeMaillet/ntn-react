import React, {Component} from 'react';
import {connect} from "react-redux";
import notificationsActions from "../../redux/notifications/actions";
import toaster from "toasted-notes";

class Notifications extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.active !== this.props.active && this.props.active) {
      const {style, formatted: {title, message}} = this.props;

      toaster.notify(({onClose}) => (
        <div className={`notification ${style}`} onClick={onClose}>
          <span className="icon">
            {style === 'success' && <i className="fa fa-check-circle" />}
            {style === 'danger' && <i className="fa fa-exclamation-circle" />}
          </span>
          <div className="d-flex flex-column">
            <div className="title">{title}</div>
            <div className="message">{message}</div>
          </div>
        </div>
        ),
        {
          position: "top-right",
          duration: 3000,
          type: 'success',
        }
      );
      this.props.stop();
    }
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({
    active: state.notifications.active,
    formatted: state.notifications.formatted,
    style: state.notifications.style,
  }),
  (dispatch) => ({
    stop: () => dispatch(notificationsActions.stop())
  })
)(Notifications);
