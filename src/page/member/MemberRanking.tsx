import styled from '@emotion/styled';
import TextInput from '../../component/CommonComponents/TextInput';
import { useState } from 'react';

const userList = [
  {
    id: 1,
    userid: 'r2ware',
    level: 33,
    nickname: 'r2ware123',
    image: '',
    point: 12345,
    inputDate: '2022-12-31',
  },
  {
    id: 2,
    userid: 'r2ware',
    level: 32,
    nickname: 'awes',
    image: '',
    point: 12344,
    inputDate: '2022-12-31',
  },
  {
    id: 3,
    userid: 'r2ware',
    level: 31,
    nickname: 'azxc',
    image: '',
    point: 12343,
    inputDate: '2022-12-31',
  },
  {
    id: 4,
    userid: 'r2ware',
    level: 30,
    nickname: 'agwrwft',
    image: '',
    point: 12342,
    inputDate: '2022-12-31',
  },
  {
    id: 5,
    userid: 'r2ware',
    level: 30,
    nickname: 'hbneth',
    image: '',
    point: 11332,
    inputDate: '2022-12-31',
  },
  {
    id: 6,
    userid: 'r2ware',
    level: 30,
    nickname: 'wrg',
    image: '',
    point: 11335,
    inputDate: '2022-12-31',
  },
  {
    id: 7,
    userid: 'r2ware',
    level: 29,
    nickname: 'aerg',
    image: '',
    point: 1134,
    inputDate: '2022-12-31',
  },
  {
    id: 8,
    userid: 'r2ware',
    level: 29,
    nickname: '24etg',
    image: '',
    point: 923,
    inputDate: '2022-12-31',
  },
  {
    id: 9,
    userid: 'r2ware',
    level: 28,
    nickname: 'w32re4g',
    image: '',
    point: 81,
    inputDate: '2022-12-31',
  },
  {
    id: 10,
    userid: 'r2ware',
    level: 27,
    nickname: 'qw34g',
    image: '',
    point: 72,
    inputDate: '2022-12-31',
  },
  {
    id: 11,
    userid: 'r2ware',
    level: 26,
    nickname: 'qg2w34',
    image: '',
    point: 6,
    inputDate: '2022-12-31',
  },
  {
    id: 12,
    userid: 'r2ware',
    level: 25,
    nickname: 'h5e6',
    image: '',
    point: 5,
    inputDate: '2022-12-31',
  },
  {
    id: 13,
    userid: 'r2ware',
    level: 24,
    nickname: '456h',
    image: '',
    point: 4,
    inputDate: '2022-12-31',
  },
  {
    id: 14,
    userid: 'r2ware',
    level: 24,
    nickname: 'hwgerfh',
    image: '',
    point: 3,
    inputDate: '2022-12-31',
  },
  {
    id: 15,
    userid: 'r2ware',
    level: 24,
    nickname: '34rh',
    image: '',
    point: 2,
    inputDate: '2022-12-31',
  },
  {
    id: 16,
    userid: 'r2ware',
    level: 23,
    nickname: 'zxgwrg',
    image: '',
    point: 1,
    inputDate: '2022-12-31',
  },
  {
    id: 17,
    userid: 'r2ware',
    level: 23,
    nickname: '24tadfg',
    image: '',
    point: 1,
    inputDate: '2022-12-31',
  },
  {
    id: 18,
    userid: 'r2ware',
    level: 22,
    nickname: 'qwrgfghm',
    image: '',
    point: 0,
    inputDate: '2022-12-31',
  },
];

function MemberRanking() {
  const [rankList, setRankList] = useState(userList);
  const searchRanking = (value: string) => {
    const filteredList = userList.filter(rl => rl.nickname.includes(value));
    setRankList(filteredList);
  };

  return (
    <RankWrap>
      <TextInput placeholder="검색" onChange={e => searchRanking(e.target.value)} />
      {rankList.map(ul => {
        return (
          <UserRank key={ul.id}>
            <Ranking className={`rank-${ul.id}`}>{ul.id > 3 && ul.id}</Ranking>
            <UserInfo>
              <div>
                <img src={ul.image} />
                <ul>
                  <li>
                    LV.{ul.level} {ul.nickname} <small>({ul.userid})</small>
                  </li>
                  <li className="list-text">{ul.inputDate}</li>
                </ul>
              </div>
              <h1 className="flex-cc">{ul.point}</h1>
            </UserInfo>
          </UserRank>
        );
      })}
    </RankWrap>
  );
}

const RankWrap = styled.div`
  width: 600px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const UserRank = styled.div`
  width: 100%;
  height: 110px;
  border: 1px solid #aaa;
  border-radius: 10px;
  position: relative;
  padding: 4px 45px;

  & .rank-1,
  & .rank-2,
  & .rank-3 {
    width: 22px;
    height: 22px;
    border-radius: 100%;
  }

  & .rank-1 {
    background: linear-gradient(135deg, #fceabb 0%, #fccd4d 50%, #f8b500 51%, #fbdf93 100%);
  }

  & .rank-2 {
    background: linear-gradient(135deg, #e6e6e6 0%, #d9d9d9 50%, #cbcbcb 51%, #dddddd 100%);
  }

  & .rank-3 {
    background: linear-gradient(135deg, #f3e2c7 0%, #c19e67 50%, #b68d4c 51%, #e9d4b3 100%);
  }
`;

const Ranking = styled.span`
  position: absolute;
  font-size: 18px;
  top: 5px;
  left: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  & img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #aaa;
  }

  & div {
    display: flex;
    gap: 15px;
  }

  & ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }

  & h1 {
    color: #ffc045;
  }
`;

export default MemberRanking;
