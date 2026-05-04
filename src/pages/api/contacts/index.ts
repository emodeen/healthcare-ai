import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const contacts = await prisma.contact.findMany({ orderBy: { created_at: 'desc' } });
    res.status(200).json(contacts);
    return;
  }

  if (req.method === 'POST') {
    const { title, company } = req.body;
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title required' });
      return;
    }
    const contact = await prisma.contact.create({ data: { title, company: company || undefined } });
    res.status(201).json(contact);
    return;
  }

  res.setHeader('Allow', 'GET,POST');
  res.status(405).end('Method Not Allowed');
}
