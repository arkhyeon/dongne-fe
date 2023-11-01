import { GetResponse } from '../common/axios';

export interface BoardType {
  boardId: number;
  title: string;
  fileImg?: string;
  commentTotal?: number;
  boardCommentCount?: number;
  boardLikesCount: number;
  channelName?: string;
  createDate: string;
  nickname: string;
  point: number;
}

export interface BoardDetailType extends GetResponse, BoardType {
  content: string;
  deadlineAt: string | null;
  userId: string;
  viewCnt: number;
  isLiked: boolean;
}

export interface HotCategoryBoardType {
  subCategoryId: number;
  subCategoryName: string;
  findHotBoardsDtos: BoardType[];
}

export interface HotCategoryCommentType {
  subCategoryId: number;
  subCategoryName: string;
  findHotBoardCommentsDtos: CommentType[];
}

export interface APIBoardType extends GetResponse {
  findBestBoardsByPeriodDtos: BoardType[];
}
export interface APIEventBoardType extends GetResponse {
  findEventBoardsByPeriodDtos: BoardType[];
}
export interface APIReactionBoardType extends GetResponse {
  findUserReactionDtos: BoardType[];
}
export interface APILatestBoardType extends GetResponse {
  findLatestBoardsDtos: BoardType[];
}
export interface APISearchBoardType {
  findSearchBoardsDtos: BoardType[];
  totalPageCount: number;
}
export interface APIHotCategoryBoardType extends GetResponse {
  findHotBoardsByCategoriesDtos: HotCategoryBoardType[];
}
export interface APIHotCategoryCommentType extends GetResponse {
  findHotBoardCommentsByCategoriesDtos: HotCategoryCommentType[];
}

export interface PostType {
  id: number;
  rec: number;
  title: string;
  commentTotal: number;
  toc: string;
  inputDate: string;
  writer: string;
  level: number;
  img: string;
}

export interface EventPostType {
  id: number;
  title: string;
  text: string;
  img: string;
}

export interface CommentType {
  boardId?: number;
  boardCommentId: number;
  content: string;
  boardCommentLikesCount: number;
}

export interface APICommentType extends GetResponse {
  findBoardCommentDtos: BoardCommentType[];
}

export interface BoardCommentType extends CommentType {
  userId: string;
  nickname: string;
  createDate: string;
  isLiked: boolean;
  replyCommentCount: number;
  point: number;
}

export interface APIReplyType extends GetResponse {
  findReplyCommentDtos: ReplyType[];
}

export interface ReplyType {
  replyCommentId: number;
  content: string;
  userId: string;
  nickname: string;
  createDate: string;
  isLiked: boolean;
  point: number;
}
