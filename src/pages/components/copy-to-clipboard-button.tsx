import { Button } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { FaCopy } from "react-icons/fa";

const CopyToClipboardButton = ({ text }: { text: string }) => {
  console.log(text);
  const { hasCopied, onCopy } = useClipboard(text);

  return (
    <Button onClick={onCopy} colorScheme="teal" size="sm" mr={2}>
      <Icon as={FaCopy} mr={1} />
      {hasCopied ? "Copied!" : "Copy to clipboard"}
    </Button>
  );
};

export default CopyToClipboardButton;
