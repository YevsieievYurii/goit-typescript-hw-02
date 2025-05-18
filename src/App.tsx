import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import axios from "axios";
import { Image } from "./types";

interface UnsplashApiImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
}

interface UnsplashApiResponse {
  results: UnsplashApiImage[];
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const fetchImages = async (
    query: string,
    currentPage: number
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<UnsplashApiResponse>(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, page: currentPage, per_page: 16 },
          headers: {
            Authorization: `Client-ID C86uG7l__bnngaFQsz0TNcXzqhUn3uRbrxqWRqH66ms`,
          },
        }
      );

      const fetchedImages: Image[] = response.data.results.map(
        (img: UnsplashApiImage) => ({
          id: img.id,
          webformatURL: img.urls.small,
          tags: img.alt_description || "Unsplash image",
        })
      );

      setImages((prev) => [...prev, ...fetchedImages]);
    } catch (err) {
      console.error(err);
      setError("Pardon for an enchanted image. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    setImages([]);
    setPage(1);
    fetchImages(term, 1);
  };

  const handleLoadMore = (): void => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(searchTerm, nextPage);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
