import { create } from 'zustand';
import { UserMainInfo } from '../type/UserType.ts';
import { client } from '../common/axios.ts';
import { getDefaultImage } from '../common/userCommon.ts';

interface UserStoreType {
  UserInfo: UserMainInfo;
  getUserInfo: () => void;
}

export const UserStore = create<UserStoreType>(set => ({
  UserInfo: {
    cityName: '',
    findLatestBoardCommentsByUserDtos: [],
    findLatestBoardsByUserDtos: [],
    nickname: '',
    point: 0,
    profileImg: '',
    userId: '',
    zoneName: '',
  },
  getUserInfo: async () => {
    const res = await client.get<UserMainInfo>('user-main?page=0&size=5');
    set(() => ({
      UserInfo: { ...res, profileImg: res.profileImg || getDefaultImage(res.userId) },
    }));
  },
}));
