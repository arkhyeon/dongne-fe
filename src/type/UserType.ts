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
  findLatestBoardCommentsByUserDtos?: CommentType[];
  findLatestBoardsByUserDtos?: BoardType[];
  nickname: string;
  point: number;
  profileImg: string | undefined;
  userId: string;
  zoneName: string;
}
