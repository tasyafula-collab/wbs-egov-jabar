import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, Save, CheckCircle2 } from 'lucide-react';

export default function MonitoringPage() {
  const [selectedPic, setSelectedPic] = useState('Semua PIC');
  const [expandedProject, setExpandedProject] = useState('Sistem Informasi Pelayanan Publik');
  const [progressValues, setProgressValues] = useState({
    'Sistem Informasi Pelayanan Publik': 32,
    'Dashboard Monitoring RT/RW': 55,
    'Portal Data Terpadu Jabar': 40,
    'Sistem Absensi Digital ASN': 68,
  });
  const [updateText, setUpdateText] = useState('');
  const [logs, setLogs] = useState({
    'Sistem Informasi Pelayanan Publik': [
      { date: '2026-09-10', text: 'Modul autentikasi selesai, mulai pengerjaan modul pelaporan.' }
    ]
  });

  const handleSliderChange = (projectName, value) => {
    setProgressValues({ ...progressValues, [projectName]: Number(value) });
  };

  const handleSaveUpdate = (projectName) => {
    if (!updateText.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    const newLog = { date: today, text: updateText };
    
    setLogs({
      ...logs,
      [projectName]: [...(logs[projectName] || []), newLog]
    });
    setUpdateText('');
  };

  const groups = [
    {
      pic: 'Rudi Hartono',
      avatarBg: 'bg-blue-600',
      badgeText: '2 On Track',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      projects: [
        { name: 'Sistem Informasi Pelayanan Publik', date: '2026-01-10 → 2026-06-30', status: 'On Track', statusColor: 'bg-emerald-100 text-emerald-700' },
        { name: 'Dashboard Monitoring RT/RW', date: '2026-04-01 → 2026-10-31', status: 'On Track', statusColor: 'bg-emerald-100 text-emerald-700' },
      ]
    },
    {
      pic: 'Siti Rahayu',
      avatarBg: 'bg-indigo-600',
      badgeText: '1 On Track, 1 At Risk',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      projects: [
        { name: 'Portal Data Terpadu Jabar', date: '2026-02-01 → 2026-09-30', status: 'At Risk', statusColor: 'bg-amber-100 text-amber-700' },
        { name: 'Sistem Absensi Digital ASN', date: '2026-01-20 → 2026-07-20', status: 'On Track', statusColor: 'bg-emerald-100 text-emerald-700' },
      ]
    }
  ];

  const filteredGroups = groups.filter(g => selectedPic === 'Semua PIC' || g.pic === selectedPic);

  return (
    <div className="space-y-6">
      {/* Title & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Monitoring Project</h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Pantau progress per project & per PIC</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-medium text-gray-500">Filter PIC:</span>
          <select 
            value={selectedPic} 
            onChange={(e) => setSelectedPic(e.target.value)}
            className="bg-white border rounded-lg px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Semua PIC</option>
            <option>Rudi Hartono</option>
            <option>Siti Rahayu</option>
          </select>
        </div>
      </div>

      {/* Main Monitoring List */}
      <div className="space-y-6">
        {filteredGroups.map((group, gIndex) => (
          <div key={gIndex} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-full ${group.avatarBg} text-white flex items-center justify-center font-bold text-sm`}>
                  {group.pic.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{group.pic}</h3>
                  <p className="text-xs text-gray-500">2 project</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${group.badgeColor}`}>
                {group.badgeText}
              </span>
            </div>

            <div className="divide-y">
              {group.projects.map((proj, pIndex) => {
                const isExpanded = expandedProject === proj.name;
                const currentProgress = progressValues[proj.name] || 0;

                return (
                  <div key={pIndex} className="py-4 first:pt-0 last:pb-0">
                    <div 
                      className="flex items-center justify-between cursor-pointer py-2"
                      onClick={() => setExpandedProject(isExpanded ? null : proj.name)}
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors">{proj.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{proj.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${proj.statusColor}`}>
                          {proj.status}
                        </span>
                        <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden hidden sm:block">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${currentProgress}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 w-8 text-right">{currentProgress}%</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl border space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">Update Progress (%)</label>
                          <div className="flex items-center space-x-4">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={currentProgress} 
                              onChange={(e) => handleSliderChange(proj.name, e.target.value)}
                              className="w-full accent-blue-600 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-blue-600 w-12 text-right">{currentProgress}%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-gray-600">Log Update Progress</span>
                          {logs[proj.name] && logs[proj.name].map((log, lIdx) => (
                            <div key={lIdx} className="text-xs text-gray-600 bg-white p-2.5 rounded-lg border flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-mono text-gray-400">{log.date}: </span>
                                <span>{log.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                          <input 
                            type="text" 
                            placeholder="Tulis update progress..." 
                            value={updateText}
                            onChange={(e) => setUpdateText(e.target.value)}
                            className="flex-1 bg-white border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                          />
                          <button 
                            onClick={() => handleSaveUpdate(proj.name)}
                            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}