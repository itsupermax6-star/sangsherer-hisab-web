
import React, { useState, useEffect, useMemo } from 'react';
import { AppData, Income, Expense, Loan, MarketItem, Bill } from './types';
import { storageService } from './services/storageService';
import Dashboard from './components/Dashboard';
import IncomeManager from './components/IncomeManager';
import ExpenseManager from './components/ExpenseManager';
import BillManager from './components/BillManager';
import LoanManager from './components/LoanManager';
import MarketList from './components/MarketList';
import { LayoutDashboard, Wallet, Receipt, Users, ShoppingCart, Settings, CreditCard } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(storageService.loadData());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'income' | 'expense' | 'bill' | 'loan' | 'market'>('dashboard');

  useEffect(() => {
    storageService.saveData(data);
  }, [data]);

  const stats = useMemo(() => {
    const totalIncome = data.incomes.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalBills = data.bills.reduce((acc, curr) => acc + curr.amount, 0);
    
    const totalReceivable = data.loans
      .filter(l => l.type === 'দিয়েছি' && l.status === 'Pending')
      .reduce((acc, curr) => acc + (curr.amount - curr.paidAmount), 0);
    const totalPayable = data.loans
      .filter(l => l.type === 'নিয়েছি' && l.status === 'Pending')
      .reduce((acc, curr) => acc + (curr.amount - curr.paidAmount), 0);
    
    return {
      totalIncome,
      totalExpense: totalExpense + totalBills,
      totalOnlyExpense: totalExpense,
      totalOnlyBills: totalBills,
      balance: totalIncome - (totalExpense + totalBills),
      totalReceivable,
      totalPayable
    };
  }, [data]);

  const addIncome = (income: Income) => {
    setData(prev => ({ ...prev, incomes: [income, ...prev.incomes] }));
  };

  const updateIncome = (updatedIncome: Income) => {
    setData(prev => ({
      ...prev,
      incomes: prev.incomes.map(i => i.id === updatedIncome.id ? updatedIncome : i)
    }));
  };

  const deleteIncome = (id: string) => {
    if (window.confirm('আপনি কি এই আয়ের হিসাবটি মুছে ফেলতে চান?')) {
      setData(prev => ({ ...prev, incomes: prev.incomes.filter(i => i.id !== id) }));
    }
  };

  const addExpense = (expense: Expense) => {
    setData(prev => ({ ...prev, expenses: [expense, ...prev.expenses] }));
  };

  const updateExpense = (updatedExpense: Expense) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e)
    }));
  };

  const deleteExpense = (id: string) => {
    if (window.confirm('আপনি কি এই ব্যয়ের হিসাবটি মুছে ফেলতে চান?')) {
      setData(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== id) }));
    }
  };

  const addBill = (bill: Bill) => {
    setData(prev => ({ ...prev, bills: [bill, ...prev.bills] }));
  };

  const updateBill = (updatedBill: Bill) => {
    setData(prev => ({
      ...prev,
      bills: prev.bills.map(b => b.id === updatedBill.id ? updatedBill : b)
    }));
  };

  const deleteBill = (id: string) => {
    if (window.confirm('আপনি কি এই বিলের হিসাবটি মুছে ফেলতে চান?')) {
      setData(prev => ({ ...prev, bills: prev.bills.filter(b => b.id !== id) }));
    }
  };

  const addLoan = (loan: Loan) => {
    setData(prev => ({ ...prev, loans: [loan, ...prev.loans] }));
  };

  const updateLoan = (updatedLoan: Loan) => {
    setData(prev => ({
      ...prev,
      loans: prev.loans.map(l => l.id === updatedLoan.id ? updatedLoan : l)
    }));
  };

  const toggleMarketItem = (id: string) => {
    setData(prev => ({
      ...prev,
      marketItems: prev.marketItems.map(item => 
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    }));
  };

  const addMarketItem = (item: MarketItem) => {
    setData(prev => ({ ...prev, marketItems: [item, ...prev.marketItems] }));
  };

  const deleteMarketItem = (id: string) => {
    setData(prev => ({ ...prev, marketItems: prev.marketItems.filter(i => i.id !== id) }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} expenses={data.expenses} incomes={data.incomes} bills={data.bills} />;
      case 'income':
        return <IncomeManager incomes={data.incomes} onAdd={addIncome} onUpdate={updateIncome} onDelete={deleteIncome} />;
      case 'expense':
        return <ExpenseManager expenses={data.expenses} onAdd={addExpense} onUpdate={updateExpense} onDelete={deleteExpense} />;
      case 'bill':
        return <BillManager bills={data.bills} onAdd={addBill} onUpdate={updateBill} onDelete={deleteBill} />;
      case 'loan':
        return <LoanManager loans={data.loans} onAdd={addLoan} onUpdate={updateLoan} />;
      case 'market':
        return <MarketList items={data.marketItems} onAdd={addMarketItem} onToggle={toggleMarketItem} onDelete={deleteMarketItem} />;
      default:
        return <Dashboard stats={stats} expenses={data.expenses} incomes={data.incomes} bills={data.bills} />;
    }
  };

  // Modern SVG representation that handles Unicode characters (Bengali) correctly
  const logoSvg = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#d11a8c" stroke="white" stroke-width="2"/>
      <path d="M50 10 L58 40 L90 35 L65 55 L85 85 L50 70 L15 85 L35 55 L10 35 L42 40 Z" fill="#facc15" />
      <text x="50" y="58" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#16a34a" text-anchor="middle" style="text-shadow: 1px 1px 2px white;">সুবালা</text>
    </svg>
  `;
  const logoSrc = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg.trim())}`;

  return (
    <div className="min-h-screen pb-24 max-w-2xl mx-auto shadow-xl bg-white">
      {/* Header with Subala Logo and Credits */}
      <header className="bg-sky-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          {/* Subala Logo Container */}
          <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-white flex-shrink-0 shadow-lg flex items-center justify-center">
            <img 
              src={logoSrc} 
              alt="সুবালা লোগো" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-extrabold leading-tight tracking-tight">সংসারের হিসাব</h1>
            <p className="text-[10px] font-bold text-sky-100 mt-0.5">
              এই অ্যাপটি সুবালা কম্পিউটার এন্ড কম্পোজ প্রতিষ্ঠান দ্বারা নির্মিত
            </p>
          </div>

          <button className="p-2 hover:bg-sky-500 rounded-full transition-colors">
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-1 max-w-2xl mx-auto z-50">
        <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={20}/>} label="ড্যাশবোর্ড" />
        <NavItem active={activeTab === 'income'} onClick={() => setActiveTab('income')} icon={<Wallet size={20}/>} label="আয়" />
        <NavItem active={activeTab === 'expense'} onClick={() => setActiveTab('expense')} icon={<Receipt size={20}/>} label="ব্যয়" />
        <NavItem active={activeTab === 'bill'} onClick={() => setActiveTab('bill')} icon={<CreditCard size={20}/>} label="বিল/কিস্তি" />
        <NavItem active={activeTab === 'loan'} onClick={() => setActiveTab('loan')} icon={<Users size={20}/>} label="লেনদেন" />
        <NavItem active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<ShoppingCart size={20}/>} label="বাজার" />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all flex-1 ${active ? 'text-sky-600 bg-sky-50 scale-105' : 'text-slate-500'}`}
  >
    {icon}
    <span className="text-[9px] mt-1 font-bold whitespace-nowrap">{label}</span>
  </button>
);

export default App;
