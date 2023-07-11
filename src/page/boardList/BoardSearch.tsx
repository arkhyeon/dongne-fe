import styled from '@emotion/styled';
import { BoardSearchInput } from '../../component/CommonComponents/SearchInput';
import { MainButton, SubButton } from '../../component/CommonComponents/Button';
import SelectPopup, { SelectPopupOption } from '../../component/CommonComponents/SelectPopup';
import { useState } from 'react';

function BoardSearch(props) {
  const [orderOption, setOrderOption] = useState('최신순');
  return (
    <BoardSearchWrap>
      <BoardSearchInput />
      <SelectPopup value={orderOption}>
        {order.map(o => {
          return (
            <SelectPopupOption key={o.id} onClick={() => setOrderOption(o.ordering)}>
              {o.ordering}
            </SelectPopupOption>
          );
        })}
      </SelectPopup>
      <MainButton>작성하기</MainButton>
    </BoardSearchWrap>
  );
}

const BoardSearchWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export default BoardSearch;

const order = [
  { id: 1, ordering: '최신순' },
  { id: 2, ordering: '추천순' },
  { id: 3, ordering: '댓글순' },
];
