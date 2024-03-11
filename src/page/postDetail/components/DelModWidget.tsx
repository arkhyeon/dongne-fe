import { MdDelete, MdEdit } from 'react-icons/md';
import React from 'react';
import styled from '@emotion/styled';

interface WidgetType {
  children: React.ReactNode;
  modifyFunc: () => void;
  deleteFunc: () => void;
  hideOption: boolean;
}

function DelModWidget({ children, modifyFunc, deleteFunc, hideOption }: WidgetType) {
  return (
    <DelModWidgetWrap className="flex">
      {children}
      {hideOption && (
        <>
          <span>|</span>
          <span onClick={modifyFunc} className="hide-option">
            <MdEdit />
            수정
          </span>
          <span>|</span>
          <span onClick={deleteFunc} className="hide-option">
            <MdDelete />
            삭제
          </span>
        </>
      )}
    </DelModWidgetWrap>
  );
}

const DelModWidgetWrap = styled.div`
  //justify-content: space-between;
  font-size: 14px;
  margin-top: 5px;

  & span span {
    margin: 0 3px;
  }

  & span.hide-option {
    cursor: pointer;
    &:hover {
      color: #ffc045;
    }
  }

  & svg {
    position: relative;
    font-size: 15px;
    top: 3px;
  }
`;

export default DelModWidget;
