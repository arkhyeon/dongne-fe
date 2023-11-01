import styled from '@emotion/styled';
import { BoardSearchInput } from '../../component/CommonComponents/SearchInput';
import { MainButton } from '../../component/CommonComponents/Button';
import SelectPopup, { SelectPopupOption } from '../../component/CommonComponents/SelectPopup';
import { useNavigate } from 'react-router-dom';
import { searchStore } from '../../store/SearchStore.ts';
import { BsDot } from 'react-icons/bs';

function BoardSearch({ searchEvent }: { searchEvent: () => void }) {
  const { searchText, sort, searchType, setSearchText, setSort, setSearchType } = searchStore();
  const navigate = useNavigate();
  return (
    <BoardSearchWrap>
      <SelectPopup value={SEARCH_TYPE.find(s => s.id === searchType)?.type} icon={<BsDot />}>
        {SEARCH_TYPE.map(s => {
          return (
            <SelectPopupOption key={s.id} onClick={() => setSearchType(s.id)}>
              {s.type}
            </SelectPopupOption>
          );
        })}
      </SelectPopup>
      <BoardSearchInput
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        searchEvent={searchEvent}
      />
      <SelectPopup value={ORDER_TYPE.find(o => o.id === sort)?.ordering}>
        {ORDER_TYPE.map(o => {
          return (
            <SelectPopupOption key={o.id} onClick={() => setSort(o.id)}>
              {o.ordering}
            </SelectPopupOption>
          );
        })}
      </SelectPopup>
      <MainButton onClick={() => navigate('/postwrite')}>작성하기</MainButton>
    </BoardSearchWrap>
  );
}

const BoardSearchWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export default BoardSearch;

const SEARCH_TYPE = [
  { id: 'title', type: '제목' },
  { id: 'userId', type: '아이디' },
];

const ORDER_TYPE = [
  { id: 'latest', ordering: '최신순' },
  { id: 'likes', ordering: '추천순' },
  { id: 'comments', ordering: '댓글순' },
];
