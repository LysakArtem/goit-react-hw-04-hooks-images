import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import imageAPI from '../../servises/fetch-api';
import PropTypes from 'prop-types';

export default function ImageGallery({ searchImages, openModal }) {
  const [images, setImages] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.searchImages !== this.props.searchImages) {
  //     this.setState({ images: [], page: 1 });
  //     this.fetchData();
  //   } else if (prevState.page !== this.state.page) {
  //     this.fetchData();
  //   }
  // }

  useEffect(() => {
    if (!searchImages) {
      return;
    }
    setStatus('pending');
    imageAPI
      .fetchData(searchImages, currentPage)
      .then((res) => {
        setImages((s) => [...s, ...res.hits]);
        setTotalPage(res.total);
      })
      .finally(() => setStatus('resolved'));
  }, [currentPage, searchImages]);

  const handlerLoadMoreClick = () => {
    setCurrentPage((s) => s + 1);
  };

  const remainingPages = totalPage - currentPage * 12;
  if (status === 'idle') {
    return <div className={s.question}>Что хотите найти?</div>;
  }
  if (status === 'pending') {
    return (
      <div className="spiner">
        <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={s.imageGallery}>
          {totalPage !== 0 ? (
            images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                image={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
                onClick={openModal}
              />
            ))
          ) : (
            <div>По вашему запросу ничего не найдено!</div>
          )}
        </ul>
        {remainingPages > 0 && <Button onClick={handlerLoadMoreClick} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImages: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
