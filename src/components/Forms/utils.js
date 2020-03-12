import React from 'react';

export const validate = (...validators) => {
  return (data) => {
    let errors = [];
    validators
      .map((validator, key) => {
        if(validator && typeof validator === 'function' && validator(data)) {
          errors.push(<span key={key} className="error">{validator(data)}</span>);
        }

        return validator;
      }
    );

    errors = errors.filter((e) => e !== undefined && e !== null);
    if(errors.length === 0) {
      return null;
    }

    return errors;
  };
};