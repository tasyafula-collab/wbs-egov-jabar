import React from 'react';
import { LayoutGrid, FileText, Activity, BarChart3 } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'project', label: 'Project', icon: FileText },
    { id: 'monitoring', label: 'Monitoring Project', icon: Activity },
    { id: 'rekapitulasi', label: 'Rekapitulasi', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0d1b2a] text-white flex flex-col h-screen shrink-0">
      {/* Top Brand Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg">
            W
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-wide">WBS e-Gov</h2>
            <p className="text-[11px] text-gray-400">Diskominfo Jabar</p>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="p-4 space-y-1 flex-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">MENU</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1A6DC2] text-white shadow-sm'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}