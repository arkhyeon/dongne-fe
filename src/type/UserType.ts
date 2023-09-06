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

export interface UserRankType {
  rank: number;
  userId: string;
}

type Name = { name: string };

export interface DistrictType extends GetResponse {
  cityCodeNames: CityCodeNames[];
  zoneCodeNames: ZoneCodeNames[];
}

interface CityCodeNames extends Name {
  cityCode: string;
}

interface ZoneCodeNames extends Name {
  zoneCode: string;
}
