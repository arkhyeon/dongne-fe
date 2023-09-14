import { GetResponse } from '../common/axios';

export interface BoardType {
  boardId: number;
  title: string;
  commentTotal?: number;
  boardCommentCount?: number;
  boardLikesCount?: number;
  channelName?: string;
}

export interface BoardDetailType extends GetResponse {
  boardId: number;
  title: string;
  content: string;
  createDate: string;
  deadlineAt: string | null;
  userId: string;
  fileImg: string | null;
  viewCnt: number;
  boardCommentCount: number;
  boardLikesCount: number;
  channelName: string | null;
  isLiked: boolean;
}

export interface CategoryBoardType {
  subCategoryId: number;
  subCategoryName: string;
  findHotBoardsDtos: BoardType[];
}

export interface EventBoardType extends BoardType {
  fileImg: string;
}

export interface APIBoardType extends GetResponse {
  findBestBoardsByPeriodDtos: BoardType[];
}
export interface APIEventBoardType extends GetResponse {
  findEventBoardsByPeriodDtos: EventBoardType[];
}
export interface APILatestBoardType extends GetResponse {
  findLatestBoardsDtos: BoardType[];
}
export interface APIHotCategoryBoardType extends GetResponse {
  findHotBoardsByCategoriesDtos: CategoryBoardType[];
}
export interface APIHotCategoryCommentType extends GetResponse {
  com: CommentType[];
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
}

export interface APICommentType extends GetResponse {
  findBoardCommentDtos: CommentType[];
}

export interface BoardCommentType extends CommentType {
  userId: string;
  createDate: string;
  isLiked: boolean;
  boardCommentLikesCount: number;
  replyCommentCount: number;
}

export interface APIReplyType extends GetResponse {
  findReplyCommentDtos: ReplyType[];
}

export interface ReplyType {
  replyCommentId: number;
  content: string;
  userId: string;
  createDate: string;
  isLiked: boolean;
}
