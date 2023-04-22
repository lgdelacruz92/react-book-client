import type { ChapterSlugType } from "@/types/chapter-slug-type";
import { Box, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface SideBarProps {
  links: ChapterSlugType[];
  onChapterClick: (chapter: string) => void;
  activeLink: string;
}
const SideBar: React.FC<SideBarProps> = ({
  links,
  onChapterClick,
  activeLink,
}) => {
  return (
    <Box minW="15rem" p="1rem">
      <Heading as="h2">Chapters</Heading>
      <nav>
        <List>
          {links.map((link, i) => {
            return (
              <ListItem
                key={`link-${i}`}
                onClick={() => onChapterClick(link.fileName)}
                id={`${link.fileName}`}
                mt="0.5rem"
                color={activeLink === link.fileName ? "green.500" : "current"}
              >
                <ListIcon as={ChevronRightIcon} color="green.500" />
                {`${link.title}`}
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default SideBar;
