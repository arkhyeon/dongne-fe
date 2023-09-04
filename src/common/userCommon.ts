import Identicon from 'identicon.js';
import SHA256 from './Sha256';
import toHex from './toHex';

const levelTable = (point: number) => (-5 + Math.sqrt(25 + 20 * point)) / 10;

export const userLevel = (point: number) => Math.round(levelTable(point));

export const userLevelGage = (point: number) =>
  Number((levelTable(point) - userLevel(point)).toFixed(2)) * 100;

export const userInitValue = {
  cityName: '',
  findLatestBoardCommentsByUserDtos: [],
  findLatestBoardsByUserDtos: [],
  nickname: '',
  point: 0,
  profileImg: '',
  userId: '',
  zoneName: '',
};

export const getDefaultImage = (userId: string) => {
  return `data:image/png;base64,${new Identicon(SHA256(toHex(userId)), 420).toString()}`;
};
