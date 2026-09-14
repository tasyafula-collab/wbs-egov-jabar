export const getPicTableData = (picName) => {
  switch (picName) {
    case 'Bapak Eri 1':
      return [
        {
          project: 'Virtualisasi',
          task: 'Penyesuaian outline',
          goal: 'penyesuaian outline dari perpanjangan penggunaan velocinfra',
          deadline: '17 April',
          syncUp: '14 April'
        },
        {
          project: 'Virtualisasi',
          task: 'Identifikasi Kebutuhan data',
          goal: 'mengetahui data apa saja yang dibutuhkan dalam kajian',
          deadline: '-',
          syncUp: '-'
        },
        {
          project: 'Virtualisasi',
          task: 'Pengumpulan data',
          goal: '1. Tabel 2.1 Daftar instansi yang aplikasinya ditempatkan di pusat komputasi Tahun 2025\n2. Tabel 2.2 Daftar server yang digunakan Jabar Cloud pada tahun 2025\n3. Tabel 2.3 Utilisasi memory server di Jabar Cloud bulan September 2025\n4. Tabel 2.4 Fitur utama yang digunakan tahun 2025\n5. Tabel 2.5 Fitur utama yang dibutuhkan tahun 2026\n6. Tabel 2.6. Server fisik existing yang akan digunakan untuk pusat komputasi Tahun 2026\n7. Tabel 2.7 List penambahan server fisik baru tahun 2026 - Optional (menyesuaikan budget)\n8. Tabel 2.8 Fitur aplikasi virtualisasi pusat komputasi yang dibutuhkan tahun 2026\n9. Tabel 2.9 Daftar server fisik yang dibutuhkan untuk pusat komputasi tahun 2026\n10. Tabel 3.1 Perbandingan kesesuaian platform dengan fungsi utama yang digunakan\n11. Tabel 3.2 Hasil survei penyedia sewa lisensi aplikasi virtualisasi tahun 2026\n12. Gambar 3.1 Survei produk TKDN Kemenperin\n13. DOMAIN DATA',
          deadline: '-',
          syncUp: '-'
        }
      ];
    case 'Bapak Eri 2':
      return [
        {
          project: 'Keamanan Jaringan',
          task: 'Audit Firewall & VPN',
          goal: 'Memastikan seluruh akses remote administrator terenkripsi dengan baik dan aman dari celah.',
          deadline: '25 April',
          syncUp: '22 April'
        },
        {
          project: 'Keamanan Jaringan',
          task: 'Penetration Testing Internal',
          goal: 'Mengidentifikasi potensi kerentanan pada server aplikasi Diskominfo.',
          deadline: '30 April',
          syncUp: '28 April'
        }
      ];
    case 'Bapak Eri 3':
      return [
        {
          project: 'Integrasi Data',
          task: 'Pemetaan API Gateway',
          goal: 'Menghubungkan layanan data antar Organisasi Perangkat Daerah (OPD) Jawa Barat.',
          deadline: '10 Mei',
          syncUp: '07 Mei'
        },
        {
          project: 'Integrasi Data',
          task: 'Sinkronisasi Database Penduduk',
          goal: 'Uji coba performa query data kependudukan secara real-time.',
          deadline: '15 Mei',
          syncUp: '12 Mei'
        }
      ];
    default:
      return [];
  }
};