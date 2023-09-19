import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { client } from '../../common/axios';
import { APIUserRankingType } from '../../type/UserType';
import Identicon from 'identicon.js';
import SHA256 from '../../common/Sha256';
import toHex from '../../common/toHex';
import { userLevel } from '../../common/userCommon';
import { useInfiniteQuery } from 'react-query';
import TextInput from '../../component/CommonComponents/TextInput';

function MemberRanking() {
  const useFetchUsers = () => {
    return useInfiniteQuery(
      ['ranking'],
      ({ pageParam = 0 }) => {
        return getFeedPost(pageParam);
      },
      {
        getNextPageParam: data => {
          return data.userRankingDtos.length === 0 ? undefined : data.pageParam + 1;
        },
      },
    );
  };

  const [searchData, setSearchData] = useState('');
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } = useFetchUsers();
  // console.log({ data, hasNextPage, isFetching, fetchNextPage });

  const users = useMemo(
    () => (data ? data.pages.flatMap(({ userRankingDtos }) => userRankingDtos) : []),
    [data],
  );

  const getFeedPost = async (pageParam: number) => {
    const res = await client.post<APIUserRankingType>(
      `user/ranking`,
      {
        nickname: searchData,
      },
      { params: { page: pageParam, size: 20 } },
    );
    return { userRankingDtos: res.userRankingDtos, pageParam };
  };

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  return (
    <RankWrap>
      <TextInput
        placeholder="검색"
        onChange={async e => {
          await setSearchData(e.target.value);
          await refetch();
        }}
      />
      {users.map((ul, rank) => {
        return (
          <UserRank key={ul.userId}>
            <Ranking className={`rank-${rank + 1}`}>{rank > 2 && rank + 1}</Ranking>
            <UserInfo>
              <div>
                <img
                  src={
                    ul.profileImg ??
                    `data:image/png;base64,${new Identicon(
                      SHA256(toHex(ul.userId)),
                      50,
                    ).toString()}`
                  }
                />
                <ul>
                  <li>
                    LV.{userLevel(ul.point)} {ul.nickname} <small>({ul.userId})</small>
                  </li>
                  <li className="list-text">{ul.createDate}</li>
                </ul>
              </div>
              <h1 className="flex-cc">{ul.point}</h1>
            </UserInfo>
          </UserRank>
        );
      })}
      {users.length === 0 && (
        <UserInfo>
          <h1 className="flex-cc">검색된 사용자가 없습니다.</h1>
        </UserInfo>
      )}
      <div className="flex-cc">
        {hasNextPage && !isFetching && <span className="loader"></span>}
      </div>
      <Target ref={ref} />
    </RankWrap>
  );
}
type IntersectHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

const useIntersect = (onIntersect: IntersectHandler, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

const RankWrap = styled.div`
  width: 600px;
  min-height: 65vh;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & > .flex-cc {
    width: 100%;
  }
  .loader {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }
  .loader::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid black;
    animation: prixClipFix 1s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
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

const Target = styled.div`
  height: 1px;
`;

export default MemberRanking;
