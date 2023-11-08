import styled from '@emotion/styled';
import { SearchButton } from './Button';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { InputHTMLAttributes } from 'react';

const enterEvent = (
  e: React.KeyboardEvent<HTMLInputElement>,
  enterEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void,
) => {
  if (e.key === 'Enter' && enterEvent) {
    enterEvent(e);
  }
};

export function HeaderSearchInput(
  props: InputHTMLAttributes<HTMLInputElement> & {
    searchEvent: (
      e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,
    ) => void;
  },
) {
  return (
    <HeaderSearchInputWrap>
      <HeaderSearch type="text" {...props} onKeyDown={e => enterEvent(e, props.searchEvent)} />
      <SearchButton onClick={props.searchEvent}>
        <AiOutlineSearch />
        검색
      </SearchButton>
    </HeaderSearchInputWrap>
  );
}

export function BoardSearchInput(
  props: InputHTMLAttributes<HTMLInputElement> & { searchEvent: () => void },
) {
  return (
    <BoardSearchInputWrap>
      <HeaderSearch type="text" {...props} onKeyDown={e => enterEvent(e, props.searchEvent)} />
      <SearchButton onClick={props.searchEvent}>
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
`;
