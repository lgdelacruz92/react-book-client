import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

interface TopNavProps {
  isOpen: boolean;
  onOpen: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ isOpen, onOpen }) => {
  const btnRef = useRef(null);

  return (
    <nav>
      <Box>
        <IconButton
          ref={btnRef}
          icon={<HamburgerIcon />}
          aria-label="Chapters hamburger"
          onClick={onOpen}
        ></IconButton>
      </Box>
    </nav>
  );
};

export default TopNav;
