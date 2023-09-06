export interface BoardType {
  boardId: number;
  title: string;
  commentTotal?: number;
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
  boardId: number;
  boardCommentId: number;
  content: string;
}

export interface BoardCommentType extends CommentType {
  boardId: number;
  boardCommentId: number;
  level: number;
  userId: string;
  input_dt: string;
  content: string;
  recommend: number;
  replyList: ReplyType[];
}

export interface ReplyType {
  id: number;
  level: number;
  userId: string;
  input_dt: string;
  content: string;
}
