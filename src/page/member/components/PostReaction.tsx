import { recentList } from '../../../../data';
import MainPostList from '../../../component/post/MainPostList';

function PostReaction(props) {
  return <MainPostList postList={recentList} />;
}

export default PostReaction;
