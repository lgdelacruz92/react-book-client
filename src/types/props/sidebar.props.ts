import { ChapterType } from "../data-types/chapter-type";
import { SectionType } from "../data-types/section-type";

export interface SideBarProps {
    chapterStructure: ChapterType[];
    onChapterClick: (section: SectionType) => void;
    activeSectionFileName: string;
  }