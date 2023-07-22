import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClickImage,
}) => {
  return (
    <div>
      <li className={styles.imageGallery__item}>
        <img
          className={styles.imageGallery__image}
          onClick={() => onClickImage(largeImageURL)}
          src={webformatURL}
          alt={tags}
          largeimage={largeImageURL}
        />
      </li>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
