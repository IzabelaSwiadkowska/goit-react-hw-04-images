import React from 'react';
import { useState, useEffect } from 'react';
import fetchImages from './api/fetchApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix';
import notifySettings from 'components/api/notiflix';

import { animateScroll } from 'react-scroll';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        return Notify.info('Sorry, nothing found', notifySettings);
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      console.log(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = query => {
    setSearchQuery(query);
    setIsLoading(true);
    setPage(1);
    setImages([]);
    setLoadMore(false);
    if (query === '') {
      Notify.info('Please enter something to find', notifySettings);
      setIsLoading(false);
    }
  };
  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevState => prevState + 1);
    scrollOnButton();
  };

  const scrollOnButton = () => {
    animateScroll.scrollToBottom({
      duration: 1500,
      delay: 1,
      smooth: 'easeInQuint',
    });
  };
  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };
  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div>
      <Searchbar onSubmit={onSearch} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onClickImage={onClickImage} />
      {loadMore && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};
