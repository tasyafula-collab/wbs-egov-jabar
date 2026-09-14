import React from 'react';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';

export default function RekapitulasiPage() {
  const rekapData = [
    { no: 1, name: 'Sistem Informasi Pelayanan Publik', pic: 'Rudi Hartono', divisi: 'e-Gov', prioritas: 'Tinggi', mulai: '2026-01-10', selesai: '2026-06-30', anggaran: 'Rp 320.000.000', progress: 32, status: 'On Track' },
    { no: 2, name: 'Portal Data Terpadu Jabar', pic: 'Siti Rahayu', divisi: 'Data Center', prioritas: 'Tinggi', mulai: '2026-02-01', selesai: '2026-09-30', anggaran: 'Rp 480.000.000', progress: 40, status: 'At Risk' },
    { no: 3, name: 'Aplikasi Pelaporan Desa Digital', pic: 'Dani Setiawan', divisi: 'e-Gov', prioritas: 'Sedang', mulai: '2025-11-01', selesai: '2026-04-30', anggaran: 'Rp 155.000.000', progress: 90, status: 'On Track' },
    { no: 4, name: 'Integrasi SIPD & SIMPEG', pic: 'Maya Putri', divisi: 'Infrastruktur', prioritas: 'Tinggi', mulai: '2026-03-15', selesai: '2026-12-31', anggaran: 'Rp 210.000.000', progress: 20, status: 'Delayed' },
    { no: 5, name: 'Dashboard Monitoring RT/RW', pic: 'Rudi Hartono', divisi: 'e-Gov', prioritas: 'Rendah', mulai: '2026-04-01', selesai: '2026-10-31', anggaran: 'Rp 98.000.000', progress: 55, status: 'On Track' },
    { no: 6, name: 'Sistem Absensi Digital ASN', pic: 'Siti Rahayu', divisi: 'SDM Digital', prioritas: 'Sedang', mulai: '2026-01-20', selesai: '2026-07-20', anggaran: 'Rp 175.000.000', progress: 68, status: 'On Track' },
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Tinggi':
        return <span className="text-rose-600 font-medium text-xs">Tinggi</span>;
      case 'Sedang':
        return <span className="text-amber-600 font-medium text-xs">Sedang</span>;
      case 'Rendah':
        return <span className="text-emerald-600 font-medium text-xs">Rendah</span>;
      default:
        return null;
    }
  };

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
      {/* Title & Action Buttons Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Rekapitulasi Project</h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Laporan keseluruhan project WBS divisi e-Gov</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel (CSV)</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-base">Tabel Rekapitulasi Lengkap</h3>
          <span className="text-xs text-gray-400 font-medium">6 project · Per September 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Project</th>
                <th className="py-3 px-4">PIC</th>
                <th className="py-3 px-4">Divisi</th>
                <th className="py-3 px-4">Prioritas</th>
                <th className="py-3 px-4">Mulai</th>
                <th className="py-3 px-4">Selesai</th>
                <th className="py-3 px-4">Anggaran</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-600">
              {rekapData.map((item) => (
                <tr key={item.no} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-500">{item.no}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-4 px-4 text-gray-600">{item.pic}</td>
                  <td className="py-4 px-4 text-gray-600">{item.divisi}</td>
                  <td className="py-4 px-4">{getPriorityBadge(item.prioritas)}</td>
                  <td className="py-4 px-4 font-mono text-xs text-gray-500">{item.mulai}</td>
                  <td className="py-4 px-4 font-mono text-xs text-gray-500">{item.selesai}</td>
                  <td className="py-4 px-4 font-medium text-gray-700">{item.anggaran}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${getProgressBarColor(item.status)}`} 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-8">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}