import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, ChevronUp, Save, CheckCircle2 } from 'lucide-react';

export default function MonitoringPage() {
  const [selectedPic, setSelectedPic] = useState('Semua PIC');
  const [expandedProject, setExpandedProject] = useState(null);
  
  const [projects, setProjects] = useState([]);
  const [progressValues, setProgressValues] = useState({});
  const [updateText, setUpdateText] = useState('');
  const [logs, setLogs] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        
        const initialProgress = {};
        data.forEach(p => {
          initialProgress[p.id] = p.progress || 0;
        });
        setProgressValues(initialProgress);

        if (data.length > 0 && !expandedProject) {
          setExpandedProject(data[0].id);
        }
      })
      .catch((err) => console.error('Gagal mengambil data monitoring:', err));
  };

  const handleSliderChange = (projectId, value) => {
    setProgressValues({ ...progressValues, [projectId]: Number(value) });
  };

  const handleSaveUpdate = async (project) => {
    const currentProgress = progressValues[project.id] || 0;
    
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: currentProgress,
          status: project.status
        }),
      });

      if (response.ok) {
        if (updateText.trim()) {
          const today = new Date().toISOString().split('T')[0];
          const newLog = { date: today, text: updateText };
          setLogs({
            ...logs,
            [project.id]: [...(logs[project.id] || []), newLog]
          });
          setUpdateText('');
        }

        setNotification({
          title: "Asikkkkk!!!!",
          message: "Data telah tersimpan"
        });

        setTimeout(() => {
          setNotification(null);
        }, 3000);

        fetchProjects(); 
      } else {
        console.error('Gagal menyimpan progress ke database');
      }
    } catch (err) {
      console.error('Terjadi kesalahan koneksi:', err);
    }
  };

  const groupedData = projects.reduce((acc, proj) => {
    const picName = proj.pic || 'Tanpa PIC';
    if (!acc[picName]) {
      acc[picName] = {
        pic: picName,
        avatarBg: 'bg-blue-600',
        projects: []
      };
    }
    acc[picName].projects.push({
      id: proj.id,
      name: proj.name,
      date: proj.tanggalSelesai ? proj.tanggalSelesai.split('T')[0] : '-',
      status: proj.status || 'On Track',
      statusColor: proj.status === 'At Risk' ? 'bg-amber-100 text-amber-700' : proj.status === 'Delayed' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
    });
    return acc;
  }, {});

  const groups = Object.values(groupedData).map(group => {
    const onTrackCount = group.projects.filter(p => p.status === 'On Track').length;
    const atRiskCount = group.projects.filter(p => p.status === 'At Risk').length;
    const delayedCount = group.projects.filter(p => p.status === 'Delayed').length;
    
    let badgeText = `${group.projects.length} Project`;
    let badgeColor = 'bg-blue-100 text-blue-700';
    if (atRiskCount > 0) {
      badgeText = `${onTrackCount} On Track, ${atRiskCount} At Risk`;
      badgeColor = 'bg-amber-100 text-amber-700';
    } else if (delayedCount > 0) {
      badgeText = `${delayedCount} Delayed`;
      badgeColor = 'bg-rose-100 text-rose-700';
    } else {
      badgeText = `${onTrackCount} On Track`;
      badgeColor = 'bg-emerald-100 text-emerald-700';
    }

    return {
      ...group,
      badgeText,
      badgeColor
    };
  });

  const filteredGroups = groups.filter(g => selectedPic === 'Semua PIC' || g.pic === selectedPic);

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Monitoring Project (MySQL)</h2>
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
            {Array.from(new Set(projects.map(p => p.pic))).map((picName, idx) => (
              <option key={idx} value={picName}>{picName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, gIndex) => (
            <div key={gIndex} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-full ${group.avatarBg} text-white flex items-center justify-center font-bold text-sm`}>
                    {group.pic.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{group.pic}</h3>
                    <p className="text-xs text-gray-500">{group.projects.length} project</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${group.badgeColor}`}>
                  {group.badgeText}
                </span>
              </div>

              <div className="divide-y">
                {group.projects.map((proj, pIndex) => {
                  const isExpanded = expandedProject === proj.id;
                  const currentProgress = progressValues[proj.id] || 0;

                  return (
                    <div key={pIndex} className="py-4 first:pt-0 last:pb-0">
                      <div 
                        className="flex items-center justify-between cursor-pointer py-2"
                        onClick={() => setExpandedProject(isExpanded ? null : proj.id)}
                      >
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors">{proj.name}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">Deadline: {proj.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${proj.statusColor}`}>
                            {proj.status}
                          </span>
                          <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden hidden sm:block">
                            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
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
                                onChange={(e) => handleSliderChange(proj.id, e.target.value)}
                                className="w-full accent-blue-600 cursor-pointer"
                              />
                              <span className="text-sm font-bold text-blue-600 w-12 text-right">{currentProgress}%</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-gray-600">Log Update Progress</span>
                            {logs[proj.id] && logs[proj.id].length > 0 ? (
                              logs[proj.id].map((log, lIdx) => (
                                <div key={lIdx} className="text-xs text-gray-600 bg-white p-2.5 rounded-lg border flex items-start space-x-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-mono text-gray-400">{log.date}: </span>
                                    <span>{log.text}</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-gray-400 italic">Belum ada log update untuk project ini.</p>
                            )}
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
                              onClick={() => handleSaveUpdate(proj)}
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
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-400 text-sm">
            Memuat data monitoring dari database...
          </div>
        )}
      </div>

      {/* Pop-up Notifikasi Kustom (Asikkkkk!!!!) */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl border border-gray-700 flex items-center space-x-3 animate-bounce">
          <div className="bg-emerald-500 text-white p-2 rounded-full font-bold">🎉</div>
          <div>
            <h4 className="font-bold text-sm text-emerald-400">{notification.title}</h4>
            <p className="text-xs text-gray-300">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}