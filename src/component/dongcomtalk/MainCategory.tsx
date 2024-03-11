import { useEffect, useState } from 'react';
import { client } from '../../common/axios.ts';
import { APICategoryType, CategoryType } from '../../type/CategoryType.ts';
import { CategoryStore } from '../../store/CategoryStore.ts';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { DongComTalkItem, DongComTalkItemWrap } from './DongComTalk.tsx';
import { useLocation } from 'react-router-dom';

function MainCategory() {
  const { mainCategory, setMainCategory, setSubCategory, setChannel } = CategoryStore();
  const [mainCategoryList, setMainCategoryList] = useState<CategoryType[]>([]);
  const [isView, setIsView] = useState<boolean>(false);
  const { state } = useLocation();

  useEffect(() => {
    getMainCategory();
  }, []);

  const getMainCategory = () => {
    client.get<APICategoryType>('main-categories').then(res => {
      setMainCategoryList(res.mainCategoryDtos);
      setMainCategory(state?.mainCategory ?? res.mainCategoryDtos[0].mainCategoryId);
      if (state) {
        console.log(state);
        setSubCategory(state.subCategory);
        setChannel(state.channel);
      }
    });
  };

  return (
    <>
      <p className="flex gap-5" onClick={() => setIsView(prevState => !prevState)}>
        카테고리 {isView ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
      </p>
      <DongComTalkItemWrap view={isView}>
        {/*<DongComTalkItem*/}
        {/*  key={0}*/}
        {/*  className={mainCategory === 0 ? 'cate-on' : ''}*/}
        {/*  onClick={() => {*/}
        {/*    // setChannel('');*/}
        {/*    // setChannelList([]);*/}
        {/*    // setSubCategory(0);*/}
        {/*    setMainCategory(0);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  전체*/}
        {/*</DongComTalkItem>*/}
        {mainCategoryList.map(ml => (
          <DongComTalkItem
            key={ml.mainCategoryId}
            className={mainCategory === ml.mainCategoryId ? 'cate-on' : ''}
            onClick={() => {
              // getChannelList(sl.subCategoryId);
              // setSubCategory(sl.subCategoryId);
              setMainCategory(ml.mainCategoryId);
            }}
          >
            {ml.mainCategoryType}
          </DongComTalkItem>
        ))}
      </DongComTalkItemWrap>
    </>
  );
}

export default MainCategory;
