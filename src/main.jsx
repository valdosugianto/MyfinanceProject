import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Wallet, Plus, ArrowDownCircle, ArrowUpCircle, Trash2,
  LayoutDashboard, ReceiptText, Target, X
} from 'lucide-react';
import './styles.css';

const initialTransactions = [
  { id: 1, title: 'Uang bulanan', category: 'Pemasukan', type: 'income', amount: 2500000, date: '2026-10-01' },
  { id: 2, title: 'Makan siang', category: 'Makanan', type: 'expense', amount: 25000, date: '2026-10-02' },
  { id: 3, title: 'Transportasi', category: 'Transportasi', type: 'expense', amount: 18000, date: '2026-10-03' },
  { id: 4, title: 'Pulsa internet', category: 'Tagihan', type: 'expense', amount: 75000, date: '2026-10-04' }
];

const rupiah = value =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('myfinance-transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [active, setActive] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('myfinance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const income = useMemo(
    () => transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const expense = useMemo(
    () => transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const balance = income - expense;

  function addTransaction(data) {
    setTransactions(prev => [{ ...data, id: Date.now() }, ...prev]);
    setShowModal(false);
  }

  function removeTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-icon"><Wallet size={22}/></div><span>MyFinance</span></div>
        <p className="nav-label">MENU</p>
        <button className={active === 'dashboard' ? 'nav active' : 'nav'} onClick={() => setActive('dashboard')}><LayoutDashboard size={19}/> Dashboard</button>
        <button className={active === 'transactions' ? 'nav active' : 'nav'} onClick={() => setActive('transactions')}><ReceiptText size={19}/> Transaksi</button>
        <button className={active === 'goals' ? 'nav active' : 'nav'} onClick={() => setActive('goals')}><Target size={19}/> Target Tabungan</button>
        <div className="sidebar-note">
          <strong>Tips keuangan</strong>
          <p>Catat transaksi setiap hari agar pengeluaran lebih mudah dikontrol.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">KEUANGAN PRIBADI</p>
            <h1>{active === 'dashboard' ? 'Dashboard' : active === 'transactions' ? 'Transaksi' : 'Target Tabungan'}</h1>
          </div>
          <button className="primary" onClick={() => setShowModal(true)}><Plus size={18}/> Tambah Transaksi</button>
        </header>

        {active === 'dashboard' && (
          <>
            <section className="hero">
              <div>
                <p>Total saldo</p>
                <h2>{rupiah(balance)}</h2>
                <span>Saldo dihitung dari seluruh pemasukan dan pengeluaran.</span>
              </div>
              <Wallet size={58} strokeWidth={1.5}/>
            </section>

            <section className="stats">
              <Stat icon={<ArrowUpCircle/>} label="Total Pemasukan" value={income} type="income"/>
              <Stat icon={<ArrowDownCircle/>} label="Total Pengeluaran" value={expense} type="expense"/>
              <Stat icon={<ReceiptText/>} label="Jumlah Transaksi" value={transactions.length} type="count"/>
            </section>

            <section className="panel">
              <div className="panel-head"><div><h3>Transaksi Terbaru</h3><p>Aktivitas keuangan terakhir</p></div><button className="text-btn" onClick={() => setActive('transactions')}>Lihat semua</button></div>
              <TransactionList transactions={transactions.slice(0, 5)} onDelete={removeTransaction}/>
            </section>
          </>
        )}

        {active === 'transactions' && (
          <section className="panel">
            <div className="panel-head"><div><h3>Semua Transaksi</h3><p>Kelola pemasukan dan pengeluaran kamu.</p></div></div>
            <TransactionList transactions={transactions} onDelete={removeTransaction}/>
          </section>
        )}

        {active === 'goals' && <Goals balance={balance}/>}
      </main>

      {showModal && <TransactionModal onClose={() => setShowModal(false)} onSave={addTransaction}/>}
    </div>
  );
}

function Stat({ icon, label, value, type }) {
  return <div className="stat-card"><div className={'stat-icon ' + type}>{icon}</div><div><p>{label}</p><strong>{type === 'count' ? value : rupiah(value)}</strong></div></div>;
}

function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) return <div className="empty">Belum ada transaksi.</div>;
  return <div className="transactions">
    {transactions.map(t => (
      <div className="transaction" key={t.id}>
        <div className={'transaction-icon ' + t.type}>{t.type === 'income' ? <ArrowUpCircle/> : <ArrowDownCircle/>}</div>
        <div className="transaction-info"><strong>{t.title}</strong><span>{t.category} · {t.date}</span></div>
        <strong className={t.type}>{t.type === 'income' ? '+' : '-'} {rupiah(t.amount)}</strong>
        <button className="delete" title="Hapus transaksi" onClick={() => onDelete(t.id)}><Trash2 size={17}/></button>
      </div>
    ))}
  </div>;
}

function TransactionModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  function submit(e) {
    e.preventDefault();
    if (!title || !amount || Number(amount) <= 0) return;
    onSave({ title, category, type, amount: Number(amount), date });
  }

  return <div className="overlay"><form className="modal" onSubmit={submit}>
    <div className="modal-head"><div><h2>Tambah Transaksi</h2><p>Masukkan data transaksi baru.</p></div><button type="button" className="close" onClick={onClose}><X/></button></div>
    <label>Nama transaksi<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Contoh: Makan malam" /></label>
    <label>Jenis<select value={type} onChange={e => setType(e.target.value)}><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></select></label>
    <label>Kategori<select value={category} onChange={e => setCategory(e.target.value)}><option>Makanan</option><option>Transportasi</option><option>Tagihan</option><option>Hiburan</option><option>Pendidikan</option><option>Lainnya</option></select></label>
    <label>Nominal (Rp)<input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="50000" /></label>
    <label>Tanggal<input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
    <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" type="submit">Simpan Transaksi</button></div>
  </form></div>;
}

function Goals({ balance }) {
  const target = 5000000;
  const progress = Math.min(100, Math.max(0, (balance / target) * 100));
  return <section className="goal-card"><div><p>Target tabungan</p><h2>{rupiah(target)}</h2><span>Contoh target dana darurat / kebutuhan semester.</span></div><div className="progress"><div className="progress-bar" style={{width: `${progress}%`}}></div></div><div className="goal-meta"><span>Saldo saat ini: {rupiah(Math.max(0, balance))}</span><strong>{progress.toFixed(0)}%</strong></div></section>;
}

createRoot(document.getElementById('root')).render(<App />);
