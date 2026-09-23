const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Zakyfirdaus12',
  database: 'db_wbs_egov'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi MySQL gagal:', err);
    return;
  }
  console.log('Berhasil terhubung ke database MySQL (db_wbs_egov).');
});

// Endpoint GET: Mengambil semua data project
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      console.error('Error GET:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint POST: Menyimpan project baru
app.post('/api/projects', (req, res) => {
  console.log('Data masuk dari frontend:', req.body);

  const { name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress } = req.body;
  
  const query = `
    INSERT INTO projects (name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [name, pic, divisi, prioritas, tanggalMulai, tanggalSelesai, anggaran, status, progress];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error INSERT MySQL:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Berhasil', id: results.insertId });
  });
});

// Endpoint PUT: Memperbarui progress / status project berdasarkan ID (Untuk halaman Monitoring)
app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { progress, status, name, pic, divisi, tanggalSelesai } = req.body;

  // Cek apakah ini update parsial (monitoring) atau update lengkap (modal edit)
  // Jika field lengkap dikirim, gunakan query update lengkap, jika tidak, gunakan update monitoring
  if (name !== undefined || divisi !== undefined || tanggalSelesai !== undefined) {
    const query = 'UPDATE projects SET name = ?, pic = ?, divisi = ?, status = ?, progress = ?, tanggalSelesai = ? WHERE id = ?';
    const values = [name, pic, divisi, status, progress, tanggalSelesai, id];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error UPDATE Lengkap MySQL:', err);
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Project tidak ditemukan' });
      }
      res.json({ message: 'Project berhasil diperbarui' });
    });
  } else {
    // Update khusus untuk halaman Monitoring
    const query = 'UPDATE projects SET progress = ?, status = ? WHERE id = ?';
    const values = [progress, status, id];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error UPDATE Monitoring MySQL:', err);
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Project tidak ditemukan' });
      }
      res.json({ message: 'Progress berhasil diperbarui' });
    });
  }
});

// Endpoint DELETE: Menghapus project berdasarkan ID
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM projects WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error DELETE MySQL:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Project tidak ditemukan' });
    }

    res.json({ message: 'Project berhasil dihapus' });
  });
});

app.listen(5000, () => {
  console.log('Server berjalan di http://localhost:5000');
});