import React from 'react';
import {FormattedMessage} from "react-intl";

export default (message) => (data) => {
  if(!data) {
    return message ? message : <FormattedMessage id="form.validator.required" />;
  }

  return null;
};