import { Box, Stack } from "@chakra-ui/react";
import SidebarDrawer from "./components/sidebar-drawer";

const Sidebar = () => {
  return (
    <Box>
      <Stack spacing={4} p={4}>
        <SidebarDrawer />
      </Stack>
    </Box>
  );
};

export default Sidebar;
