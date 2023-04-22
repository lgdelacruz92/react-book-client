import { Box, Heading, Flex, Center, Button } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import Markdown from "./components/mark-down";
import { useClipboard } from "@chakra-ui/hooks";

function MarkDownEditor() {
  const [content, setContent] = useState("");
  const markdownRef = useRef(null);
  const { onCopy, setValue, hasCopied } = useClipboard("");

  const handleContentChange = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const text = event.currentTarget.innerText;
    setContent(text);
  };

  useEffect(() => {
    if (markdownRef.current) {
      console.log(markdownRef.current);
      setValue(`${(markdownRef.current as any)?.innerHTML}`);
    }
  }, [markdownRef.current, content]);

  return (
    <Box mx="auto" my={10}>
      <Heading as="h3" textAlign="center" mb="1rem">
        Content Creator
      </Heading>
      <Center>
        <Flex
          alignContent="flex-start"
          alignItems="flex-start"
          justifyContent="flex-start"
          justifyItems="flex-start"
        >
          <Box
            border="1px solid white"
            borderRadius="5px 0px 0px 5px"
            minHeight="22rem"
            minW="30rem"
            p="1rem"
            contentEditable
            onInput={handleContentChange}
          />
          <Box minHeight="22rem" minW="30rem" position="relative" p="1rem">
            {/* <CopyToClipboardButton text={html}></CopyToClipboardButton> */}
            <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            <Markdown ref={markdownRef} content={content} />
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}

export default MarkDownEditor;
