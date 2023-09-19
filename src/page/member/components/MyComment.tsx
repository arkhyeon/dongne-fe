import Comment from '../../postDetail/components/Comment';

const commentList = [
  {
    boardCommentId: 1,
    userId: 'user2',
    createDate: '2023-09-19 16:51:46',
    isLiked: true,
    boardCommentLikesCount: 20,
    replyCommentCount: 10,
    content: '<p>댓글 테스트 1</p>',
  },
  {
    boardCommentId: 2,
    userId: 'user1',
    createDate: '2023-09-11 12:11:41',
    isLiked: false,
    boardCommentLikesCount: 10,
    replyCommentCount: 30,
    content: '<p>댓글 테스트 2</p>',
  },
];

function MyComment() {
  return (
    <>
      {commentList.map(cl => (
        <Comment key={cl.boardCommentId} comment={cl} canCommentActive={false} />
      ))}
    </>
  );
}

export default MyComment;
