import styled from '@emotion/styled';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { client } from '../../common/axios';
import {
  APICategoryType,
  APISubCategoryType,
  CategoryType,
  SubCategoryType,
} from '../../type/CategoryType';

interface CategorySettingType {
  mainCategory: number;
  subCategory: number;
  setMainCategory: (e: number) => void;
  setSubCategory: (e: number) => void;
}

function DongComTalk({
  mainCategory,
  subCategory,
  setMainCategory,
  setSubCategory,
}: CategorySettingType) {
  const [mainView, setMainView] = useState(false);
  const [subView, setSubView] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<SubCategoryType[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    client
      .get<APICategoryType>('main-categories')
      .then(res => setCategoryList(res.mainCategoryDtos));
  };

  const getSubCategory = mainCategoryId => {
    client
      .get<APISubCategoryType>(`sub-categories/${mainCategoryId}`)
      .then(res => setSubCategoryList(res.subCategoryDtos));
  };

  return (
    <DongComTalkWrap>
      <p className="flex gap-5" onClick={() => setMainView(prevState => !prevState)}>
        메인 채널톡 {mainView ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
      </p>
      <DongComTalkItemWrap view={mainView}>
        <DongComTalkItem
          key={0}
          className={mainCategory === 0 ? 'cate-on' : ''}
          onClick={() => {
            setMainCategory(0);
            setSubCategory(0);
          }}
        >
          없음
          {/*<span>({dl.postCnt})</span>*/}
        </DongComTalkItem>
        {categoryList.map(dl => (
          <DongComTalkItem
            key={dl.mainCategoryId}
            className={mainCategory === dl.mainCategoryId ? 'cate-on' : ''}
            onClick={() => {
              getSubCategory(dl.mainCategoryId);
              setMainCategory(dl.mainCategoryId);
              setSubCategory(0);
            }}
          >
            {dl.mainCategoryType}
            {/*<span>({dl.postCnt})</span>*/}
          </DongComTalkItem>
        ))}
      </DongComTalkItemWrap>
      {subCategoryList.length !== 0 && (
        <>
          <p className="flex gap-5" onClick={() => setSubView(prevState => !prevState)}>
            서브 채널톡 {subView ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
          </p>
          <DongComTalkItemWrap view={subView}>
            <DongComTalkItem
              key={0}
              className={subCategory === 0 ? 'cate-on' : ''}
              onClick={() => setSubCategory(0)}
            >
              없음
              {/*<span>({dl.postCnt})</span>*/}
            </DongComTalkItem>
            {subCategoryList.map(dl => (
              <DongComTalkItem
                key={dl.subCategoryId}
                className={subCategory === dl.subCategoryId ? 'cate-on' : ''}
                onClick={() => {
                  setSubCategory(dl.subCategoryId);
                }}
              >
                {dl.name}
                {/*<span>({dl.postCnt})</span>*/}
              </DongComTalkItem>
            ))}
          </DongComTalkItemWrap>
        </>
      )}
    </DongComTalkWrap>
  );
}

const DongComTalkWrap = styled.div`
  width: 100%;
  font-size: 13px;

  & p.flex svg {
    cursor: pointer;
  }
`;

const DongComTalkItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 5px;
  overflow: hidden;

  & .cate-on {
    color: #ffc045;
    font-weight: bold;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d3d3d3;
  }

  ${({ view }: { view: number }) => {
    if (view) {
      return css`
        height: 142px;
        overflow-y: scroll;
      `;
    }
  }}
`;

const DongComTalkItem = styled.div`
  width: 105px;
  height: 34px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #aaa;
  gap: 2px;
  cursor: pointer;

  & span {
    font-size: 12px;
  }
`;

export default DongComTalk;
