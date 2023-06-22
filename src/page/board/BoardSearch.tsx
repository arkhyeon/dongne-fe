import styled from '@emotion/styled';
import { BoardSearchInput } from '../../component/CommonComponents/SearchInput';
import { MainButton, SubButton } from '../../component/CommonComponents/Button';

function BoardSearch(props) {
  return (
    <BoardSearchWrap>
      <BoardSearchInput />
      <OrderSelect>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </OrderSelect>
      <MainButton>작성하기</MainButton>
    </BoardSearchWrap>
  );
}

const BoardSearchWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const OrderSelect = styled.select``;

export default BoardSearch;
