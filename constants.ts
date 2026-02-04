
import { Category, Unit } from './types';

export const INCOME_CATEGORIES: Category[] = ['বেতন', 'ব্যবসা', 'ভাড়া', 'অন্যান্য'];
export const EXPENSE_CATEGORIES: Category[] = ['বাজার', 'শিক্ষা', 'চিকিৎসা', 'অন্যান্য'];
export const BILL_CATEGORIES = ['বিদ্যুৎ বিল', 'বাসা ভাড়া', 'ব্যাংকের কিস্তি', 'সমিতির কিস্তি', 'ইন্টারনেট বিল', 'গ্যাস বিল', 'অন্যান্য'] as const;
export const UNITS: Unit[] = ['কেজি', 'গ্রাম', 'পিস', 'লিটার'];

export const COLORS = {
  primary: '#0ea5e9',
  income: '#10b981',
  expense: '#ef4444',
  bill: '#f59e0b',
  bg: '#f8fafc'
};
