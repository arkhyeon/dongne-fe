import { create } from 'zustand';

interface CategoryStoreType {
  channel: number;
  setChannel: (id: number) => void;
  channelName: string;
  setChannelName: (name: string) => void;
  subCategory: number;
  setSubCategory: (id: number) => void;
  mainCategory: number;
  setMainCategory: (id: number) => void;
}

export const CategoryStore = create<CategoryStoreType>(set => ({
  channel: 0,
  channelName: '',
  subCategory: 0,
  mainCategory: 0,
  setChannel: id => set(prevState => ({ ...prevState, channel: id })),
  setChannelName: name => set(prevState => ({ ...prevState, channelName: name })),
  setSubCategory: id => set(prevState => ({ ...prevState, subCategory: id })),
  setMainCategory: id => set(prevState => ({ ...prevState, mainCategory: id })),
}));
