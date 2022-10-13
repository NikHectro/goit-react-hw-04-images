import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onClose, bigImg, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDowm);
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    };
  }, [onClose]);

  const handleKeyDowm = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={bigImg} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string,
};
