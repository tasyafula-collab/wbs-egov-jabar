import React, { useState } from 'react';
import { FileText, Search } from 'lucide-react';

export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState('daftar');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    namaProject: '',
    pic: '',
    divisi: '',
    prioritas: 'Sedang',
    tanggalMulai: '',
    tanggalSelesai: '',
    anggaran: ''
  });

  const [projects, setProjects] = useState([
    { name: 'Sistem Informasi Pelayanan Publik', pic: 'Rudi Hartono', divisi: 'e-Gov', prioritas: 'Tinggi', status: 'On Track', progress: 75, date: '2026-06-30' },
    { name: 'Portal Data Terpadu Jabar', pic: 'Siti Rahayu', divisi: 'Data Center', prioritas: 'Tinggi', status: 'At Risk', progress: 40, date: '2026-09-30' },
    { name: 'Aplikasi Pelaporan Desa Digital', pic: 'Dani Setiawan', divisi: 'e-Gov', prioritas: 'Sedang', status: 'On Track', progress: 90, date: '2026-04-30' },
    { name: 'Integrasi SIPD & SIMPEG', pic: 'Maya Putri', divisi: 'Infrastruktur', prioritas: 'Tinggi', status: 'Delayed', progress: 20, date: '2026-12-31' },
    { name: 'Dashboard Monitoring RT/RW', pic: 'Rudi Hartono', divisi: 'e-Gov', prioritas: 'Rendah', status: 'On Track', progress: 55, date: '2026-10-31' },
    { name: 'Sistem Absensi Digital ASN', pic: 'Siti Rahayu', divisi: 'SDM Digital', prioritas: 'Sedang', status: 'On Track', progress: 68, date: '2026-07-20' },
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProject || !formData.pic) return;

    const newProj = {
      name: formData.namaProject,
      pic: formData.pic,
      divisi: formData.divisi || 'e-Gov',
      prioritas: formData.prioritas,
      status: 'On Track',
      progress: 0,
      date: formData.tanggalSelesai || '2026-12-31'
    };

    setProjects([newProj, ...projects]);
    setActiveTab('daftar');
    setFormData({
      namaProject: '',
      pic: '',
      divisi: '',
      prioritas: 'Sedang',
      tanggalMulai: '',
      tanggalSelesai: '',
      anggaran: ''
    });
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

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.pic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Manajemen Project</h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Kelola dan tambahkan project WBS divisi e-Gov</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('daftar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'daftar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Daftar Project
          </button>
          <button 
            onClick={() => setActiveTab('tambah')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'tambah' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Tambah Project
          </button>
        </div>
      </div>

      {activeTab === 'daftar' ? (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden space-y-4">
          <div className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-bold text-gray-800 text-base">Daftar Project Aktif</h3>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Cari project atau PIC..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                  <th className="py-3 px-6">Nama Project</th>
                  <th className="py-3 px-6">PIC</th>
                  <th className="py-3 px-6">Divisi</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Progress</th>
                  <th className="py-3 px-6 text-right">Selesai</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm text-gray-600">
                {filteredProjects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">{project.name}</td>
                    <td className="py-4 px-6 text-gray-600">{project.pic}</td>
                    <td className="py-4 px-6 text-gray-600">{project.divisi}</td>
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
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Form Input Project Baru</h3>
            <p className="text-xs text-gray-400 mt-0.5">Lengkapi form di bawah untuk mendaftarkan project baru</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Nama Project *</label>
                <input 
                  type="text" 
                  name="namaProject"
                  required
                  placeholder="Nama project..." 
                  value={formData.namaProject}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">PIC (Person In Charge) *</label>
                <input 
                  type="text" 
                  name="pic"
                  required
                  placeholder="Nama PIC..." 
                  value={formData.pic}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Divisi</label>
                <input 
                  type="text" 
                  name="divisi"
                  placeholder="Divisi..." 
                  value={formData.divisi}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Prioritas</label>
                <select 
                  name="prioritas"
                  value={formData.prioritas}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tinggi">Tinggi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Rendah">Rendah</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Tanggal Mulai *</label>
                <input 
                  type="date" 
                  name="tanggalMulai"
                  required
                  value={formData.tanggalMulai}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">Tanggal Selesai *</label>
                <input 
                  type="date" 
                  name="tanggalSelesai"
                  required
                  value={formData.tanggalSelesai}
                  onChange={handleInputChange}
                  className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Anggaran</label>
              <input 
                type="text" 
                name="anggaran"
                placeholder="Rp ..." 
                value={formData.anggaran}
                onChange={handleInputChange}
                className="w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
              >
                Simpan Project
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('daftar')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}