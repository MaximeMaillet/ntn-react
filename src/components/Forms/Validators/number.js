import {FormattedMessage} from "react-intl";
import React from "react";

export default (data) => {
  if(data & typeof data !== 'number' && isNaN(data)) {
    return <FormattedMessage id="form.validator.not_number" />;
  }

  return null;
};