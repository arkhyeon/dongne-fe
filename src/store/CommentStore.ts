import { create } from 'zustand';
import { APICommentType, APIReplyType, BoardCommentType, ReplyType } from '../type/BoardType.ts';
import { client } from '../common/axios.ts';

interface CommentStoreType {
  commentList: BoardCommentType[];
  page: number;
  isFetching: boolean;
  hasNextPage: boolean;
  resetComment: () => void;
  getCommentList: (boardId: string, page: number) => void;
  setCommentInList: (boardCommentId: number, content: string) => void;
  deleteCommentInList: (boardCommentId: number) => void;
}

export const CommentStore = create<CommentStoreType>(set => ({
  commentList: [],
  page: 0,
  isFetching: false,
  hasNextPage: true,
  resetComment: () =>
    set(() => ({ commentList: [], page: 0, isFetching: false, hasNextPage: true })),
  getCommentList: (boardId: string, page: number) => {
    CommentStore.setState(() => ({ isFetching: true }));
    client.get<APICommentType>(`boardComment/${boardId}?page=${page}&size=10`).then(res => {
      if (res.findBoardCommentDtos.length === 0) {
        CommentStore.setState(() => ({ hasNextPage: false }));
      } else {
        CommentStore.setState(store => ({
          page: store.page + 1,
          commentList: [...store.commentList, ...res.findBoardCommentDtos],
          isFetching: false,
          hasNextPage: true,
        }));
      }
    });
  },
  setCommentInList: (boardCommentId, content) => {
    CommentStore.setState(store => ({
      ...store,
      commentList: store.commentList.map(comment =>
        comment.boardCommentId === boardCommentId ? { ...comment, content: content } : comment,
      ),
    }));
  },
  deleteCommentInList: boardCommentId => {
    CommentStore.setState(store => ({
      ...store,
      commentList: store.commentList.filter(comment => comment.boardCommentId !== boardCommentId),
    }));
  },
}));

interface ReplyStoreType {
  replyList: { [boardCommentId: number]: ReplyType[] };
  getReplyList: (boardCommentId: number) => void;
}

export const ReplyStore = create<ReplyStoreType>(() => ({
  replyList: {},
  getReplyList: boardCommentId => {
    client.get<APIReplyType>(`replyComment/${boardCommentId}`).then(res => {
      ReplyStore.setState(store => ({
        replyList: { ...store.replyList, [boardCommentId]: res.findReplyCommentDtos },
      }));
    });
  },
}));
