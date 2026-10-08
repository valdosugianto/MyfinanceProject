# Dokumen Arsitektur MyFinance

## 1. Tujuan
MyFinance membantu mahasiswa mencatat pemasukan dan pengeluaran, melihat saldo, serta memantau target tabungan.

## 2. Arsitektur
Browser/User
  ↓
React UI (Dashboard, Transaksi, Target Tabungan)
  ↓
State Management (React useState/useMemo)
  ↓
LocalStorage Browser
  ↓
Data transaksi JSON

## 3. Komponen
- App: mengatur state transaksi, navigasi halaman, dan modal.
- Stat: menampilkan ringkasan pemasukan/pengeluaran/jumlah transaksi.
- TransactionList: menampilkan daftar transaksi dan aksi hapus.
- TransactionModal: form untuk menambah transaksi.
- Goals: menghitung persentase pencapaian target tabungan.
- LocalStorage: penyimpanan data lokal agar transaksi tetap ada setelah refresh.

## 4. Aliran data
1. User membuka aplikasi.
2. App membaca `myfinance-transactions` dari LocalStorage.
3. Data transaksi disimpan dalam state React.
4. `useMemo` menghitung pemasukan, pengeluaran, dan saldo.
5. Dashboard menampilkan hasil perhitungan.
6. Saat user menambah transaksi, form mengirim object transaksi ke App.
7. App memasukkan transaksi ke state lalu menyimpan ulang ke LocalStorage.
8. Saat user menghapus transaksi, ID transaksi digunakan untuk menghapus data dari state dan LocalStorage.

## 5. Batasan versi 12 pertemuan
Versi ini tidak menggunakan backend, database server, autentikasi, payment gateway, atau sinkronisasi multi-device. Fokus pada prototype runnable dan pembuktian alur utama.
