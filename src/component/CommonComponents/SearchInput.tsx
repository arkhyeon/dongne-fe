import styled from '@emotion/styled';
import { SearchButton } from './Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputHTMLAttributes } from 'react';

export function HeaderSearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
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

export function BoardSearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
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

const SearchInput = styled.input`
  width: 100%;
  border: none !important;
  outline: none !important;
  padding: 0 !important;
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
