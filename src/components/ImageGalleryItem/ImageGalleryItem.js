import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ image, alt, largeImage, onClick }) {
  return (
    <li className={s.imageGalleryItem} onClick={() => onClick(largeImage, alt)}>
      <img src={image} alt={alt} className={s.imageGalleryItem-image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
