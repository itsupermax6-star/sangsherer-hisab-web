
export type Category = 'বাজার' | 'বিদ্যুৎ' | 'গ্যাস' | 'বাসা ভাড়া' | 'শিক্ষা' | 'চিকিৎসা' | 'বেতন' | 'ব্যবসা' | 'ভাড়া' | 'ব্যাংকের কিস্তি' | 'সমিতির কিস্তি' | 'অন্যান্য';

export type Unit = 'কেজি' | 'গ্রাম' | 'পিস' | 'লিটার';

export interface Income {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export interface Expense {
  id: string;
  itemName: string;
  amount: number;
  category: string;
  date: string;
  quantity: number;
  unit: Unit;
  unitPrice: number;
  note?: string;
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
  category: 'বিদ্যুৎ বিল' | 'বাসা ভাড়া' | 'ব্যাংকের কিস্তি' | 'সমিতির কিস্তি' | 'গ্যাস বিল' | 'ইন্টারনেট বিল' | 'অন্যান্য';
  date: string;
  status: 'Paid' | 'Pending';
  phoneNumber?: string;
  note?: string;
}

export interface Loan {
  id: string;
  personName: string;
  phoneNumber?: string;
  amount: number;
  paidAmount: number;
  type: 'দিয়েছি' | 'নিয়েছি'; // Given or Taken
  date: string;
  dueDate?: string;
  status: 'Pending' | 'Paid';
  note?: string;
}

export interface MarketItem {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  estimatedPrice: number;
  isPurchased: boolean;
}

export interface AppData {
  incomes: Income[];
  expenses: Expense[];
  bills: Bill[];
  loans: Loan[];
  marketItems: MarketItem[];
}
