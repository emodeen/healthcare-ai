import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }

  const contactId = parseInt(id, 10);
  if (Number.isNaN(contactId)) return res.status(400).json({ error: 'Invalid id' });

  if (req.method === 'GET') {
    const contact = await prisma.contact.findUnique({ where: { id: contactId } });
    if (!contact) return res.status(404).end();
    return res.status(200).json(contact);
  }

  if (req.method === 'PUT') {
    const { title, completed, company } = req.body as { title?: string; completed?: boolean; company?: string };
    if (title === undefined && completed === undefined && company === undefined) return res.status(400).json({ error: 'Nothing to update' });
    const data: any = {};
    if (title !== undefined) data.title = title;
    if (completed !== undefined) data.completed = completed;
    if (company !== undefined) data.company = company;
    const updated = await prisma.contact.update({ where: { id: contactId }, data });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.contact.delete({ where: { id: contactId } });
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,PUT,DELETE');
  res.status(405).end('Method Not Allowed');
}
