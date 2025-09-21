'use client';

import { useEffect, useMemo, useState } from 'react';
import Notification from '@/components/Notification';
import Sidebar from '@/components/Sidebar';
import DashboardContent from './DashboardContent';


export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'dev', limitEnabled: false, limit: 1000 });
  const [visibleKeys, setVisibleKeys] = useState({});
  const [editingKeyId, setEditingKeyId] = useState(null);
  const [editingKeyValue, setEditingKeyValue] = useState('');
  const [editingKeyName, setEditingKeyName] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', sidebarVisible);
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    // Initial load from API
    (async () => {
      try {
        const res = await fetch('/api/keys', { cache: 'no-store' });
        if (res.ok) {
          const rows = await res.json();
          setApiKeys(rows.map((r) => ({
            id: r.id,
            name: r.name,
            type: r.type,
            usage: r.usage ?? 0,
            key: r.api_key ?? r.key,
            createdAt: r.created_at?.slice(0, 10)
          })));
        }
      } catch {}
    })();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name || 'key',
      type: formData.type,
      usage: 0,
      key: `demji-${formData.type}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
    };
    try {
      const res = await fetch('/api/keys', { method: 'POST', body: JSON.stringify(payload) });
      if (res.ok) {
        const created = await res.json();
        setApiKeys((prev) => [
          {
            id: created.id,
            name: created.name,
            type: created.type,
            usage: created.usage ?? 0,
            key: created.api_key ?? created.key,
            createdAt: created.created_at?.slice(0, 10)
          },
          ...prev
        ]);
        setToast({ show: true, message: `API key "${created.name}" created successfully`, type: 'success' });
      } else {
        setToast({ show: true, message: 'Failed to create API key', type: 'error' });
      }
    } catch {
      setToast({ show: true, message: 'Failed to create API key', type: 'error' });
    }
    setShowAddForm(false);
    setFormData({ name: '', type: 'dev', limitEnabled: false, limit: 1000 });
  };

  const copy = async (text) => {
    try { 
      await navigator.clipboard.writeText(text);
      setToast({ show: true, message: 'Copied API Key to clipboard', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch {}
  };

  const remove = async (id) => {
    const keyToDelete = apiKeys.find(k => k.id === id);
    try {
      const res = await fetch(`/api/keys/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setApiKeys((prev) => prev.filter((k) => k.id !== id));
        setToast({ show: true, message: `API key "${keyToDelete?.name || 'Unknown'}" deleted successfully`, type: 'error' });
      } else {
        setToast({ show: true, message: 'Failed to delete API key', type: 'error' });
      }
    } catch {
      setToast({ show: true, message: 'Failed to delete API key', type: 'error' });
    }
  };

  const startEditKey = (keyObj) => {
    setEditingKeyId(keyObj.id);
    setEditingKeyValue(keyObj.key);
    setEditingKeyName(keyObj.name);
  };

  const cancelEditKey = () => {
    setEditingKeyId(null);
    setEditingKeyValue('');
    setEditingKeyName('');
  };

  const saveEditKey = async () => {
    if (!editingKeyId) return;
    try {
      const res = await fetch(`/api/keys/${editingKeyId}`, { method: 'PATCH', body: JSON.stringify({ key: editingKeyValue }) });
      if (res.ok) {
        const updated = await res.json();
        setApiKeys((prev) => prev.map((k) => (k.id === updated.id ? { ...k, key: (updated.api_key ?? updated.key) } : k)));
        setToast({ show: true, message: `API key "${editingKeyName}" updated successfully`, type: 'success' });
      } else {
        setToast({ show: true, message: 'Failed to update API key', type: 'error' });
      }
    } catch {
      setToast({ show: true, message: 'Failed to update API key', type: 'error' });
    }
    setEditingKeyId(null);
    setEditingKeyValue('');
    setEditingKeyName('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          visible={sidebarVisible} 
          onToggle={toggleSidebar} 
        />

        {/* Main */}
        <DashboardContent
          apiKeys={apiKeys}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          formData={formData}
          setFormData={setFormData}
          handleCreate={handleCreate}
          visibleKeys={visibleKeys}
          setVisibleKeys={setVisibleKeys}
          editingKeyId={editingKeyId}
          editingKeyValue={editingKeyValue}
          setEditingKeyValue={setEditingKeyValue}
          editingKeyName={editingKeyName}
          cancelEditKey={cancelEditKey}
          saveEditKey={saveEditKey}
          copy={copy}
          remove={remove}
          startEditKey={startEditKey}
          sidebarVisible={sidebarVisible}
          onToggleSidebar={toggleSidebar}
        />
      </div>

      {/* Toast Notification */}
      <Notification 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'success' })}
      />
    </div>
  );
}