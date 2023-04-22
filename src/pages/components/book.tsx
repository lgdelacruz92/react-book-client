import { Link, Stack, Text, WrapItem, useColorMode } from "@chakra-ui/react";

interface BookProps {
  label: string;
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const Book: React.FC<BookProps> = ({ icon, label }) => {
  const { colorMode } = useColorMode();
  return (
    <WrapItem
      _hover={{
        bg: colorMode === "dark" ? "gray.600" : "gray.100",
        fontWeight: "bold",
      }}
      borderRadius="10px"
      p="1rem"
    >
      <Link href="/chapters">
        <Stack alignItems="center" spacing={5}>
          {icon}
          <Text>{label}</Text>
        </Stack>
      </Link>
    </WrapItem>
  );
};

export default Book;
