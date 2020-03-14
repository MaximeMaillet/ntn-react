import {FormattedMessage} from "react-intl";
import React from "react";

export default (maxSize, message) => {
  return (data) => {
    if(data && data[0] && data[0].size > maxSize) {
      return message ? message : <FormattedMessage id="form.validator.max_file_size" values={{maxSize: maxSize/1024}} />
    }

    return null;
  };
};