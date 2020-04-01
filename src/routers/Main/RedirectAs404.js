import React from "react";
import {Redirect} from "react-router-dom";

export const RedirectAs404 = (props) => {
  return <Redirect
    to={{
      pathname: "/not-found",
      state: props,
    }}
  />
};