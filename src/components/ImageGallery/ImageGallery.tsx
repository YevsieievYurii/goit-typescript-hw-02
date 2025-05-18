import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images || images.length === 0) return null;

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.galleryItem}
          onClick={() => onImageClick(image)}
        >
          <ImageCard src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
