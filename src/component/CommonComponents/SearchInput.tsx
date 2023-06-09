import styled from '@emotion/styled';
import { SearchButton } from './Button';
import { AiOutlineSearch } from 'react-icons/ai';

export function HeaderSearchInput(props) {
  return (
    <HeaderSearchInputWrap>
      <HeaderSearch type="text" {...props} />
      <SearchButton>
        <AiOutlineSearch />
        검색
      </SearchButton>
    </HeaderSearchInputWrap>
  );
}

export function BoardSearchInput(props) {
  return (
    <BoardSearchInputWrap>
      <HeaderSearch type="text" {...props} />
      <SearchButton>
        <AiOutlineSearch />
        검색
      </SearchButton>
    </BoardSearchInputWrap>
  );
}

export function CategoryInput(props) {
  return <HeaderSearch type="text" {...props} />;
}

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;

const HeaderSearch = styled(SearchInput)`
  font-size: 14px;
`;

const BoardSearchInputWrap = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 18px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  border: 1px solid #0a91ab;
`;
const HeaderSearchInputWrap = styled(BoardSearchInputWrap)`
  width: 50%;
  border-radius: 5px;
`;
