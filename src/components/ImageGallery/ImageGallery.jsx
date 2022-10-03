import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images, onImgClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          bigImg={largeImageURL}
          alt={tags}
          onImgClick={onImgClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;
