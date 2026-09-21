import React, { useState, useEffect } from 'react';
import { FileText, Search, Edit3, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-toastify'; // Import library toast

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk mengontrol tampilan: 'list' (Daftar Project) atau 'add' (Form Tambah Project)
  const [currentView, setCurrentView] = useState('list');

  // State untuk Modal Edit
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // State untuk Form Tambah Project Baru (Divisi otomatis 'E-Government')
  const [newProject, setNewProject] = useState({
    name: '',
    pic: 'Rudi Hartono',
    divisi: 'E-Government',
    prioritas: 'Sedang',
    tanggalMulai: '',
    tanggalSelesai: '',
    anggaran: '',
    status: 'On Track',
    progress: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Gagal mengambil data project:', err));
  };

  // Fungsi Submit Tambah Project dengan Toast Asik
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        // Notifikasi sukses di pojok kanan bawah ✨
        toast.success('Yeay! Project e-Gov baru berhasil ditambahkan! 🎉');

        setNewProject({
          name: '',
          pic: 'Rudi Hartono',
          divisi: 'E-Government',
          prioritas: 'Sedang',
          tanggalMulai: '',
          tanggalSelesai: '',
          anggaran: '',
          status: 'On Track',
          progress: 0
        });
        setCurrentView('list');
        fetchProjects();
      } else {
        toast.error('Waduh, gagal menambahkan project!');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Terjadi kesalahan pada server.');
    }
  };

  // Fungsi Hapus Project dengan Toast
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.info('Project berhasil dihapus dari sistem.');
          fetchProjects();
        } else {
          toast.error('Gagal menghapus project.');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  // Buka Modal Edit
  const handleEditClick = (proj) => {
    setCurrentProject({
      ...proj,
      tanggalMulai: proj.tanggalMulai ? proj.tanggalMulai.split('T')[0] : '',
      tanggalSelesai: proj.tanggalSelesai ? proj.tanggalSelesai.split('T')[0] : '',
      pic: proj.pic || 'Rudi Hartono',
      divisi: 'E-Government', // Selalu set ke E-Government
      prioritas: proj.prioritas || 'Sedang',
      anggaran: proj.anggaran || '',
      status: proj.status || 'On Track'
    });
    setIsEditing(true);
  };

  // Simpan Perubahan Edit dengan Toast
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject),
      });

      if (response.ok) {
        toast.success('Perubahan project berhasil disimpan! ✨');
        setIsEditing(false);
        fetchProjects();
      } else {
        toast.error('Gagal memperbarui project.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Filter pencarian berdasarkan nama project atau PIC
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.pic && p.pic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Halaman & Tombol Toggle View */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Manajemen Project</h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Kelola dan tambahkan project WBS divisi e-Gov</p>
        </div>
        
        {/* Tombol Tab Atas */}
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setCurrentView('list')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Daftar Project
          </button>
          <button 
            onClick={() => setCurrentView('add')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentView === 'add' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Tambah Project
          </button>
        </div>
      </div>

      {/* KONDISI TAMPILAN */}
      {currentView === 'list' ? (
        /* ================= TABEL DAFTAR PROJECT ================= */
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
            <h3 className="font-bold text-gray-900 text-base">Daftar Project Aktif (Database MySQL)</h3>
            
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Cari project atau PIC..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Project</th>
                  <th className="py-3 px-4">PIC</th>
                  <th className="py-3 px-4">Divisi</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Selesai</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm text-gray-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((proj, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-900">{proj.name}</td>
                      <td className="py-4 px-4">{proj.pic || '-'}</td>
                      <td className="py-4 px-4 text-gray-500">{proj.divisi || 'E-Government'}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          proj.status === 'At Risk' ? 'bg-amber-100 text-amber-700' : 
                          proj.status === 'Delayed' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {proj.status || 'On Track'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${proj.progress || 0}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{proj.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-500">
                        {proj.tanggalSelesai ? proj.tanggalSelesai.split('T')[0] : '-'}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* Tombol Edit */}
                          <button 
                            onClick={() => handleEditClick(proj)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* Tombol Hapus */}
                          <button 
                            onClick={() => handleDelete(proj.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">
                      Tidak ada project ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= FORM INPUT PROJECT BARU ================= */
        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Form Input Project Baru</h3>
            <p className="text-sm text-gray-500">Lengkapi form di bawah untuk mendaftarkan project baru</p>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Project *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nama project..."
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">PIC (Person In Charge) *</label>
                <select 
                  value={newProject.pic}
                  onChange={(e) => setNewProject({ ...newProject, pic: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Rudi Hartono">Rudi Hartono</option>
                  <option value="Siti Rahayu">Siti Rahayu</option>
                  <option value="Dani Setiawan">Dani Setiawan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Divisi Fixed E-Government */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Divisi</label>
                <input 
                  type="text" 
                  disabled
                  value="E-Government"
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prioritas</label>
                <select 
                  value={newProject.prioritas}
                  onChange={(e) => setNewProject({ ...newProject, prioritas: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Rendah">Rendah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Tinggi">Tinggi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tanggal Mulai *</label>
                <input 
                  type="date" 
                  required
                  value={newProject.tanggalMulai}
                  onChange={(e) => setNewProject({ ...newProject, tanggalMulai: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tanggal Selesai *</label>
                <input 
                  type="date" 
                  required
                  value={newProject.tanggalSelesai}
                  onChange={(e) => setNewProject({ ...newProject, tanggalSelesai: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Anggaran</label>
              <input 
                type="text" 
                placeholder="Rp ..."
                value={newProject.anggaran}
                onChange={(e) => setNewProject({ ...newProject, anggaran: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Simpan Project
              </button>
              <button 
                type="button"
                onClick={() => setCurrentView('list')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL EDIT PROJECT */}
      {isEditing && currentProject && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Edit Project</h3>
                <p className="text-xs text-gray-500">Perbarui informasi project di bawah ini</p>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Project *</label>
                  <input 
                    type="text" 
                    required
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">PIC (Person In Charge) *</label>
                  <select 
                    value={currentProject.pic}
                    onChange={(e) => setCurrentProject({ ...currentProject, pic: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Rudi Hartono">Rudi Hartono</option>
                    <option value="Siti Rahayu">Siti Rahayu</option>
                    <option value="Dani Setiawan">Dani Setiawan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Divisi Fixed E-Government */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Divisi</label>
                  <input 
                    type="text" 
                    disabled
                    value="E-Government"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Prioritas</label>
                  <select 
                    value={currentProject.prioritas}
                    onChange={(e) => setCurrentProject({ ...currentProject, prioritas: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Mulai *</label>
                  <input 
                    type="date" 
                    required
                    value={currentProject.tanggalMulai}
                    onChange={(e) => setCurrentProject({ ...currentProject, tanggalMulai: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Selesai *</label>
                  <input 
                    type="date" 
                    required
                    value={currentProject.tanggalSelesai}
                    onChange={(e) => setCurrentProject({ ...currentProject, tanggalSelesai: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Anggaran</label>
                  <input 
                    type="text" 
                    placeholder="Rp ..."
                    value={currentProject.anggaran}
                    onChange={(e) => setCurrentProject({ ...currentProject, anggaran: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select 
                    value={currentProject.status}
                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}