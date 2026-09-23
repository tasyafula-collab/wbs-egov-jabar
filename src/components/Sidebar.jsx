import { LayoutGrid, FileText, Activity, BarChart3 } from 'lucide-react';
import diskominfo from '../assets/diskominfo.png';

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
      {/* Jarak (padding) dikurangi dan dibuat mepet */}
      <div className="py-2 px-1 border-b border-gray-800 flex items-center justify-center">
        <img 
          src={diskominfo} 
          alt="Logo Diskominfo Jabar" 
          /* Tinggi ditambah (h-24) dan di-zoom sedikit (scale-110) */
          className="w-full h-24 object-contain scale-110" 
        />
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