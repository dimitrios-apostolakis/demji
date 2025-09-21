'use client';

import { useMemo } from 'react';

function maskKeyForDisplay(fullKey) {
  const head = fullKey.slice(0, 8);
  const tail = fullKey.slice(-6);
  return `${head}-************************-${tail}`;
}

function EyeOpenIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export default function DashboardContent({
  apiKeys,
  showAddForm,
  setShowAddForm,
  formData,
  setFormData,
  handleCreate,
  visibleKeys,
  setVisibleKeys,
  editingKeyId,
  editingKeyValue,
  setEditingKeyValue,
  editingKeyName,
  cancelEditKey,
  saveEditKey,
  copy,
  remove,
  startEditKey,
  sidebarVisible,
  onToggleSidebar
}) {
  const planName = 'Researcher';
  const apiUsage = useMemo(() => ({ used: 0, limit: 1000 }), []);

  const handleToggleSidebar = () => {
    console.log('DashboardContent toggle clicked, sidebarVisible:', sidebarVisible);
    onToggleSidebar();
  };

  return (
    <main className="flex-1 min-h-screen">
      {/* Top bar */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleToggleSidebar}
            className="p-2 rounded-md hover:bg-slate-100 transition-colors border border-slate-200"
            title="Toggle sidebar"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="hidden sm:flex items-center gap-2 text-emerald-600 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Operational
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-full bg-slate-100 cursor-pointer" />
          <button className="h-9 w-9 rounded-full bg-slate-100 cursor-pointer" />
          <button className="h-9 w-9 rounded-full bg-slate-100 cursor-pointer" />
          <button className="h-9 w-9 rounded-full bg-slate-100 cursor-pointer" />
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
                <button className="ml-auto inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-medium cursor-pointer">
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
              <button onClick={() => setShowAddForm(true)} className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-slate-900 text-white text-sm font-medium cursor-pointer">+
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowAddForm(false)}>
              <div className="absolute inset-0 bg-slate-900/50" />
              <div className="relative z-10 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleCreate} className="rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="px-6 pt-6 pb-2">
                    <div className="text-lg font-semibold text-slate-900">Create a new API key</div>
                    <div className="text-sm text-slate-500 mt-1">Enter a name and limit for the new API key.</div>
                  </div>
                  <div className="px-6 pb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Key Name</label>
                      <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Key Name" className="mt-1 w-full h-10 px-3 text-slate-900 rounded-md border border-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Key Type</div>
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${formData.type === 'dev' ? 'border-slate-900 ring-1 ring-slate-900/10' : 'border-slate-200 hover:border-slate-300'}`}> 
                          <input type="radio" name="key-type" checked={formData.type === 'dev'} onChange={() => setFormData({ ...formData, type: 'dev' })} />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Development</div>
                            <div className="text-xs text-slate-500">Rate limited to 100 requests/minute</div>
                          </div>
                        </label>
                        <label className={`flex items-center gap-3 rounded-md border p-3 cursor-not-allowed bg-slate-50 ${formData.type === 'prod' ? 'border-slate-900 ring-1 ring-slate-900/10' : 'border-slate-200'}`}> 
                          <input type="radio" name="key-type" disabled checked={formData.type === 'prod'} onChange={() => setFormData({ ...formData, type: 'prod' })} />
                          <div>
                            <div className="text-sm font-medium text-slate-900">Production</div>
                            <div className="text-xs text-slate-500">Rate limited to 1,000 requests/minute</div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                        <input type="checkbox" checked={formData.limitEnabled} onChange={(e) => setFormData({ ...formData, limitEnabled: e.target.checked })} />
                        Limit monthly usage
                      </label>
                      <input type="number" min="1" value={formData.limit} onChange={(e) => setFormData({ ...formData, limit: Number(e.target.value) })} disabled={!formData.limitEnabled} className="mt-2 w-full h-10 px-3 text-slate-500 rounded-md border border-slate-300 disabled:bg-slate-100" />
                      <div className="mt-1 text-xs text-slate-500">If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex items-center gap-3">
                    <button className="h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium cursor-pointer">Create</button>
                    <button type="button" onClick={() => setShowAddForm(false)} className="h-10 px-4 text-slate-500 rounded-md border border-slate-300 text-sm cursor-pointer">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {editingKeyId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={cancelEditKey}>
              <div className="absolute inset-0 bg-slate-900/50" />
              <div className="relative z-10 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(e) => { e.preventDefault(); saveEditKey(); }} className="rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="px-6 pt-6 pb-2">
                    <div className="text-lg font-semibold text-slate-900">Edit API key</div>
                    <div className="text-sm text-slate-500 mt-1">Update the key value for <span className="font-medium text-slate-900">{editingKeyName}</span>.</div>
                  </div>
                  <div className="px-6 pb-6 space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Key</label>
                    <input value={editingKeyValue} onChange={(e) => setEditingKeyValue(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-md border border-slate-300 font-mono text-sm text-slate-900" />
                  </div>
                  <div className="px-6 pb-6 flex items-center gap-3">
                    <button className="h-10 px-4 rounded-md bg-slate-900 text-white text-sm font-medium cursor-pointer">Save</button>
                    <button type="button" onClick={cancelEditKey} className="h-10 px-4 text-slate-500 rounded-md border border-slate-300 text-sm cursor-pointer">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
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
                        <code className="font-mono text-xs text-slate-900 bg-slate-100 rounded px-2 py-1">{visibleKeys[k.id] ? k.key : maskKeyForDisplay(k.key)}</code>
                        <button onClick={() => copy(k.key)} className="text-slate-500 hover:text-slate-700 cursor-copy" title="Copy">⎘</button>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3 text-slate-600">
                        <button
                          onClick={() => setVisibleKeys((prev) => ({ ...prev, [k.id]: !prev[k.id] }))}
                          className="hover:text-slate-900 cursor-pointer"
                          title={visibleKeys[k.id] ? 'Hide key' : 'Show key'}
                          aria-pressed={Boolean(visibleKeys[k.id])}
                        >
                          {visibleKeys[k.id] ? (
                            <EyeOpenIcon className="w-5 h-5" />
                          ) : (
                            <EyeClosedIcon className="w-5 h-5" />
                          )}
                        </button>
                        <button onClick={() => startEditKey(k)} className="hover:text-slate-900 cursor-pointer" title="Edit">✎</button>
                        <button className="hover:text-slate-900 cursor-pointer" title="Rotate" onClick={() => copy(`rotated:${k.key}`)}>↻</button>
                        <button className="hover:text-red-600 cursor-pointer" title="Delete" onClick={() => remove(k.id)}>🗑️</button>
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
  );
}
