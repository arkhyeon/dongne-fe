import { create } from 'zustand';
import { UserType } from '../type/UserType';

interface UserStoreType {
  userInfo: UserType;
  setUserInfo: (userInfo: UserType) => void;
}

export const userStore = create<UserStoreType>(set => ({
  userInfo: {},
  setUserInfo: userInfo => set({ userInfo }),
}));
