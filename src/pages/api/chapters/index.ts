// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import chapters from '../../mock-api/chapters';

import  type { ChapterType } from '@/types/data-types/chapter-type';
import type { ChapterSlugType } from '@/types/chapter-slug-type';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChapterSlugType[]>
) {
  const slugs = chapters.map((c: ChapterType) => ({ fileName: c.fileName, title: c.title }))
  res.status(200).json(slugs);
}
