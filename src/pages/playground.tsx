import { Box, Stack } from "@chakra-ui/react";
import MarkDown from "./components/mark-down/mark-down";

const Sidebar = () => {
  return (
    <Box>
      <Stack spacing={4} p={4}>
        <MarkDown content="This is a line\n\nThis is another."/>
      </Stack>
    </Box>
  );
};

export default Sidebar;
