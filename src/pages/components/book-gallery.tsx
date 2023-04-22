import { Wrap } from "@chakra-ui/react";

interface BookGalleryProps {
  // Define component props here
  children?: React.ReactElement;
}

const BookGallery: React.FC<BookGalleryProps> = ({ children }) => {
  return <Wrap p="2rem">{children}</Wrap>;
};

export default BookGallery;
