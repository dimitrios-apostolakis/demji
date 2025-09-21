'use client';

export default function Sidebar({ visible, onToggle }) {
  return (
    <>
      {/* Mobile backdrop */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside className={`${visible ? 'flex' : 'hidden'} flex-col w-64 min-h-screen border-r border-slate-200 bg-white transition-all duration-300 fixed lg:relative z-40 lg:z-auto`}>
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
    </>
  );
}
