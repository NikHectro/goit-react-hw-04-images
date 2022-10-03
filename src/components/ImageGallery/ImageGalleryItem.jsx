import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  smallImg,
  alt,
  bigImg,
  onImgClick,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={smallImg}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={() => onImgClick(bigImg, alt)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
