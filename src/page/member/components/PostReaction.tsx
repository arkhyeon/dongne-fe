import MainPostList from '../../../component/post/MainPostList';

function PostReaction() {
  const recentList = [
    {
      boardId: 1,
      title: '게시글 반응1 제목',
      commentTotal: 22,
      boardCommentCount: 31,
      boardLikesCount: 41,
      channelName: '요모조모',
    },
    {
      boardId: 21,
      title: '게시글 반응2 제목',
      commentTotal: 23,
      boardCommentCount: 57,
      boardLikesCount: 10,
      channelName: '시끌시끌',
    },
  ];
  return <MainPostList postList={recentList} />;
}

export default PostReaction;
