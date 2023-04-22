import {
  Image,
  IconButton,
  Link,
  Switch,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import Book from "./components/book";

function IndexPage() {
  const { toggleColorMode } = useColorMode();
  return (
    <Stack m="1rem">
      <Switch onChange={toggleColorMode}>Dark mode</Switch>
      <Book label="react-book" icon={<Image src="/favicon.ico"></Image>}></Book>
    </Stack>
  );
}

export default IndexPage;
