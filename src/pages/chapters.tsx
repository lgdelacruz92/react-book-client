import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import type { ChapterType } from "@/types/chapter-type";
import type { ChapterSlugType } from "@/types/chapter-slug-type";
import "highlight.js/styles/monokai.css";
import Sidebar from "./components/sidebar";
import { useEffect, useState } from "react";
import MarkDown from "./components/mark-down";
import { chapters } from "./mock-api/chapter-slugs";
import { SectionType } from "@/types/section-type";

const fetchChaptersStructure = async (): Promise<ChapterType[]> => {
  // const response = await fetch(`${process.env.API_URL}/chapters`);
  // const chapterSlugs: ChapterSlugType[] = await response.json();
  return chapters;
};

const fetchSection = async (chapterSlug: string): Promise<SectionType> => {
  const response = await fetch(
    `${process.env.API_URL}/chapters/${chapterSlug}`
  );
  const newPosts: SectionType = await response.json();
  return newPosts;
};

const Chapters = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>();
  const [chaptersStructure, setChaptersStructure] = useState<ChapterType[]>([]);

  const handleSideBarClick = (section: SectionType) => {
    setCurrentSection(section);
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
      <Box w="70%">
        <Flex>
          <Stack>
            <Sidebar
              activeSectionFileName={currentSection?.fileName || ""}
              chapterStructure={chaptersStructure}
              onChapterClick={handleSideBarClick}
            />
          </Stack>
          <Box p="1rem">
            <MarkDown content={currentSection?.content || ""}></MarkDown>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default Chapters;
