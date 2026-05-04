import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Contact = {
  id: number;
  title: string;
  company?: string;
  completed: boolean;
  created_at: string;
};

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [recommended, setRecommended] = useState<Contact | null>(null);

  async function load() {
    const res = await fetch('/api/contacts');
    const data = await res.json();
    setContacts(data);
  }

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch('/api/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, company }) });
    const t = await res.json();
    setTitle('');
    setCompany('');
    setContacts(prev => [t, ...prev]);
  }

  function pickNextTask() {
    const pending = contacts.filter(contact => !contact.completed);
    if (pending.length === 0) {
      setRecommended(null);
      return;
    }
    const nextTask = pending.reduce((best, current) => {
      return new Date(current.created_at).getTime() < new Date(best.created_at).getTime() ? current : best;
    });
    setRecommended(nextTask);
  }

  async function toggle(contact: Contact) {
    const res = await fetch(`/api/contacts/${contact.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !contact.completed }) });
    const updated = await res.json();
    setContacts(prev => prev.map(p => p.id === updated.id ? updated : p));
    setRecommended(prev => (prev?.id === updated.id ? null : prev));
  }

  async function remove(id: number) {
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    setContacts(prev => prev.filter(t => t.id !== id));
    setRecommended(prev => (prev?.id === id ? null : prev));
  }

  return (
    <>
      <main>
        <h1>Contacts</h1>
        <section className="next-contact-panel">
          <button type="button" onClick={pickNextTask}>Pick next contact</button>
          {recommended ? (
            <div className="recommended">
              <strong>Next contact:</strong> {recommended.title}
            </div>
          ) : (
            <div className="recommended muted">No recommended contact yet.</div>
          )}
        </section>
        <form onSubmit={add}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New contact" type="text" />
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company" type="text" />
          <button type="submit">Add</button>
        </form>
        {contacts.length === 0 ? (
          <div className="empty-state">No contacts yet. Add one to get started!</div>
        ) : (
          <ul>
            {contacts.map(t => (
              <li key={t.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={t.completed} 
                    onChange={() => toggle(t)} 
                  />
                  <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                    {t.title}{t.company ? ` · ${t.company}` : ''}
                  </span>
                </label>
                <button onClick={() => remove(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer>
        <p>&copy; 2025 Next.js Task App. All rights reserved.</p>
        <nav>
          <a href="https://www.termsfeed.com/terms-of-use/" target="_blank" rel="noopener noreferrer">Terms of Use</a>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </>
  );
}
