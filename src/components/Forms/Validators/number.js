import {FormattedMessage} from "react-intl";
import React from "react";

export default (data) => {
  if(typeof data !== 'number' && isNaN(data)) {
    return <FormattedMessage id="form.generic.error.not_number" />;
  }

  return null;
};