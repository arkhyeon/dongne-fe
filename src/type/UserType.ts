import { GetResponse } from '../common/axios';
import { BoardType, CommentType } from './BoardType';

export type UserType = {
  userId: string;
  password: string;
  passwordConfirm: string;
  username: string;
  nickname: string;
  cityCode: string;
  zoneCode: string;
};

export interface UserMainInfo extends GetResponse {
  cityName: string;
  findLatestBoardCommentsByUserDtos: CommentType[];
  findLatestBoardsByUserDtos: BoardType[];
  nickname: string;
  point: number;
  profileImg: string | null;
  userId: string;
  zoneName: string;
}

export const userLevel = point => (-5 + Math.sqrt(25 + 20 * point)) / 10;

export const userLevelGage = point => userLevel - userLevel;
