import { Box, Center, Flex } from "@chakra-ui/react";
import type { ChapterType } from "@/types/data-types/chapter-type";
import "highlight.js/styles/monokai.css";
import { useEffect, useState } from "react";
import MarkDown from "./components/mark-down";
import { SectionType } from "@/types/data-types/section-type";
import MobileView from "./components/mobile-view";
import DesktopView from "./components/desktop-view";
import { useIsMobileView } from "@/hooks/use-is-mobile-view";
import SideBarDesktop from "./components/sidebar/sidebar-desktop";
import SideBarMobile from "./components/sidebar/sidebar-mobile";

const fetchChaptersStructure = async (): Promise<ChapterType[]> => {
  const response = await fetch(`${process.env.API_URL}/chapters`);
  const chapters: ChapterType[] = await response.json();
  return chapters;
};

const fetchSection = async (fileName: string): Promise<SectionType> => {
  const response = await fetch(`${process.env.API_URL}/chapters/${fileName}`);
  const newPosts: SectionType = await response.json();
  return newPosts;
};

const Chapters = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>();
  const [chaptersStructure, setChaptersStructure] = useState<ChapterType[]>([]);
  const isMobileView = useIsMobileView();

  const handleSideBarClick = (section: SectionType) => {
    fetchSection(section.fileName)
      .then((response) => {
        setCurrentSection(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (chaptersStructure.length === 0) {
      return;
    }

    if (chaptersStructure[0].sections.length === 0) {
      return;
    }

    fetchSection(chaptersStructure[0].sections[0].fileName)
      .then((response) => {
        setCurrentSection(response);
      })
      .catch((err) => console.error(err));
  }, [chaptersStructure]);

  useEffect(() => {
    fetchChaptersStructure()
      .then((chaptersStructure) => {
        setChaptersStructure(chaptersStructure);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Center>
      <Box w={isMobileView ? "100%" : "80%"}>
        <MobileView>
          <SideBarMobile
            activeSectionFileName={currentSection?.fileName || ""}
            chapterStructure={chaptersStructure}
            onChapterClick={handleSideBarClick}
          />
        </MobileView>
        <Flex>
          <DesktopView>
            <SideBarDesktop
              activeSectionFileName={currentSection?.fileName || ""}
              chapterStructure={chaptersStructure}
              onChapterClick={handleSideBarClick}
            />
          </DesktopView>
          <Box p="1rem" maxH="100vh" overflowX="inherit" overflowY="scroll">
            <MarkDown content={currentSection?.content || ""}></MarkDown>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default Chapters;
