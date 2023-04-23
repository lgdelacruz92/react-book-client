// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import chapters from '../../mock-api/chapters';

import { ChapterType } from '@/types/data-types/chapter-type';
import { NotFoundType } from '@/types/not-found-type';
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChapterType | NotFoundType>
) {
    const { slug } = req.query;
    const result = chapters.find(c => c.fileName === slug)
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Not found'})
    }
}
