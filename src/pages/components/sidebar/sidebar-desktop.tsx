import { Box, Heading, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import SideBar from "./sidebar";
import { SideBarProps as SharedSideBarProps } from "@/types/props/sidebar.props";

type SideBarDesktopProps = SharedSideBarProps;

const SideBarDesktop: React.FC<SideBarDesktopProps> = (props) => {
  return (
    <Box minW="15rem" p="1rem">
      <Heading as="h2">Chapters</Heading>
      <SideBar {...props} />
    </Box>
  );
};

export default SideBarDesktop;
