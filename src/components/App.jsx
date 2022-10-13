import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchAPI } from 'api/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImgs, setTotalImgs] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [searchQuery, page]);
  //   componentDidUpdate(prevProps, prevState) {
  //   const request = this.state.searchQuery;
  //   const page = this.state.page;

  //   if (prevState.searchQuery !== request || prevState.page !== page) {
  //     this.fetchImages();
  //   }
  // }

  const fetchImages = () => {
    setLoading(true);
    fetchAPI(searchQuery, page)
      .then(data => {
        if (!data.hits.length) {
          setError(`Nothing to show for "${searchQuery}"`);
        } else {
          setImages([...images, ...data.hits]);
          setTotalImgs(data.totalHits);
          setAlt(data.tags);
        }
      })
      .then(scroll)
      .catch(error => setError({ error }))
      .finally(() => setLoading(false));
  };

  const getInputSubmit = query => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError('');
  };

  const handleLoadMoreBtn = () => {
    setPage(prevStage => prevStage + 1);
    // this.setState(prevStage => ({ page: prevStage.page + 1 }));
    // ({ page }) => ({ page: page + 1 })
  };

  const scroll = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
    // this.setState(state => ({ showModal: !state.showModal }));
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    // this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  // const { loading, images, error, totalImgs, alt, largeImageURL, showModal } =
  //   this.state;
  return (
    <>
      <Searchbar onSubmit={getInputSubmit} />
      {loading && <Loader />}
      {!loading && error && <h1>{error}</h1>}
      <ImageGallery images={images} onImgClick={openModal} />
      {images.length !== 0 && images.length < totalImgs && (
        <Button onLoadMoreClick={handleLoadMoreBtn} />
      )}
      {showModal && (
        <Modal onClose={toggleModal} bigImg={largeImageURL} alt={alt} />
      )}
      <ToastContainer />
    </>
  );
};
