import {FormattedMessage} from "react-intl";
import React from "react";

export default (accepts, message) => {
  return (data) => {
    if(data) {
      if(accepts.indexOf(data[0].type) === -1) {
        return message ? message : <FormattedMessage id="form.input.file.accept_fail"/>
      }
    }
    return null;
  }
};