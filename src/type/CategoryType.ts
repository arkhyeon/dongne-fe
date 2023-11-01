import { GetResponse } from '../common/axios';

interface defaultCategory {
  name: string;
  boardCount: number;
}

export interface CategoryType {
  mainCategoryId: number;
  mainCategoryType: string;
}

export interface SubCategoryType extends defaultCategory {
  subCategoryId: number;
}

export interface ChannelType extends defaultCategory {
  channelId: number;
}

export interface APICategoryType extends GetResponse {
  mainCategoryDtos: CategoryType[];
}
export interface APISubCategoryType extends GetResponse {
  subCategoryDtos: SubCategoryType[];
}

export interface APIChannelType extends GetResponse {
  channelDtos: ChannelType[];
}
