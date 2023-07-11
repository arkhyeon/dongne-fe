import { recentList } from '../../../../data';
import MainPostList from '../../../component/post/MainPostList';

function MyPost(props) {
  return <MainPostList postList={recentList} />;
}

export default MyPost;
