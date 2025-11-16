import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const taskId = parseInt(id, 10);
  if (Number.isNaN(taskId)) return res.status(400).json({ error: 'Invalid id' });

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).end();
    return res.status(200).json(task);
  }

  if (req.method === 'PUT') {
    const { title, completed } = req.body as { title?: string; completed?: boolean };
    if (title === undefined && completed === undefined) return res.status(400).json({ error: 'Nothing to update' });
    const data: any = {};
    if (title !== undefined) data.title = title;
    if (completed !== undefined) data.completed = completed;
    const updated = await prisma.task.update({ where: { id: taskId }, data });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.task.delete({ where: { id: taskId } });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,PUT,DELETE');
  res.status(405).end('Method Not Allowed');
}
