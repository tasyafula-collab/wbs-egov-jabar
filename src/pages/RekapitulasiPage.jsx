import React, { useState, useEffect } from 'react';
import { FileText, Search, Download, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function RekapitulasiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data secara dinamis dari database MySQL backend
  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal mengambil data project:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(p => 
    (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (p.pic && p.pic.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.divisi && p.divisi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- Fitur Export Excel ---
  const exportToExcel = () => {
    const dataToExport = filteredProjects.map((p, index) => ({
      No: index + 1,
      'Nama Project': p.name || '-',
      PIC: p.pic || '-',
      Divisi: p.divisi || '-',
      Prioritas: p.prioritas || '-',
      Status: p.status || '-',
      'Progress (%)': `${p.progress || 0}%`,
      'Tanggal Selesai': p.date ? p.date.split('T')[0] : '-'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Project');
    XLSX.writeFile(workbook, 'Daftar_Project_eGov.xlsx');
  };

  // --- Fitur Export PDF ---
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Daftar Project WBS Divisi e-Gov', 14, 15);
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 22);

    const tableColumn = ['No', 'Nama Project', 'PIC', 'Divisi', 'Status', 'Progress', 'Selesai'];
    const tableRows = filteredProjects.map((p, index) => [
      index + 1,
      p.name || '-',
      p.pic || '-',
      p.divisi || '-',
      p.status || '-',
      `${p.progress || 0}%`,
      p.date ? p.date.split('T')[0] : '-'
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] },
      styles: { fontSize: 8 }
    });

    doc.save('Daftar_Project_eGov.pdf');
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
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status || 'Unknown'}</span>;
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
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Rekapitulasi Project</h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Daftar seluruh project WBS divisi e-Gov</p>
        </div>
      </div>

      {/* Tabel Data & Fitur Export/Pencarian */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden space-y-4">
        <div className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-gray-800 text-base">Daftar Project Aktif</h3>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Tombol Export Excel & PDF */}
            <button 
              onClick={exportToExcel}
              className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors border border-emerald-200"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            
            <button 
              onClick={exportToPDF}
              className="flex items-center space-x-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors border border-rose-200"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>

            {/* Input Pencarian */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Cari project atau PIC..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Tabel Data Project */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                <th className="py-3 px-6">Nama Project</th>
                <th className="py-3 px-6">PIC</th>
                <th className="py-3 px-6">Divisi</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Progress</th>
                <th className="py-3 px-6">Selesai</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-600">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 text-sm">
                    Memuat data dari database...
                  </td>
                </tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">{project.name || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{project.pic || '-'}</td>
                    <td className="py-4 px-6 text-gray-600">{project.divisi || '-'}</td>
                    <td className="py-4 px-6">{getStatusBadge(project.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full ${getProgressBarColor(project.status)}`} 
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 w-8">{project.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-gray-500">
                      {project.date ? project.date.split('T')[0] : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 text-sm">
                    Tidak ada project yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}