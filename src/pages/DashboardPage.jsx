import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const projects = [
    { name: 'Sistem Informasi Pelayanan Publik', pic: 'Rudi Hartono', status: 'On Track', progress: 75, date: '2026-06-30' },
    { name: 'Portal Data Terpadu Jabar', pic: 'Siti Rahayu', status: 'At Risk', progress: 40, date: '2026-09-30' },
    { name: 'Aplikasi Pelaporan Desa Digital', pic: 'Dani Setiawan', status: 'On Track', progress: 90, date: '2026-04-30' },
    { name: 'Integrasi SIPD & SIMPEG', pic: 'Maya Putri', status: 'Delayed', progress: 20, date: '2026-12-31' },
    { name: 'Dashboard Monitoring RT/RW', pic: 'Rudi Hartono', status: 'On Track', progress: 55, date: '2026-10-31' },
    { name: 'Sistem Absensi Digital ASN', pic: 'Siti Rahayu', status: 'On Track', progress: 68, date: '2026-07-20' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Track':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">On Track</span>;
      case 'At Risk':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">At Risk</span>;
      case 'Delayed':
        return <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">Delayed</span>;
      default:
        return null;
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-emerald-500';
      case 'At Risk': return 'bg-amber-400';
      case 'Delayed': return 'bg-rose-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">Ringkasan status project WBS e-Government</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Project */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">TOTAL PROJECT</span>
            <div className="text-4xl font-extrabold">6</div>
            <p className="text-xs text-blue-100 pt-1">Keseluruhan project aktif</p>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* On Track */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">ON TRACK</span>
            <div className="text-4xl font-extrabold">4</div>
            <p className="text-xs text-emerald-100 pt-1">67% project tepat waktu</p>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Daftar Project Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800 text-base">Daftar Project</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-6">Nama Project</th>
                <th className="py-3 px-6">PIC</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Progress</th>
                <th className="py-3 px-6 text-right">Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-600">
              {projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">{project.name}</td>
                  <td className="py-4 px-6 text-gray-600">{project.pic}</td>
                  <td className="py-4 px-6">{getStatusBadge(project.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${getProgressBarColor(project.status)}`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-8">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-xs text-gray-500">{project.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}