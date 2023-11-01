import { useEffect, useState } from 'react';
import { client } from '../../common/axios.ts';
import { APISubCategoryType, SubCategoryType } from '../../type/CategoryType.ts';
import { CategoryStore } from '../../store/CategoryStore.ts';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { DongComTalkItem, DongComTalkItemWrap } from './DongComTalk.tsx';
import { getCookie } from '../../common/Cookie.ts';

function SubCategory({ useMainCategory }: { useMainCategory: boolean }) {
  const { subCategory, setSubCategory, mainCategory } = CategoryStore();
  const [subCategoryList, setSubCategoryList] = useState<SubCategoryType[]>([]);
  const [isView, setIsView] = useState<boolean>(false);
  const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };

  useEffect(() => {
    useMainCategory ? getSubCategory() : getAllSubCategory();
  }, [mainCategory]);

  const getAllSubCategory = () => {
    client
      .post<APISubCategoryType>('sub-categories', userCode)
      .then(res => setSubCategoryList(res.subCategoryDtos));
  };

  const getSubCategory = () => {
    if (mainCategory === 0) return;

    client.get<APISubCategoryType>(`sub-categories/${mainCategory}`).then(res => {
      setSubCategoryList(res.subCategoryDtos);
      // setSubCategory(res.subCategoryDtos[0].subCategoryId);
    });
  };

  return (
    <>
      <p className="flex gap-5" onClick={() => setIsView(prevState => !prevState)}>
        서브 카테고리 {isView ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
      </p>
      <DongComTalkItemWrap view={isView}>
        {!useMainCategory && (
          <DongComTalkItem
            key={0}
            className={subCategory === 0 ? 'cate-on' : ''}
            onClick={() => {
              // setChannel('');
              // setChannelList([]);
              setSubCategory(0);
            }}
          >
            전체
          </DongComTalkItem>
        )}
        {subCategoryList.map(sl => (
          <DongComTalkItem
            key={sl.subCategoryId}
            className={subCategory === sl.subCategoryId ? 'cate-on' : ''}
            onClick={() => {
              // getChannelList(sl.subCategoryId);
              setSubCategory(sl.subCategoryId);
            }}
          >
            {sl.name}
            {!useMainCategory && <span>({sl.boardCount})</span>}
          </DongComTalkItem>
        ))}
      </DongComTalkItemWrap>
    </>
  );
}

export default SubCategory;
