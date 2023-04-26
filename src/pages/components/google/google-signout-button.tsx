import AppFirebase from "@/lib/firebase";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

const GoogleSignOutButton = () => {
  return (
    <Box as="nav" borderBottom="1px solid lightgrey">
      <Button
        m="1rem"
        variant="unstyled"
        leftIcon={<ArrowLeftIcon />}
        onClick={() => AppFirebase.auth().signOut()}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default GoogleSignOutButton;
