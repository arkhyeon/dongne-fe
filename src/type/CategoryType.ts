import { GetResponse } from '../common/axios';

export interface CategoryType {
  mainCategoryId: number;
  mainCategoryType: string;
}

export interface SubCategoryType {
  subCategoryId: number;
  name: string;
}

export interface APICategoryType extends GetResponse {
  mainCategoryDtos: CategoryType[];
}
export interface APISubCategoryType extends GetResponse {
  subCategoryDtos: SubCategoryType[];
}
