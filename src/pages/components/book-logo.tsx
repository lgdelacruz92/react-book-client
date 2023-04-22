import { ImageProps, Image } from "@chakra-ui/react";

const BookLogo: React.FC<ImageProps> = (props) => {
  return (
    <Image
      {...props}
      w="3rem"
      h="auto"
      borderRadius="50%"
      boxShadow="0px 0px .5rem .5rem rgba(0, 0, 0, 0.50)"
    ></Image>
  );
};

export default BookLogo;
