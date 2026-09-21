// Contoh endpoint POST di backend Node.js (Express)
app.post('/api/projects', (req, res) => {
  const { name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress } = req.body;
  
  // Query SQL untuk memasukkan data ke database MySQL
  const query = 'INSERT INTO projects (name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress], (err, result) => {
    if (err) {
      console.error('Gagal insert ke database:', err);
      return res.status(500).json({ error: 'Gagal menyimpan project' });
    }
    res.status(201).json({ message: 'Project berhasil disimpan', id: result.insertId });
  });
});