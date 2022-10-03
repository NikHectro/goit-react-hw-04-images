import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <button type="button" onClick={onLoadMoreClick} className="Button">
      Load more
    </button>
  );
};

Button.protoTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
