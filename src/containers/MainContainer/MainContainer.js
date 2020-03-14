import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Home from "../../routes/Home/Home";
import ProfileContainer from "../Profile/ProfileContainer";
import withAuth from "../../hoc/withAuth";


class MainContainer extends Component {
  render() {
    const {globalLoading} = this.props;
    return (
      <React.Fragment>
        <div className={`parent ${globalLoading ? 'is-loading': ''}`}>
          <Route path="/profile"><ProfileContainer /></Route>
          <Route exact path="/"><Home/></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(MainContainer);
