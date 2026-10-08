# MyFinance

**MyFinance** adalah aplikasi web pencatatan keuangan pribadi untuk
membantu mahasiswa mencatat pemasukan dan pengeluaran, mengetahui saldo,
melihat riwayat transaksi, dan memantau target tabungan.

Project ini dibuat sebagai tugas pengembangan aplikasi berbasis web
dengan scope yang realistis untuk diselesaikan dalam 12 pertemuan.

## Tentang Aplikasi

MyFinance merupakan aplikasi pencatatan keuangan sederhana untuk
mahasiswa.

Pengguna dapat:

-   Melihat total saldo.
-   Mencatat pemasukan.
-   Mencatat pengeluaran.
-   Mengelompokkan transaksi berdasarkan kategori.
-   Melihat riwayat transaksi.
-   Menghapus transaksi.
-   Melihat target tabungan.
-   Menyimpan data transaksi di browser menggunakan LocalStorage.

Versi pertama menggunakan arsitektur **client-side web application**,
sehingga belum membutuhkan backend atau database server.

## Masalah yang Diselesaikan

Mahasiswa sering memiliki uang bulanan atau uang saku dengan jumlah
terbatas, tetapi tidak selalu mengetahui ke mana uang tersebut
digunakan.

Pengeluaran seperti makanan, transportasi, pulsa/internet, hiburan, dan
kebutuhan kuliah dapat terakumulasi sehingga uang bulanan cepat habis.

MyFinance memberikan cara sederhana untuk mencatat transaksi sehingga
pengguna dapat mengetahui kondisi keuangan dengan lebih jelas.

## Target Pengguna

Target utama adalah **mahasiswa aktif**, khususnya pengguna yang:

-   Memiliki uang bulanan atau uang saku.
-   Sering melakukan transaksi sehari-hari.
-   Menggunakan laptop atau smartphone.
-   Membutuhkan pencatatan keuangan sederhana.
-   Tidak membutuhkan sistem keuangan yang kompleks.

## Manfaat

1.  Membantu mahasiswa mencatat pemasukan.
2.  Membantu mahasiswa mencatat pengeluaran.
3.  Menampilkan saldo secara otomatis.
4.  Menampilkan riwayat transaksi.
5.  Membantu mengetahui pola pengeluaran.
6.  Membantu memantau target tabungan.
7.  Membentuk kebiasaan mengelola keuangan.

## Fitur

### Dashboard

-   Total saldo.
-   Total pemasukan.
-   Total pengeluaran.
-   Jumlah transaksi.
-   Transaksi terbaru.

### Transaksi

-   Tambah transaksi.
-   Pilih pemasukan atau pengeluaran.
-   Pilih kategori.
-   Tentukan nominal.
-   Tentukan tanggal.
-   Hapus transaksi.

### Kategori

-   Makanan
-   Transportasi
-   Tagihan
-   Hiburan
-   Pendidikan
-   Lainnya

### Target Tabungan

Menampilkan target tabungan, saldo saat ini, dan persentase pencapaian
target.

### Penyimpanan Data

Data transaksi disimpan pada browser menggunakan LocalStorage dengan
key:

``` text
myfinance-transactions
```

## Scope dan Batasan

Fitur berikut tidak termasuk dalam versi pertama:

-   Login dan register.
-   Multi-user.
-   Backend server.
-   Database online.
-   Transfer uang.
-   Payment gateway.
-   Integrasi rekening bank.
-   Integrasi e-wallet.
-   Investasi.
-   Cryptocurrency.
-   Notifikasi SMS.
-   Sinkronisasi cloud.
-   Aplikasi mobile native.

Versi pertama berfokus pada alur utama pencatatan keuangan.

## Teknologi

### Frontend

-   React
-   JavaScript
-   Vite
-   CSS

### Storage

-   Browser LocalStorage

### Library

-   React
-   React DOM
-   Lucide React

### Development Tools

-   Node.js
-   npm
-   Vite

## Arsitektur

MyFinance menggunakan arsitektur client-side sederhana:

``` text
                    USER
                      |
                      v
              +---------------+
              |   React UI    |
              |               |
              | Dashboard     |
              | Transaksi     |
              | Target        |
              +-------+-------+
                      |
                      v
              +---------------+
              | Application   |
              | Logic         |
              |               |
              | React State   |
              | useState      |
              | useMemo       |
              +-------+-------+
                      |
                      v
              +---------------+
              | LocalStorage  |
              | Browser       |
              +---------------+
```

### Komponen Utama

-   **App**: mengatur state transaksi, navigasi, perhitungan saldo, dan
    penyimpanan.
-   **Dashboard**: menampilkan ringkasan keuangan.
-   **TransactionModal**: form untuk menambah transaksi.
-   **TransactionList**: menampilkan daftar transaksi dan aksi hapus.
-   **Goals**: menampilkan target tabungan.
-   **LocalStorage**: menyimpan data transaksi di browser.

## Alur Data

### Membuka Aplikasi

``` text
User
 |
 v
Browser
 |
 v
index.html
 |
 v
React / main.jsx
 |
 v
Membaca LocalStorage
 |
 v
React State
 |
 v
Perhitungan saldo
 |
 v
Dashboard
```

### Menambah Transaksi

``` text
User
 |
 v
Tambah Transaksi
 |
 v
Transaction Form
 |
 v
addTransaction()
 |
 v
React State
 |
 +------------------+
 |                  |
 v                  v
Perhitungan       LocalStorage
Saldo
 |                  |
 +--------+---------+
          |
          v
     Dashboard
```

### Menghapus Transaksi

``` text
User
 |
 v
Klik Delete
 |
 v
removeTransaction(id)
 |
 v
React State diperbarui
 |
 v
LocalStorage diperbarui
 |
 v
Saldo dihitung ulang
 |
 v
UI diperbarui
```

## Perhitungan Saldo

Rumus:

``` text
Saldo = Total Pemasukan - Total Pengeluaran
```

Contoh:

``` text
Pemasukan   = Rp2.500.000
Pengeluaran = Rp118.000
Saldo       = Rp2.382.000
```

## Model Data

Setiap transaksi menggunakan struktur:

``` javascript
{
  id: 1,
  title: "Makan siang",
  category: "Makanan",
  type: "expense",
  amount: 25000,
  date: "2026-10-02"
}
```

  Field        Type     Keterangan
  ------------ -------- -------------------------
  `id`         Number   ID transaksi
  `title`      String   Nama transaksi
  `category`   String   Kategori transaksi
  `type`       String   `income` atau `expense`
  `amount`     Number   Nominal transaksi
  `date`       String   Tanggal transaksi

## Struktur Project

``` text
MyFinance/
|
├── index.html
├── package.json
├── README.md
|
├── src/
|   ├── main.jsx
|   └── styles.css
|
└── docs/
    ├── ARSITEKTUR.md
    └── SPESIFIKASI_TEMA.md
```

### Penjelasan File

-   `index.html`: entry point HTML aplikasi.
-   `package.json`: dependency dan script project.
-   `src/main.jsx`: React application, UI, state, logic, dan
    LocalStorage.
-   `src/styles.css`: styling dan responsive UI.
-   `docs/ARSITEKTUR.md`: dokumen arsitektur.
-   `docs/SPESIFIKASI_TEMA.md`: spesifikasi tema dan scope.

## Cara Kerja Aplikasi

1.  Vite menjalankan React application.
2.  React membuat UI dashboard, transaksi, dan target.
3.  Aplikasi membaca data transaksi dari LocalStorage.
4.  Data dimasukkan ke React State.
5.  User menambahkan atau menghapus transaksi.
6.  State diperbarui.
7.  Sistem menghitung pemasukan, pengeluaran, dan saldo.
8.  Data disimpan kembali ke LocalStorage.
9.  React memperbarui UI.

## Instalasi

### Prasyarat

Pastikan Node.js dan npm sudah terpasang.

Cek versi:

``` bash
node --version
npm --version
```

### Clone Repository

``` bash
git clone <URL-REPOSITORY>
cd MyFinance
```

### Install Dependency

``` bash
npm install
```

## Menjalankan Aplikasi

``` bash
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya:

``` text
http://localhost:5173/
```

## Build Production

``` bash
npm run build
```

Preview build:

``` bash
npm run preview
```

## Pengujian

  No   Pengujian                   Hasil yang Diharapkan
  ---- --------------------------- -----------------------------
  1    Membuka website             Dashboard muncul
  2    Tambah pemasukan            Total pemasukan bertambah
  3    Tambah pengeluaran          Total pengeluaran bertambah
  4    Tambah pengeluaran          Saldo berkurang
  5    Hapus transaksi             Transaksi terhapus
  6    Refresh browser             Data tetap tersedia
  7    Membuka halaman Transaksi   Daftar transaksi muncul
  8    Membuka Target Tabungan     Progress target muncul
  9    Nominal kosong              Transaksi tidak disimpan
  10   Nominal tidak valid         Transaksi ditolak

## Kriteria Keberhasilan

Aplikasi dianggap berhasil apabila:

-   Website dapat dijalankan dengan `npm run dev`.
-   Dashboard berhasil ditampilkan.
-   User dapat menambahkan transaksi.
-   User dapat melihat transaksi.
-   User dapat menghapus transaksi.
-   Total pemasukan dihitung dengan benar.
-   Total pengeluaran dihitung dengan benar.
-   Saldo dihitung dengan benar.
-   Target tabungan dapat ditampilkan.
-   Data tetap tersedia setelah browser di-refresh.
-   UI dapat digunakan pada ukuran layar berbeda.
-   Tidak terdapat error utama ketika fitur digunakan.

## Development Workflow

``` text
Identifikasi Masalah
        |
        v
Menentukan Target User
        |
        v
Menentukan Scope Fitur
        |
        v
Membuat Arsitektur
        |
        v
Membuat UI
        |
        v
Generate Code dengan AI
        |
        v
Mempelajari Struktur dan Kode
        |
        v
npm install
        |
        v
npm run dev
        |
        v
Testing
        |
        v
Debugging
        |
        v
Perbaikan
        |
        v
Testing Ulang
        |
        v
Aplikasi Runnable
```

AI digunakan untuk membantu membuat draft arsitektur, scaffold, dan
kode. Kode hasil generasi tetap dipelajari dan diuji agar mahasiswa
memahami setiap komponen serta aliran data aplikasi.

## Pengembangan 12 Pertemuan

  Pertemuan   Kegiatan
  ----------- -----------------------------------------------
  1           Identifikasi masalah dan alternatif tema
  2           Menentukan target pengguna dan scope
  3           Analisis kebutuhan
  4           Membuat user flow
  5           Membuat wireframe dan rancangan UI
  6           Membuat struktur project React
  7           Implementasi Dashboard
  8           Implementasi fitur transaksi
  9           Implementasi perhitungan saldo
  10          Implementasi LocalStorage dan target tabungan
  11          Testing dan debugging
  12          Finalisasi, dokumentasi, dan presentasi

## Rencana Pengembangan Berikutnya

Versi berikutnya dapat menggunakan:

``` text
React
  |
  v
REST API
  |
  v
Node.js + Express
  |
  v
Database
```

Fitur yang dapat ditambahkan:

-   Authentication.
-   Multi-user.
-   Database server.
-   Sinkronisasi cloud.
-   REST API.
-   Filter berdasarkan tanggal.
-   Filter berdasarkan kategori.
-   Export data.
-   Laporan keuangan.
-   Grafik keuangan.
-   Backup dan restore data.

## Status Project

-   **Status:** Development / Prototype
-   **Version:** 1.0.0
-   **Platform:** Web
-   **Target Pengguna:** Mahasiswa
-   **Storage:** Browser LocalStorage
-   **Backend:** Tidak digunakan pada versi pertama

## Lisensi

Project ini dibuat untuk keperluan pembelajaran dan tugas pengembangan
aplikasi web.
