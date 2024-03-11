import { useEffect, useState } from 'react';
import { APIChannelType, ChannelType } from '../../type/CategoryType.ts';
import { CategoryStore } from '../../store/CategoryStore.ts';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { DongComTalkItem, DongComTalkItemWrap } from './DongComTalk.tsx';
import { client } from '../../common/axios.ts';
import { getCookie } from '../../common/Cookie.ts';

function ChannelTalk({ useMainCategory }: { useMainCategory: boolean }) {
  const { channel, setChannel, setChannelName, subCategory, mainCategory } = CategoryStore();
  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [isView, setIsView] = useState<boolean>(false);
  const userCode = { cityCode: getCookie('cityCode'), zoneCode: getCookie('zoneCode') };

  useEffect(() => {
    getChannelList();
    setChannelObj(0, '');
  }, [mainCategory, subCategory]);

  const getChannelList = () => {
    client
      .post<APIChannelType>(`channel/${subCategory}`, userCode)
      .then(res => setChannelList(res.channelDtos));
  };

  const setChannelObj = (id: number, name: string) => {
    setChannel(id);
    setChannelName(name);
  };

  return (
    <>
      <p className="flex gap-5 c-pointer" onClick={() => setIsView(prevState => !prevState)}>
        채널톡 {isView ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
      </p>
      <DongComTalkItemWrap view={isView}>
        {!useMainCategory && (
          <DongComTalkItem
            key={0}
            className={channel === 0 ? 'cate-on' : ''}
            onClick={() => setChannelObj(0, '')}
          >
            전체
          </DongComTalkItem>
        )}
        {channelList.map(cl => (
          <DongComTalkItem
            key={cl.channelId}
            className={channel === cl.channelId ? 'cate-on' : ''}
            onClick={() => setChannelObj(cl.channelId, cl.name)}
          >
            {cl.name}
            {!useMainCategory && <span>({cl.boardCount})</span>}
          </DongComTalkItem>
        ))}
      </DongComTalkItemWrap>
    </>
  );
}

export default ChannelTalk;
