import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";
import { Image } from "../../types";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image | null;
}

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={styles.image}
        />
      )}
    </Modal>
  );
};

export default ImageModal;
