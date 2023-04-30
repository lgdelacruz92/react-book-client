import AppFirebase from "@/lib/firebase";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const GoogleSignOutButton = () => {
  const router = useRouter();
  return (
    <Box as="nav" borderBottom="1px solid lightgrey">
      <Button
        m="1rem"
        variant="unstyled"
        leftIcon={<ArrowLeftIcon />}
        onClick={() => {
          AppFirebase.auth().signOut();
          router.push("/signin");
        }}
      >
        Sign out
      </Button>
    </Box>
  );
};

export default GoogleSignOutButton;
