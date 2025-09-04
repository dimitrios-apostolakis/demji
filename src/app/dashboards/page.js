'use client';

import { useEffect, useMemo, useState } from 'react';

function maskKeyForDisplay(fullKey) {
  const head = fullKey.slice(0, 8);
  const tail = fullKey.slice(-6);
  return `${head}-************************-${tail}`;
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'dev' });

  useEffect(() => {
    setApiKeys([
      { id: 'k1', name: 'default', type: 'dev', usage: 0, key: 'tvly-dev-abcdefghijklmnopqrstuvwxyz012345', createdAt: '2025-01-01' },
      { id: 'k2', name: 'jim', type: 'dev', usage: 0, key: 'tvly-dev-0123456789abcdefghijklmnopqrstuvwxyz', createdAt: '2025-01-02' },
      { id: 'k3', name: 'asdf', type: 'dev', usage: 0, key: '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', createdAt: '2025-01-03' }
    ]);
  }, []);

  const planName = 'Researcher';
  const apiUsage = useMemo(() => ({ used: 0, limit: 1000 }), []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newKey = {
      id: String(Date.now()),
      name: formData.name || 'key',
      type: formData.type,
      usage: 0,
      key: `tvly-${formData.type}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setApiKeys((prev) => [newKey, ...prev]);
    setShowAddForm(false);
    setFormData({ name: '', type: 'dev' });
  };

  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const remove = (id) => setApiKeys((prev) => prev.filter((k) => k.id !== id));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 min-h-screen border-r border-slate-200 bg-white">
          <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-200">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-tr from-yellow-400 via-red-400 to-blue-500" />
            <span className="text-lg font-semibold text-slate-900">BestAIDashboard</span>
          </div>
          <nav className="flex-1 px-3 py-4 text-slate-600 text-sm">
            <div className="px-3 py-2 font-semibold text-slate-400 uppercase">Personal</div>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 text-slate-900" href="#">Overview</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">API Playground</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">Use Cases</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">Billing</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">Settings</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">Documentation</a>
            <a className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100" href="#">Tavily MCP</a>
          </nav>
          <div className="px-4 py-4 text-xs text-slate-500">Dimitris Apostolakis</div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-h-screen">
          {/* Top bar */}
          <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-end gap-3 px-4">
            <span className="hidden sm:flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Operational
            </span>
            <div className="flex items-center gap-2">
              <button className="h-9 w-9 rounded-full bg-slate-100" />
              <button className="h-9 w-9 rounded-full bg-slate-100" />
              <button className="h-9 w-9 rounded-full bg-slate-100" />
              <button className="h-9 w-9 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb + Title */}
            <div className="text-sm text-slate-400">Pages / Overview</div>
            <h1 className="text-3xl font-semibold text-slate-900 mt-1">Overview</h1>

            {/* Plan Card */}
            <section className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <div className="p-6 md:p-8 bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400 text-white">
                <div className="text-xs uppercase tracking-wider/relaxed font-semibold opacity-90">Current Plan</div>
                <div className="text-4xl md:text-5xl font-bold mt-2">{planName}</div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div className="md:col-span-2">
                    <div className="text-sm/6 font-medium">API Usage</div>
                    <div className="mt-2 h-2 rounded-full bg-white/30">
                      <div className="h-2 rounded-full bg-white" style={{ width: `${(apiUsage.used / apiUsage.limit) * 100}%` }} />
                    </div>
                    <div className="mt-2 text-sm/6">{apiUsage.used}/{apiUsage.limit} Credits</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-white/70" />
                    <div className="text-sm">Pay as you go</div>
                    <button className="ml-auto inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium">
                      Manage Plan
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* API Keys */}
            <section className="mt-6 rounded-xl border border-slate-200 bg-white">
              <div className="p-4 md:p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">API Keys</div>
                    <div className="text-sm text-slate-500">The key is used to authenticate your requests to the Research API.</div>
                  </div>
                  <button onClick={() => setShowAddForm((v) => !v)} className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-slate-900 text-white text-sm font-medium">+
                  </button>
                </div>
              </div>

              {showAddForm && (
                <form onSubmit={handleCreate} className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="h-10 px-3 rounded-md border border-slate-300" />
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="h-10 px-3 rounded-md border border-slate-300">
                      <option value="dev">dev</option>
                      <option value="prod">prod</option>
                    </select>
                    <div className="flex gap-2">
                      <button className="h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium">Create</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className="h-10 px-4 rounded-md border border-slate-300 text-sm">Cancel</button>
                    </div>
                  </div>
                </form>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-slate-500">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Usage</th>
                      <th className="px-6 py-3">Key</th>
                      <th className="px-6 py-3">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((k) => (
                      <tr key={k.id} className="border-t border-slate-200">
                        <td className="px-6 py-3 text-slate-900">{k.name}</td>
                        <td className="px-6 py-3 text-slate-500">{k.type}</td>
                        <td className="px-6 py-3 text-slate-500">{k.usage}</td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <code className="font-mono text-xs bg-slate-100 rounded px-2 py-1">{maskKeyForDisplay(k.key)}</code>
                            <button onClick={() => copy(k.key)} className="text-slate-500 hover:text-slate-700" title="Copy">⎘</button>
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3 text-slate-600">
                            <button className="hover:text-slate-900" title="View">👁️</button>
                            <button className="hover:text-slate-900" title="Edit">✎</button>
                            <button className="hover:text-slate-900" title="Rotate" onClick={() => copy(`rotated:${k.key}`)}>↻</button>
                            <button className="hover:text-red-600" title="Delete" onClick={() => remove(k.id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}