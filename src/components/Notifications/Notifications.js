import React, {Component} from 'react';
import {connect} from "react-redux";
import notificationsActions from "../../redux/notifications/actions";
import toaster from "toasted-notes";

class Notifications extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.notification && this.props.notification) {
      toaster.notify(
        this.props.notification.message,
      {
        position: "top-right",
        duration: 2000
      });
      this.props.stop();
    }
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({
    notification: state.notifications.notification
  }),
  (dispatch) => ({
    stop: () => dispatch(notificationsActions.stop())
  })
)(Notifications);
