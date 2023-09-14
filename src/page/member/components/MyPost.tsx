import { recentList } from '../../../../data';
import MainPostList from '../../../component/post/MainPostList';
import { useEffect, useState } from 'react';
import { APIBoardType, APILatestBoardType, BoardType } from '../../../type/BoardType';
import { client } from '../../../common/axios';
import { getCookie } from '../../../common/Cookie';

function MyPost() {
  const [postList, setPostList] = useState<BoardType[]>([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = () => {
    const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };
    client
      .post<APILatestBoardType>(`board/latest?page=0&size=10`, userCode)
      .then(res => setPostList(res.findLatestBoardsDtos));
  };

  return <MainPostList postList={postList} />;
}

export default MyPost;
