import { SectionTypeSlug } from "./section-type-slug";

export interface ChapterType {
    chapter: number;
    sections: SectionTypeSlug[];
    title: string;
}