import { Box, Heading, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ChapterType } from "@/types/chapter-type";
import { SectionType } from "@/types/section-type";

interface SideBarProps {
  chapterStructure: ChapterType[];
  onChapterClick: (section: SectionType) => void;
  activeSectionFileName: string;
}
const SideBar: React.FC<SideBarProps> = ({
  chapterStructure,
  onChapterClick,
  activeSectionFileName,
}) => {
  return (
    <Box minW="15rem" p="1rem">
      <Heading as="h2">Chapters</Heading>
      <nav>
        <List>
          {chapterStructure.map((chapterItem, i) => {
            return (
              <ListItem key={`link-${i}`} mt="0.5rem">
                <Text fontWeight="bold">{`${chapterItem.title}`}</Text>
                <List>
                  {chapterItem.sections.map((section, j) => {
                    return (
                      <ListItem
                        onClick={() => onChapterClick(section)}
                        p=".5rem"
                        key={`section-${j}`}
                        color={
                          section.fileName === activeSectionFileName
                            ? "green.500"
                            : "current"
                        }
                      >
                        <ListIcon as={ChevronRightIcon} color="green.500" />
                        {`${section.title}`}
                      </ListItem>
                    );
                  })}
                </List>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default SideBar;
