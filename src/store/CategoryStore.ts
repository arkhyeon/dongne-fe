import { create } from 'zustand';

interface CategoryStoreType {
  channel: string;
  setChannel: (name: string) => void;
  subCategory: number;
  setSubCategory: (id: number) => void;
  mainCategory: number;
  setMainCategory: (id: number) => void;
}

export const CategoryStore = create<CategoryStoreType>(set => ({
  channel: '',
  subCategory: 0,
  mainCategory: 0,
  setChannel: name => set(prevState => ({ ...prevState, channel: name })),
  setSubCategory: id => set(prevState => ({ ...prevState, subCategory: id })),
  setMainCategory: id => set(prevState => ({ ...prevState, mainCategory: id })),
}));
