import { GetResponse } from '../common/axios';
import { BoardType, CommentType } from './BoardType';

export interface UserType extends GetResponse {
  userId: string;
  nickname: string;
  cityName: string;
  cityCode: string;
  zoneName: string;
  zoneCode: string;
  profileImg: string | null;
  point: number;
}

export type UserLoginType = {
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

export interface UserRankingType {
  userId: string;
  nickname: string;
  profileImg: string;
  point: number;
  createDate: string;
}

type Name = { name: string };

export interface DistrictType extends GetResponse {
  cityCodeNames: CityCodeNames[];
  zoneCodeNames: ZoneCodeNames[];
}

export interface CityCodeNames extends Name {
  cityCode: string;
}

export interface ZoneCodeNames extends Name {
  zoneCode: string;
}

export interface APIUserRankingType extends GetResponse {
  userRankingDtos: UserRankingType[];
}
