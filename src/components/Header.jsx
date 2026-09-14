export default function Header({ activeMenu }) {
  // Jika menu yang aktif adalah 'project', ubah tampilannya menjadi 'Project Management'
  const getHeaderTitle = () => {
    if (activeMenu === 'project') {
      return 'Project Management';
    }
    // Untuk menu lainnya (dashboard, monitoring, rekapitulasi), jadikan Huruf Besar di awal
    return activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-xs">
      <h2 className="text-2xl font-bold text-slate-800">
        {getHeaderTitle()}
      </h2>
      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
        Magang E-Gov
      </span>
    </header>
  );
}