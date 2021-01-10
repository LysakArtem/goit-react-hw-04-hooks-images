import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

export default function App() {
  const [searchImages, setSearchImages] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedlargeImg, setSelectedlargeImg] = useState('');
  const [selectedAltImg, setSelectedAltImg] = useState('');

  const toggleModal = (img, alt) => {
    setShowModal(!showModal);
    setSelectedlargeImg(img);
    setSelectedAltImg(alt);
  };

  
  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedlargeImg} alt={selectedAltImg} />
        </Modal>
      )}
      <Searchbar onSubmit={setSearchImages} />
      <ImageGallery searchImages={searchImages} openModal={toggleModal} />
    </>
  );
}
