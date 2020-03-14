import {FormattedMessage} from "react-intl";
import React from "react";

export default (accepts, message) => {
  return (data) => {
    if(data) {
      if(typeof data !== 'string' && accepts.indexOf(data[0].type) === -1) {
        return message ? message : <FormattedMessage id="form.validator.accepts" values={{accepts: accepts.join(', ')}} />
      }
    }
    return null;
  }
};