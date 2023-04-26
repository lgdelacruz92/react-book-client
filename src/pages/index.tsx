import { Stack } from "@chakra-ui/react";
import Book from "./components/book";
import BookGallery from "./components/book-gallery";
import BookLogo from "./components/book-logo";

function IndexPage() {
  return (
    <Stack m="1rem">
      <BookGallery>
        <Book
          label="Introduction To React"
          icon={<BookLogo src="/favicon.ico"></BookLogo>}
        ></Book>
      </BookGallery>
    </Stack>
  );
}

export default IndexPage;
