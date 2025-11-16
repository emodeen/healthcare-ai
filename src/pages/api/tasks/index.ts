import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ orderBy: { created_at: 'desc' } });
    res.status(200).json(tasks);
    return;
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title required' });
      return;
    }
    const task = await prisma.task.create({ data: { title } });
    res.status(201).json(task);
    return;
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end('Method Not Allowed');
}
