import { List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { SideBarProps as SharedSideBarProps } from "@/types/props/sidebar.props";

type SideBarProps = SharedSideBarProps;

const SideBar: React.FC<SideBarProps> = ({
  chapterStructure,
  onChapterClick,
  activeSectionFileName,
}) => {
  return (
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
  );
};

export default SideBar;
