import { create } from 'zustand';

interface SearchStoreType {
  sort: string;
  searchText: string;
  searchType: string;
  setSearchText: (text: string) => void;
  setSort: (text: string) => void;
  setSearchType: (text: string) => void;
}

export const searchStore = create<SearchStoreType>(set => ({
  sort: 'latest',
  searchType: 'title',
  searchText: '',
  setSearchText: (text: string) =>
    set(prevState => ({
      ...prevState,
      searchText: text,
    })),
  setSort: (text: string) =>
    set(prevState => ({
      ...prevState,
      sort: text,
    })),
  setSearchType: (text: string) =>
    set(prevState => ({
      ...prevState,
      searchType: text,
    })),
}));

interface IntegratedSearchStoreType {
  sort: string;
  searchText: string;
  searchType: string;
  setSearchText: (text: string) => void;
}

export const integratedSearchStore = create<IntegratedSearchStoreType>(set => ({
  sort: 'latest',
  searchType: 'title',
  searchText: '',
  setSearchText: (text: string) =>
    set(prevState => ({
      ...prevState,
      searchText: text,
    })),
}));
