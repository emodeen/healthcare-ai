import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [recommended, setRecommended] = useState<Task | null>(null);

  async function load() {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    const t = await res.json();
    setTitle('');
    setTasks(prev => [t, ...prev]);
  }

  function pickNextTask() {
    const pending = tasks.filter(task => !task.completed);
    if (pending.length === 0) {
      setRecommended(null);
      return;
    }
    const nextTask = pending.reduce((best, current) => {
      return new Date(current.created_at).getTime() < new Date(best.created_at).getTime() ? current : best;
    });
    setRecommended(nextTask);
  }

  async function toggle(task: Task) {
    const res = await fetch(`/api/tasks/${task.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) });
    const updated = await res.json();
    setTasks(prev => prev.map(p => p.id === updated.id ? updated : p));
    setRecommended(prev => (prev?.id === updated.id ? null : prev));
  }

  async function remove(id: number) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
    setRecommended(prev => (prev?.id === id ? null : prev));
  }

  return (
    <>
      <main>
        <h1>Tasks</h1>
        <section className="next-task-panel">
          <button type="button" onClick={pickNextTask}>Pick next task</button>
          {recommended ? (
            <div className="recommended">
              <strong>Next task:</strong> {recommended.title}
            </div>
          ) : (
            <div className="recommended muted">No recommended task yet.</div>
          )}
        </section>
        <form onSubmit={add}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" type="text" />
          <button type="submit">Add</button>
        </form>
        {tasks.length === 0 ? (
          <div className="empty-state">No tasks yet. Add one to get started!</div>
        ) : (
          <ul>
            {tasks.map(t => (
              <li key={t.id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={t.completed} 
                    onChange={() => toggle(t)} 
                  />
                  <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                    {t.title}
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
