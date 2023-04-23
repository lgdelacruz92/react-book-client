import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import TopNav from "../top-nav";
import { SideBarProps as SharedSideBarProps } from "@/types/props/sidebar.props";
import SideBar from "./sidebar";

type SideBarMobileProps = SharedSideBarProps;

const SideBarMobile: React.FC<SideBarMobileProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <TopNav isOpen={isOpen} onOpen={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chapters</DrawerHeader>

          <DrawerBody>
            <SideBar {...props} />
          </DrawerBody>

          <DrawerFooter>
            <IconButton
              aria-label="Close drawer"
              onClick={onClose}
              icon={<SmallCloseIcon />}
            ></IconButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarMobile;
